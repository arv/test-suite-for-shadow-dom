<?php
/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/
// this file is included into web server pages to get info where to store results

/** @var $results_flag_file - this file is created to report that all tests results are processed by results listener
and results are stored to  $results_log_file*/
$results_flag_file = "results.flag";

/** @var $results_log_file - a file results listener uses to store tests results */
$results_log_file = "results.log";
