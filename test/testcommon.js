// Copyright 2012 Google Inc. All Rights Reserved.

"use strict";

var HTML5_TAG = [
		'a','abbr','address','area','article','aside','audio','b','base','bdi','bdo','blockquote','body','br','button',
		'canvas','caption','cite','code','col','colgroup','command','datalist','dd','del','details','dfn','dialog','div',
		'dl','dt','em','embed','fieldset','figcaption','figure','footer','form','h1','h2','h3','h4','h5','h6','head','header',
		'hgroup','hr','html','i','iframe','img','input','ins','kbd','keygen','label','legend','li','link','map','mark','menu',
		'meta','meter','nav','noscript','object','ol','optgroup','option','output','p','param','pre','progress','q','rp','rt',
		'ruby','s','samp','script','section','select','small','source','span','strong','style','sub','table','tbody','td','textarea',
		'tfoot','th','thead','time','title','tr','track','u','ul','var','video','wbr'];


// http://www.whatwg.org/specs/web-apps/current-work/multipage/forms.html#form-associated-element
var HTML5_FORM_ASSOCIATED_ELEMENTS = ['button', 'fieldset', 'input', 'keygen', 'label',
                                      'object', 'output', 'select', 'textarea'];

function ShadowDomNotSupportedError() {
    this.message = "Shadow DOM is not supported";
}
/*
function ShadowRootImplementation (host) {
	  if (host.createShadowRoot) {
		  return host.createShadowRoot(); 
	  } else if (host.webkitCreateShadowRoot) {
		  return host.webkitCreateShadowRoot();
	  } else {
		throw new ShadowDomNotSupportedError();   
	  }		
}

var SR = ShadowRootImplementation;

*/

// To allow using of both prefixed and non-prefixed API we do
// the following hook
function addPrefixed(element) {
	if (!element.pseudo) {
		Object.defineProperty(element, 'pseudo', {
			  get: function () { return element.webkitPseudo; },
			  set: function (value) { return element.webkitPseudo = value; }
		});
	}

	if (!element.createShadowRoot) {
		if (element.webkitCreateShadowRoot) {
			element.createShadowRoot = function () {
				return this.webkitCreateShadowRoot();
			};
		} else {
			element.createShadowRoot = function () {
				throw new ShadowDomNotSupportedError();
			};
		}
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
	d.oldCreate = d.createElement;
	d.createElement = function(tagName) {
		var el = d.oldCreate(tagName);
		addPrefixed(el);
		return el;
	};
    return d;        
}

function newHTMLDocument() {
	var d = document.implementation.createHTMLDocument('Test Document');
	d.oldCreate = d.createElement;
	d.createElement = function(tagName) {
		var el = d.oldCreate(tagName);
		addPrefixed(el);
		return el;
	};
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
	d.oldCreate = d.createElement;
	d.createElement = function(tagName) {
		var el = d.oldCreate(tagName);
		addPrefixed(el);
		return el;
	};
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


//Example taken from http://www.w3.org/TR/shadow-dom/#event-retargeting-example
function createTestMediaPlayer(d) {
    d.body.innerHTML = '' +
	'<div id="player">' +
		'<input type="checkbox" id="outside-control">' +
		'<div id="player-shadow-root">' +
	    '</div>' +
	'</div>';

	var playerShadowRoot = new SR(d.querySelector('#player-shadow-root'));
	playerShadowRoot.innerHTML = '' +
		'<div id="controls">' +
			'<button class="play-button">PLAY</button>' +
			'<input type="range" id="timeline">' +
				'<div id="timeline-shadow-root">' +
				'</div>' +
			'</input>' +
		    '<div class="volume-slider-container" id="volume-slider-container">' +
		        '<input type="range" class="volume-slider" id="volume-slider">' +
		            '<div id="volume-shadow-root">' +
		            '</div>' +
		        '</input>' +
		    '</div>' +
		'</div>';

	var timeLineShadowRoot = new SR(playerShadowRoot.querySelector('#timeline-shadow-root'));
	timeLineShadowRoot.innerHTML =  '<div class="slider-thumb" id="timeline-slider-thumb"></div>';

	var volumeShadowRoot = new SR(playerShadowRoot.querySelector('#volume-shadow-root'));
	volumeShadowRoot.innerHTML = '<div class="slider-thumb" id="volume-slider-thumb"></div>';

	return {
		'playerShadowRoot': playerShadowRoot,
		'timeLineShadowRoot': timeLineShadowRoot,
		'volumeShadowRoot': volumeShadowRoot
		};
}

//FIXME This call of initKeyboardEvent works for WebKit-only.
//See https://bugs.webkit.org/show_bug.cgi?id=16735
// and https://bugs.webkit.org/show_bug.cgi?id=13368. Add check for browser here
function fireKeyboardEvent(doc, element, key) {
    var event = doc.createEvent('KeyboardEvent');
    event.initKeyboardEvent("keydown", true, true, doc.defaultView, key, 0, false, false, false, false);
    element.dispatchEvent(event);
}
