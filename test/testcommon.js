/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

"use strict";

var HTML5_TAG = [
		'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 
		'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 
		'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 
		'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 
		'h6', 'head', 'header',	'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 
		'keygen', 'label', 'legend', 'li', 'link', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 
		'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 
		'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 
		'strong', 'style', 'sub', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 
		'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'];


// http://www.whatwg.org/specs/web-apps/current-work/multipage/forms.html#form-associated-element
var HTML5_FORM_ASSOCIATED_ELEMENTS = ['button', 'fieldset', 'input', 'keygen', 'label',
                                      'object', 'output', 'select', 'textarea'];

function ShadowDomNotSupportedError() {
    this.message = "Shadow DOM is not supported";
}

function createSR(element) {
	if (element.createShadowRoot) {
		return element.createShadowRoot();
	}
	if (element.webkitCreateShadowRoot) {
		return element.webkitCreateShadowRoot();
	}
	throw new ShadowDomNotSupportedError();
}

// To allow using of both prefixed and non-prefixed API we do
// the following hook
function addPrefixed(element) {
	if (element) {

		if (!element.pseudo) {
			Object.defineProperty(element, 'pseudo', {
				  get: function () { return element.webkitPseudo; },
				  set: function (value) { return element.webkitPseudo = value; }
			});
		}
		if (!element.shadowRoot) {
			Object.defineProperty(element, 'shadowRoot', {
				  get: function () { return element.webkitShadowRoot; },
				  set: function (value) { return element.webkitShadowRoot = value; }
			});
		}

	}
}

function addDocumentPrefixed(d) {
	if (d) {
		if (d.body) {
		    addPrefixed(d.body);
		}
		if (d.head) {
		    addPrefixed(d.head);
		}
		if (d.documentElement) {
			addPrefixed(d.documentElement);
		}
		d.oldCreate = d.createElement;
		d.createElement = function(tagName) {
			var el = d.oldCreate(tagName);
			addPrefixed(el);
			return el;
		};
	}
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

function rethrowInternalErrors(e) {
    if (e instanceof ShadowDomNotSupportedError) {
        throw e;
    }

}

function newDocument() {
    var d = document.implementation.createDocument();
    //FIXME remove the call below when non-prefixed API is used
    addDocumentPrefixed(d);
    return d;
}

function newHTMLDocument() {
	var d = document.implementation.createHTMLDocument('Test Document');
	//FIXME remove the call below when non-prefixed API is used
	addDocumentPrefixed(d);
	return d;
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

function newRenderedHTMLDocument(ctx) {
	var frame = newIFrame(ctx);
	var d = frame.contentWindow.document;
	//FIXME remove the call below when non-prefixed API is used
	addDocumentPrefixed(d);
	return d;
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
    };
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
    };
}

// new context and iframe are created and url (if supplied) is asigned to iframe.src
// function f is bound to the iframe onload event or executed directly after iframe creation
// the context is passed to function as argument
function test_in_iframe(url, f, testName, testProps){
	if (url){
		var t = async_test(testName, testProps);
		t.step(function(){
			var ctx = newContext();
			var iframe = newIFrame(ctx, url);
			addDocumentPrefixed(iframe.contentWindow.document);
			iframe.onload = t.step_func(function (){
				try {
					f(ctx);
					t.done();
				} finally {
					cleanContext(ctx);
				}
			});
		});
	} else {
		test(unit(function(ctx){
			newRenderedHTMLDocument(ctx);
			f(ctx);
		}), testName, testProps);
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


// based on example from http://www.w3.org/TR/shadow-dom/#event-retargeting-example
function createTestMediaPlayer(d) {
    d.body.innerHTML += '' +
	    '<input type="checkbox" id="outside-control">' +
		'<div id="player">' +
		'</div>';

	var playerShadowRoot = createSR(d.querySelector('#player'));
	playerShadowRoot.innerHTML = '' +
		'<div id="controls">' +
			'<button class="play-button">PLAY</button>' +
//			'<input type="range" id="timeline">' +
//			'</input>' +
			'<div id="timeline">' +
			'</div>' +
		    '<div class="volume-slider-container" id="volume-slider-container">' +
//		        '<input type="range" class="volume-slider" id="volume-slider">' +
//		        '</input>' +
		        '<div class="volume-slider" id="volume-slider">' +
		        '</div>' +
		    '</div>' +
		'</div>';

	var timeLineShadowRoot = createSR(playerShadowRoot.querySelector('#timeline'));
	timeLineShadowRoot.innerHTML =  '<div class="slider-thumb" id="timeline-slider-thumb"></div>';

	var volumeShadowRoot = createSR(playerShadowRoot.querySelector('#volume-slider'));
	volumeShadowRoot.innerHTML = '<div class="slider-thumb" id="volume-slider-thumb">' +
		'<input type="range" id="volume"></input></div>';

	return {
		'playerShadowRoot': playerShadowRoot,
		'timeLineShadowRoot': timeLineShadowRoot,
		'volumeShadowRoot': volumeShadowRoot
		};
}

function isVisible(el) {
	return el.offsetTop != 0;
}

//FIXME This call of initKeyboardEvent works for WebKit-only.
//See https://bugs.webkit.org/show_bug.cgi?id=16735
// and https://bugs.webkit.org/show_bug.cgi?id=13368. Add check for browser here
function fireKeyboardEvent(doc, element, key) {
    var event = doc.createEvent('KeyboardEvent');
    event.initKeyboardEvent("keydown", true, true, doc.defaultView, key, 0, false, false, false, false);
    element.dispatchEvent(event);
}
