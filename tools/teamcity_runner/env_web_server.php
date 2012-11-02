<?php
// this file is included into web server pages to get info where to store results

/** @var $results_flag_file - this file is created to report that all tests results are processed by results listener
and results are stored to  $results_log_file*/
$results_flag_file = "results.flag";

/** @var $results_log_file - a file results listener uses to store tests results */
$results_log_file = "results.log";
