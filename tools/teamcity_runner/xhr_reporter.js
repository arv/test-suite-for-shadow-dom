/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/
/**
 * Sends test results via XHR to a special server.
 * Host and port of the server are patched by runner.php
 * @type {Object}
 */
var metadata_generator = {

    setup:function () {
        add_completion_callback(
            function (tests, harness_status) {
                var jsonData = JSON.stringify(tests);
                var xhr = new XMLHttpRequest();
                var host = "localhost";
                var port = "8080";
                xhr.open("POST", "http://" + host + ":" + port + "/results_page.php");
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.send(jsonData);
            });
    }
};
metadata_generator.setup();