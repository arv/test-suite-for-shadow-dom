<?php

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

function sh_svn($dir, $svn_command)
{
    $command = "svn $svn_command";
    $out = ps_exec($command, true, $dir);
    if (match_any_token($out, array("is not a working copy", "Commit failed"))) {
        throw new RuntimeException("Failed to run SVN command: $command. Output: $out");
    }

}