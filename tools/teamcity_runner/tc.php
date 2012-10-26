<?php

/**
 * Set of Teamcity related utilities
 */

require_once "utils.php";

define("TC_BLOCK", "TC_BLOCK");
define("TC_TESTSUITE", "TC_TESTSUITE");
define("TC_TEST", "TC_TEST");

define("TC_MESSAGE_STATUS_NORMAL", "NORMAL");
define("TC_MESSAGE_STATUS_WARNING", "WARNING");
define("TC_MESSAGE_STATUS_FAILURE", "FAILURE");
define("TC_MESSAGE_STATUS_ERROR", "ERROR");

define("TC_BUILD_STATUS_SUCCESS", "SUCCESS");
define("TC_BUILD_STATUS_ERROR", "ERROR");


/**
Executes commands and logs current state with teamcity-style formatting
 */
function ex_tc($block_name, $block_type, $command, $tokens = array(), $fail_on_error = true, $timeout = -1)
{
    tc_start($block_name, $block_type);
    $res = ex($command, $tokens, $fail_on_error, $timeout);
    if ($block_type == TC_TEST && $res != null) {
        tc_test_failed($block_name, $res);
    }
    tc_end($block_name, $block_type);
    return $res;
}


function tc_start($name, $block_type = TC_BLOCK)
{
    if ($block_type == TC_TESTSUITE) {
        tc_test_started($name);
    } else if ($block_type == TC_TEST) {
        tc_test_started($name);
    } else {
        tc_block_opened($name);
    }

}

function tc_end($name, $block_type = TC_BLOCK)
{
    if ($block_type == TC_TESTSUITE) {
        tc_test_suite_finished($name);
    } else if ($block_type == TC_TEST) {
        tc_test_finished($name);
    } else {
        tc_block_closed($name);
    }

}

function tc_block_opened($name)
{
    global $tc_reporting;
    if ($tc_reporting) {
        print("##teamcity[blockOpened name='$name']\n");
    }
}

function tc_block_closed($name)
{
    global $tc_reporting;
    if ($tc_reporting) {
        print("##teamcity[blockClosed name='$name']\n");
    }
}

function tc_test_suite_started($name)
{
    global $tc_reporting;
    if ($tc_reporting) {
        print("##teamcity[testSuiteStarted name='$name']\n");
    }
}


function tc_test_suite_finished($name)
{
    global $tc_reporting;
    if ($tc_reporting) {
        print("##teamcity[testSuiteFinished  name='$name']\n");
    }
}


function tc_test_started($name)
{
    print("##teamcity[testStarted name='$name']\n");
}

function tc_test_finished($name, $duration = 0)
{
    print("##teamcity[testFinished name='$name']\n");
}

function tc_test_failed($name, $message = "", $details = "")
{
    global $tc_reporting;
    if ($tc_reporting) {
        $message = tc_escape($message);
        $details = tc_escape($details);
        print("##teamcity[testFailed name = '$name' message='$message' details='$details']\n");
    }

}

function tc_test_ignored($name, $message = "")
{
    global $tc_reporting;
    if ($tc_reporting) {
        $message = tc_escape($message);
        print("##teamcity[testIgnored name = '$name' message='$message']\n");
    }

}

function tc_message($message, $status = TC_MESSAGE_STATUS_NORMAL, $error_details = "")
{
    global $tc_reporting;
    if ($tc_reporting) {
        $message = tc_escape($message);
        if ($status == TC_MESSAGE_STATUS_ERROR) {
            print("##teamcity[message text='$message' status='$status' errorDetails='$error_details']\n");
        } else {
            print("##teamcity[message text='$message' status='$status']\n");
        }
    }
}

function tc_build_status($status, $text)
{
    global $tc_reporting;
    if ($tc_reporting) {
        $text = tc_escape($text);
        print("##teamcity[buildStatus  status='$status'  text='$text']\n");
    }
}

function tc_escape($message)
{
    $escape_chars1 = array("|", "[", "]", "'", "\r", "\n");
    $escape_chars2 = array("||", "|[", "|]", "|'", "|r", "|n");
    for ($i = 0; $i < count($escape_chars1); $i++) {
        $c1 = $escape_chars1[$i];
        $c2 = $escape_chars2[$i];
        $message = str_replace($c1, $c2, $message);
    }
    return $message;
}

function tc_publishArtifact($path)
{
    global $tc_reporting;
    if ($tc_reporting) {
        print("##teamcity[publishArtifacts '$path']");
    }
}