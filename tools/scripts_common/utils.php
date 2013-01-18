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
Set of utilities to run external program from PHP and check output for required, error or halt tokens
 */

require_once "ps.php";
require_once "tc.php";

function halt($error_msg, $exit_code = 1)
{
    global $tc_reporting;
    if ($tc_reporting) {
        tc_build_status(TC_BUILD_STATUS_ERROR, $error_msg);
    } else {
        fwrite(STDERR, $error_msg . "\n");
    }
    exit($exit_code);
}


define ("EX_REQUIRED_TOKENS", "EX_REQUIRED_TOKENS");
define ("EX_HALT_TOKENS", "EX_HALT_TOKENS");
define ("EX_ERROR_TOKENS", "EX_ERROR_TOKENS");

define ("EX_ON_ERROR_RETURN", "EX_ON_ERROR_RETURN");
define ("EX_ON_ERROR_EXCEPTION", "EX_ON_ERROR_EXCEPTION");
define ("EX_ON_ERROR_HALT", "EX_ON_ERROR_HALT");


function prepare_ex_tokens($req_tokens = array(), $err_tokens = array(), $halt_tokens = array())
{
    return array(
        EX_REQUIRED_TOKENS => wrap_to_array($req_tokens),
        EX_ERROR_TOKENS => wrap_to_array($err_tokens),
        EX_HALT_TOKENS => wrap_to_array($halt_tokens)
    );
}

function ex($command, $tokens = array(), $on_error = EX_ON_ERROR_RETURN, $timeout = -1)
{
    $req_tokens = wrap_to_array(isset($tokens[EX_REQUIRED_TOKENS]) ? $tokens[EX_REQUIRED_TOKENS] : null);
    $err_tokens = wrap_to_array(isset($tokens[EX_ERROR_TOKENS]) ? $tokens[EX_ERROR_TOKENS] : null);
    $halt_tokens = wrap_to_array(isset($tokens[EX_HALT_TOKENS]) ? $tokens[EX_HALT_TOKENS] : null);

    if (count($req_tokens) + count($err_tokens) + count($halt_tokens) == 0 && count($tokens) > 0) {
        return check_err($on_error, "Neither required, error nor halt tokens provided, but tokens are not empty!\n");
    }

    $psout = null;
    $err = ps_exec_and_check($command, $psout, $code, $halt_tokens, $timeout, 1);
    if ($err != null) {
        return check_err($on_error, "Error: $err");
    }
    $not_found_token = match_all_tokens($psout, $req_tokens);
    if ($not_found_token != null) {
        return check_err($on_error, "Required token not found: '$not_found_token'");
    }
    $error_token = match_any_token($psout, $err_tokens);
    if ($error_token != null) {
        return check_err($on_error, "Error token found:   '$error_token'");
    }
    return null;
}

function check_err($on_error, $msg)
{
    if ($on_error == EX_ON_ERROR_HALT) {
        halt("$msg\n");
    }
    if ($on_error == EX_ON_ERROR_EXCEPTION) {
        throw new RuntimeException($msg);
    }
    return $msg;
}


function match_token($text, $token)
{
    return strpos($text, $token) !== false;
}

function match_any_token($text, $tokens)
{
    if ($text == null || strlen($text) == 0) {
        return null;
    }
    $tokens = wrap_to_array($tokens);
    foreach ($tokens as $t) {
        if (match_token($text, $t)) {
            return $t;
        }
    }
    return null;
}

/**
 * @param $text
 * @param $tokens
 * @return string token that not matched or null
 */
function match_all_tokens($text, $tokens)
{
    $tokens = wrap_to_array($tokens);
    if ($text == null || strlen($text) == 0) {
        if (count($tokens) == 0) {
            return null;
        }
        return $tokens[0];
    }
    foreach ($tokens as $t) {
        if (is_array($t)) {
            // any of token must match
            $m = false;
            foreach ($t as $alt_t) {
                if (!match_token($text, $alt_t)) {
                    continue;
                }
                $m = true;
                break;
            }
            if ($m === false) {
                return $t[0];
            }
        } else {
            if (!match_token($text, $t)) {
                return $t;
            }
        }
    }
    return null;
}


function replace_in_file($file, $original_text, $replacement_text)
{
    $str = implode("\n", file($file));
    $fp = fopen($file, 'w');
    $str = str_replace($original_text, $replacement_text, $str);
    fwrite($fp, $str, strlen($str));
}

function starts_with($haystack, $needle)
{
    $length = strlen($needle);
    return (substr($haystack, 0, $length) === $needle);
}

function ends_with($haystack, $needle)
{
    $length = strlen($needle);
    if ($length == 0) {
        return true;
    }

    return (substr($haystack, -$length) === $needle);
}

function get_files_from_dir($dir, $ext = null)
{
    $files = array();
    if ($handle = opendir($dir)) {
        while (false !== ($file = readdir($handle))) {
            if ($file != "." && $file != "..") {
                if (is_dir($dir . '/' . $file)) {
                    $dir2 = $dir . '/' . $file;
                    $files[] = get_files_from_dir($dir2, $ext);
                } else {
                    if ($ext != null && !ends_with($file, $ext)) {
                        continue;
                    }
                    $files[] = $dir . '/' . $file;
                }
            }
        }
        closedir($handle);
    }
    return array_flat($files);
}

function array_flat($array)
{
    $result = array();
    foreach ($array as $a) {
        if (is_array($a)) {
            $result = array_merge($result, array_flat($a));
        } else {
            $result[] = $a;
        }
    }

    return $result;
}
