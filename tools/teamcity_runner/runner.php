<?php
/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

/**
Runs 2 applications: JS engine (for example chrome) with tests and CORS server to listen results
JS engine executes tests and connects to results listener server via XHR to report results
Results listener server stores the test run result in a file
Once the result is stored or by timeout the script analyses the file and generates report for teamcity
 */

require_once "env_runner.php";
require_once "../scripts_common/shell.php";
require_once "../scripts_common/tc.php";

$err = prepareRunDir();
if ($err == null) {
    $err = runResultsListener($results_listener_pid);
    if ($err == null) {
        $err = runTests($test_runner_pid);
        if ($err == null) {
            $err = waitUntilTestsFinished();
            print("[killing test runner: $test_runner_pid]\n");
            ps_kill($test_runner_pid);
        }
        print("[killing results listener: $results_listener_pid]\n");
        ps_kill($results_listener_pid);
    }
}

if ($err == null) {
    $err = reportResults();
}
tc_build_status($err == null ? TC_BUILD_STATUS_SUCCESS : TC_BUILD_STATUS_ERROR, $err);

/**
 * Copies all tests data into run dir
 * @return null|string - null if OK or error text
 */
function prepareRunDir()
{
    global $run_dir, $run_host, $run_port;

    print("[preparing run dir: $run_dir]\n");
    $res = null;

    try {
        $run_dir_param = path_as_ps_ex_param($run_dir);
        sh_rm($run_dir_param);
        sh_mkdir($run_dir_param);
        sh_cp("env_web_server.php results_page.php index.html tests_page.php xhr_reporter.js", $run_dir_param);
        sh_cp("../../test/*.js ../../test/*.css", $run_dir_param);
        sh_cp("../../test/resources", $run_dir_param, "-r");

        replace_in_file("$run_dir/xhr_reporter.js", "var host = \"localhost\";", "var host = \"$run_host\";");
        replace_in_file("$run_dir/xhr_reporter.js", "var port = \"8080\";", "var port = \"$run_port\";");

        $res = prepareTestsJs();
    } catch (RuntimeException $e) {
        $res = $e->getMessage();
    }
    return $res;
}

function prepareTestsJs()
{
    global $run_dir;

    print("preparing [tests.js] file:\n");
    $test_files = get_files_from_dir("../../test", "js");
    $tests_js_content = "";
    foreach ($test_files as $test_file) {
        print("getting tests from $test_file\n");
        $test_contents = file_get_contents($test_file);
        if ($test_contents == false) {
            return "Failed to read file: $test_file";
        }
        $tests_js_content = $tests_js_content . "\n" . $test_contents;
    }
    $tests_js_file = "$run_dir/tests.js";
    print("writing $tests_js_file\n");
    $res = file_put_contents($tests_js_file, $tests_js_content);
    if ($res == false) {
        return "Error writing $tests_js_file file!";
    }
    return null;
}

/**
 * Runs result listening server
 * @param $pid - pid of the results listening server
 * @return null|string - null if OK or error text
 */
function runResultsListener(&$pid)
{
    global $run_dir, $run_port, $run_host, $rs_startup_timeout;
    print("[running results listener: $run_host:$run_port]\n");
    $run_dir_param = path_as_ps_ex_param($run_dir);
    $err = ps_exec_bg("php -S $run_host:$run_port -t $run_dir_param", "$run_dir_param/server.log", $pid);
    if ($err != null) {
        return $err;
    }
    for ($cur = 0; $cur < $rs_startup_timeout; $cur++) {
        if (pingResultsListener()) {
            return null;
        }
        sleep(1);
    }

    return "TIMEOUT on running results listener server!";
}

/**
 * Check if results listening server is started and functioning
 * @return bool - returns true if ping was successful
 */
function pingResultsListener()
{
    global $run_port, $run_host;

    $http_data = file_get_contents("http://$run_host:$run_port/index.html");
    print("[ping results listener server result: $http_data]\n");

    $local_file_data = file_get_contents("index.html");
    if (strcmp($http_data, $local_file_data) == 0) {
        return true;
    }
    return false;
}


/**
 * Run JS engine (browser) with tests
 * @param $pid - process id of JS engine
 * @return null|string - null if OK or error text
 */
function runTests(&$pid)
{
    global $jsengine, $run_host, $run_port;
    $engine = path_as_ps_ex_param($jsengine);
    //$log_file = path_as_ps_ex_param("$run_dir/jsengine.log");
    $log_file = "jsengine.log";
    $err = ps_exec_bg("$engine $run_host:$run_port/tests_page.php", $log_file, $pid);
    return $err;
}

/**
 * Waits until all tests are finished by checking a special flag file or by timeout
 * @return null|string - null if OK or error text
 */
function waitUntilTestsFinished()
{
    global $tests_run_timeout, $run_dir, $results_flag_file;
    $sleep_time = 1;
    $file = "$run_dir/$results_flag_file";
    for ($cur = 0; $cur < $tests_run_timeout; $cur += $sleep_time) {
        if (file_exists($file)) {
            print("[found tests completion flag file: $file]\n");
            return null;
        }
        sleep($sleep_time);
        print("[wait for tests: $cur of $tests_run_timeout seconds]\n");
    }
    return "No results file found: $file";
}

/**
 * Parses results.log file and reports results to teamcity
 * @return null|string - null if OK or error text
 */
function reportResults()
{
    global $run_dir, $results_log_file;

    print("[reporting results]\n");

    $file = "$run_dir/$results_log_file";
    if (!file_exists($file)) {
        return "Results file not found: $file";
    }
    $contents = file_get_contents($file);
    $tests = json_decode($contents);
    tc_test_suite_started("Tests");
    foreach ($tests as $test) {
        $name = $test->name;
        tc_test_started($name);
        if ($test->status == 3) { //PASS:0, FAIL:1, TIMEOUT:2, NOTRUN:3
            tc_test_ignored($name, "NOTRUN: " . $test->message);
        } else if ($test->status > 0) {
            $message = ($test->status == 2 ? "TIMEOUT: " : "FAILED: ") . $test->message;
            $details = print_r($test, true);
            tc_test_failed($name, $message, $details);
        }
        tc_test_finished($name);
    }
    tc_test_suite_finished("Tests");
    return null;
}