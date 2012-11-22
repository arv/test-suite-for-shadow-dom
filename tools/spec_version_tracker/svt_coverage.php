<?php
/**
 * Tracks latest version of the ShadowDOM spec
 * and updates repository with a newest one + replaces
 */
require_once "svt_common.php";

try {
    $content_all_tests_js = fetch_spec_content();

    $content_all_tests_js = str_replace("a href=\"http",
        "a target='_blank' href=\"http", $content_all_tests_js);

    $content_all_tests_js = str_replace("\"../../",
        "\"$spec_url_dir/../../", $content_all_tests_js);

    $spec_dir = safe_path(getcwd() . "/../../test/spec");
    $spec_file_name = "$spec_dir/shadow_dom_spec.html";
    save_file_and_commit($spec_file_name, $content_all_tests_js, $spec_dir, "automatic update of shadow dom spec used by  coverage");


    $tests_dir = safe_path(getcwd() . "/../../test");
    $all_tests_js_file_name = "$tests_dir/all_tests.js";
    $tests_html_file_name = "$tests_dir/test.html";
    $test_files = get_files_from_dir($tests_dir, "js");
    $content_all_tests_js = "";
    $content_tests_html = "<!DOCTYPE html>\n" .
        "<html>\n" .
        "<head>\n" .
        "<title>Shadow DOM Tests</title>\n" .
        "<script src=\"testharness.js\"></script>\n" .
        "</head>\n" .
        "<body>\n" .
        "<div id=\"log\"></div>\n" .
        "<script src=\"testcommon.js\"></script>\n";
    $trim_size = strlen($tests_dir) + 1;
    foreach ($test_files as $test) {
        $name = substr($test, $trim_size);
        if (strpos($name, "A_") > 0) {
            $content_all_tests_js = "$content_all_tests_js\ninclude(\"$name\");";
            $content_tests_html = $content_tests_html . "\n<script src=\"$name\"></script>";
        }
    }
    $content_tests_html .= "\n</body>\n" .
        "</html>\n"; 
    save_file_and_commit($all_tests_js_file_name, $content_all_tests_js, $tests_dir + "/..", "\"auto update of '$all_tests_js_file_name'\"");
    save_file_and_commit($tests_html_file_name, $content_tests_html, $tests_dir + "/..", "\"auto update of '$tests_html_file_name'\"");
} catch (Exception $e) {
    halt("Failed with exception!:" . $e->getMessage());
}

tc_build_status(TC_BUILD_STATUS_SUCCESS, "Done!");

