<?php
/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

require_once "utils.php";

function sh_mkdir($dir, $opts = "-p")
{
    $command = "mkdir $opts $dir";
    $out = ps_exec($command);
    if (match_any_token($out, array("cannot", "Permission denied"))) {
        throw new RuntimeException("Failed to create dir: $command. Output: $out");
    }
}

function sh_rm($path, $opts = "-rf")
{
    $command = "rm $opts $path";
    $out = ps_exec($command);
    if (match_any_token($out, "cannot")) {
        throw new RuntimeException("Failed to remove path: $command. Output: $out");
    }
}

function sh_cp($from, $to, $opts = "")
{
    $command = "cp $opts $from $to";
    $out = ps_exec($command);
    if (match_any_token($out, array("cannot", "is not a directory"))) {
        throw new RuntimeException("Failed to copy: $command. Output: $out");
    }
}

function sh_git($dir, $git_command)
{
    $command = "git $git_command";
    $out = ps_exec($command, true, $dir);
    if (match_any_token($out, array("fatal:"))) {
        throw new RuntimeException("Failed to run git command: $command. Output: $out");
    }
}

function sh_svn($dir, $svn_command)
{
    $command = "svn $svn_command";
    $out = ps_exec($command, true, $dir);
    if (match_any_token($out, array("is not a working copy", "Commit failed"))) {
        throw new RuntimeException("Failed to run SVN command: $command. Output: $out");
    }
}