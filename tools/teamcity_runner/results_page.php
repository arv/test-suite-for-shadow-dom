<?php
require_once "env_web_server.php";

$json_input = file_get_contents("php://input");

file_put_contents($results_log_file, $json_input);

file_put_contents($results_flag_file, "done");

print "Done.";
