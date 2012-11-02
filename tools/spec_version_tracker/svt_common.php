<?php
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


function save_file_and_commit($spec_file_name, $content, $spec_dir, $message)
{
    tc_message("Storing content to $spec_file_name");
    if (file_put_contents($spec_file_name, $content) == false) {
        halt("Failed to write file:  $spec_file_name");
    }

    tc_message("Committing changes to SVN");
    sh_svn($spec_dir, "commit -m \"$message\"");
}
