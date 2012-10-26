// Copyright 2012 Google Inc. All Rights Reserved.

"use strict";

// Alias the constructor so vendor-prefixed implementations can run
// most of the test suite.
var SR = window.ShadowRoot ||
    window.WebKitShadowRoot ||
    // Add other vendor prefixes here.
    function () {
        assert_unreached('no ShadowRoot constructor');
    };


function NAME(assertion, idx) {
    return assertion.name + "_T" + idx;
}

function PROPS(assertion, properties) {
    var res = Object(), attr;
    for (attr in assertion) {
        if (assertion.hasOwnProperty(attr)) {
            res[attr] = assertion[attr];
        }
    }
    for (attr in properties) {
        if (properties.hasOwnProperty(attr)) {
            res[attr] = properties[attr];
        }
    }
    return res;

}