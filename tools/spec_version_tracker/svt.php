<?php
/**
 * Tracks latest version of the ShadowDOM spec
 * and updates repository with a newest one
 */
require_once "svt_common.php";

try {
    $content = fetch_spec_content();

    $spec_dir = safe_path(getcwd() . "/../../doc/spec");
    $spec_file_name = "$spec_dir/shadow_dom_spec.html";
    save_file_and_commit($spec_file_name, $content, $spec_dir, "updating cached version of shadow dom spec");
} catch (Exception $e) {
    halt("Failed with exception!:" . $e->getMessage());
}

tc_build_status(TC_BUILD_STATUS_SUCCESS, "Done!");

