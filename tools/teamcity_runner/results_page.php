<?php
/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

require_once "env_web_server.php";

$json_input = file_get_contents("php://input");

file_put_contents($results_log_file, $json_input);

file_put_contents($results_flag_file, "done");

print "Done.";
