<?php
/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

require_once "../scripts_common/env.php";
require_once "env_web_server.php";

/** @var $run_host - host used by results listener server */
$run_host = get_process_env("RUN_HOST", "localhost");

/** @var $run_port - port used by results listener server  */
$run_port = get_process_env("RUN_PORT", "10101");


/** @var $jsengine  - JS engine to test. Example: path to chrome.exe file */
$jsengine = get_path_env("JS_ENGINE", "chrome");

//timeout in seconds
$tests_run_timeout = get_process_env("TESTS_TIMEOUT", "20");

//timeout to start results listening server in seconds
$rs_startup_timeout = get_process_env("RS_STARTUP_TIMEOUT", "10");

$use_remote = false;
$remote_host = false;
$remote_port = false;
