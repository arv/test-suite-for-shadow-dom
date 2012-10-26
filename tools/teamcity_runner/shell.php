<?php

require_once "utils.php";

function sh_mkdir($dir, $opts = "-p")
{
    $command = "mkdir $opts $dir";
    $out = ps_exec($command);
    if (match_token($out, "cannot")) {
        throw new RuntimeException("Failed to create dir: $command. Output: $out");
    }
}

function sh_rm($path, $opts = "-rf")
{
    $command = "rm $opts $path";
    $out = ps_exec($command);
    if (match_token($out, "cannot")) {
        throw new RuntimeException("Failed to remove path: $command. Output: $out");
    }
}

function sh_cp($from, $to, $opts = "")
{
    $command = "cp $opts $from $to";
    $out = ps_exec($command);
    if (match_token($out, "cannot")) {
        throw new RuntimeException("Failed to remove path: $command. Output: $out");
    }

    return prepare_ex_tokens(array(), array("cannot", "omitting directory"));
}
