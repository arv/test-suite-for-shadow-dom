<?php

/**
Test runner environment
 */

/** @var $tmp_dir - dir to store all temporary data for run */
$tmp_dir = get_path_env("TMP_DIR", "/tmp");

/** @var $verbose - show verbose logging in output */
$verbose = get_process_env("VERBOSE", true);

/** @var $tc_agent_name - name of the active teamcity agent */
$tc_agent_name = get_process_env("TC_AGENT_NAME", "unknown-agent");

/** @var $tc_reporting - enables special logging for teamcity server */
$tc_reporting = get_process_env("TC_REPORTING", true);

/** @var $log_kill_file - file to keep log about all "kill" command */
$log_kill_file = get_path_env("LOG_KILLS_FILE", safe_path("$tmp_dir/$tc_agent_name.kills"));

/** @var $run_dir - work dir to use for current run */
$run_dir = get_path_env("RUN_DIR", safe_path("$tmp_dir/$tc_agent_name.run"));

/** @var $run_host - host used by results listener server */
$run_host = get_process_env("RUN_HOST", "localhost");

/** @var $run_port - port used by results listener server  */
$run_port = get_process_env("RUN_PORT", "10101");


/** @var $jsengine  - JS engine to test. Example: path to chrome.exe file */
$jsengine = get_path_env("JS_ENGINE", "chrome");

/** @var $results_flag_file - this file is created to report that all tests results are processed by results listener
and results are stored to  $results_log_file*/
$results_flag_file = "results.flag";

/** @var $results_log_file - a file results listener uses to store tests results */
$results_log_file = "results.log";

//timeout in seconds
$tests_run_timeout = get_process_env("TESTS_TIMEOUT", "20");

//timeout to start results listening server in seconds
$rs_startup_timeout = get_process_env("RS_STARTUP_TIMEOUT", "10");

$use_remote = false;
$remote_host = false;
$remote_port = false;

function get_process_env($var, $default_val)
{
    return getenv($var) ? getenv($var) : $default_val;
}

function get_path_env($var, $default)
{
    return safe_path(get_process_env($var, $default));
}

function safe_path($path)
{
    $res = str_replace('\\', '/', $path);
    return $res;
}

function is_windows()
{
    return strtoupper(substr(PHP_OS, 0, 3)) === 'WIN';
}

