// Copyright 2012 Google Inc. All Rights Reserved.

"use strict";

function ShadowDomNotSupportedError() {
    this.message = "Shadow DOM is not supported";
}

function ShadowDomNotSupported() {
    throw new ShadowDomNotSupportedError();
}

// Alias the constructor so vendor-prefixed implementations can run
// most of the test suite.
var SR = window.ShadowRoot ||
    window.WebKitShadowRoot ||
    // Add other vendor prefixes here.
    ShadowDomNotSupported;


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

function rethrowInternalErrors(e) {
    if (e instanceof ShadowDomNotSupportedError) {
        throw e;
    }

}

function newDocument() {
    return document.implementation.createDocument();
}

function newHTMLDocument() {
    return document.implementation.createHTMLDocument();
}

function newIFrame(ctx, src) {
    if (typeof(ctx) == 'undefined' || typeof (ctx.iframes) != 'object') {
        assert_unreached('Illegal context object in newIFrame');
    }

    var iframe = document.createElement('iframe');
    if (!ctx.debug) {
        iframe.style.display = 'none';
    }
    if (typeof(src) != 'undefined') {
        iframe.src = src;
    }
    document.body.appendChild(iframe);
    ctx.iframes.push(iframe);

    assert_true(typeof(iframe.contentWindow) != 'undefined'
        && typeof(iframe.contentWindow.document) != 'undefined'
        && iframe.contentWindow.document != document, 'Failed to create new rendered document'
    );
    return iframe;
}
function newRenderedHTMLDocument(ctx, src) {
    var frame = newIFrame(ctx, src);
    return frame.contentWindow.document;
}

function newContext() {
    return {iframes:[]};
}

function cleanContext(ctx) {
    if (!ctx.debug) {
        ctx.iframes.forEach(function (e) {
            e.parentNode.removeChild(e);
        });
    }
}

function unit(f) {
    return function () {
        var ctx = newContext();
        try {
            f(ctx);
        } finally {
            cleanContext(ctx);
        }
    }
}

function step_unit(f, ctx, t) {
    return function () {
        var done = false;
        try {
            f();
            done = true;
        } finally {
            if (done) {
                t.done();
            }
            cleanContext(ctx);
        }
    }
}


// helper method for debugging
function obj_dump(p) {
    for (var o in p) {
        console.log(o + ': ' + p[o] + '; ');
    }

}

function assert_nodelist_contents_equal_noorder(actual, expected, message) {
    assert_equals(actual.length, expected.length, message);
    var used = [];
    for (var i = 0; i < expected.length; i++) {
        used.push(false);
    }
    for (i = 0; i < expected.length; i++) {
        var found = false;
        for (var j = 0; j < actual.length; j++) {
            if (used[j] == false && expected[i] == actual[j]) {
                used[j] = true;
                found = true;
                break;
            }
        }
        if (!found) {
            assert_unreached(message + ". Fail reason:  element not found: " + expected[i]);
        }
    }
}
