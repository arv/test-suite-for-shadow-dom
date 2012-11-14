<?php
/**
 * Tracks latest version of the ShadowDOM spec
 * and updates repository with a newest one + replaces
 */
require_once "svt_common.php";

try {
    $content = fetch_spec_content();

    $content = str_replace("a href=\"http",
        "a target='_blank' href=\"http", $content);

    $content = str_replace("\"../../",
        "\"$spec_url_dir/../../", $content);

    $spec_dir = safe_path(getcwd() . "/../../test/spec");
    $spec_file_name = "$spec_dir/shadow_dom_spec.html";
//    save_file_and_commit($spec_file_name, $content, $spec_dir, "automatic update of shadow dom spec used by  coverage");


    $tests_dir = safe_path(getcwd() . "/../../test");
    $tests_file_name = "$tests_dir/all_tests.js";
    $test_files = get_files_from_dir($tests_dir, "js");
    $content = "";
    $trim_size = strlen($tests_dir) + 1;
    foreach ($test_files as $test) {
        $name = substr($test, $trim_size);
        if (strpos($name, "A_0") > 0) {
            $content = "$content\ninclude(\"$name\");";
        }
    }
    save_file_and_commit($tests_file_name, $content, $tests_dir + "/..", "auto update of 'all_tests.js' and spec file used by coverage");
} catch (Exception $e) {
    halt("Failed with exception!:" . $e->getMessage());
}

tc_build_status(TC_BUILD_STATUS_SUCCESS, "Done!");

