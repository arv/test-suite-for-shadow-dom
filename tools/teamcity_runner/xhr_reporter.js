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