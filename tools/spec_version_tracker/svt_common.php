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
require_once "../scripts_common/tc.php";
require_once "../scripts_common/shell.php";

$spec_url = "http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html";
$spec_url_dir = "http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow";

function fetch_spec_content()
{
    global $spec_url;
    tc_message("Getting content from: $spec_url");
    $content = file_get_contents($spec_url);
    if ($content == false) {
        halt("Failed to get content from $spec_url");
        return $content;
    }
    return $content;
}


function save_file_and_commit($spec_file_name, $content, $repo_dir, $message)
{
    tc_message("Storing content to $spec_file_name");
    if (file_put_contents($spec_file_name, $content) == false) {
        halt("Failed to write file:  $spec_file_name");
    }

    tc_message("Committing changes to git");
//    sh_svn($spec_dir, "commit -m \"$message\"");
    sh_git($repo_dir, "commit -a -m \"$message\"");
    sh_git($repo_dir, "push origin master");
}
