<?php
/**
 * Page used to run all tests inside of browser
 * We use PHP here but not HTML to set a special HTTP header for XHR reporter
 */
header('Access-Control-Allow-Origin: *');
?>

<!DOCTYPE html>
<html>
<head>
    <title>Shadow DOM Tests</title>
    <script src="testharness.js"></script>
    <script src="xhr_reporter.js"></script>
</head>
<body>
<div id="log"></div>
<script src="testcommon.js"></script>
<script src="tests.js"></script>
</body>
</html>