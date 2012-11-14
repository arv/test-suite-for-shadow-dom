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

