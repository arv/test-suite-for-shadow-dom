<?php
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
