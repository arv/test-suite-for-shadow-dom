// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_05_01 = {
    name:'A_05_05_01',
    assert:'Event Dispatch: ' +
		'At the time of event dispatch:' +
		'The Event target and currentTarget attributes must return the relative target for the node ' + 
		'on which event listeners are invoked',
    highlight:'[[At the time of event dispatch:]][\\s\\S]*' +
    	'[[The Event target and currentTarget attributes must return the relative target for the node ' + 
		'on which event listeners are invoked]]'
};

//blur and focus events are not bubbling. So this test tests only DOMFocusIn and DOMFocusOut
//which do bubble

//test DOMFocusOut event
var A_05_05_01_T01 = async_test('A_05_05_01_T01', PROPS(A_05_05_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_05_05_01_T01.step(unit(function (ctx) {	
	ctx.debug = true;
    var d = newRenderedHTMLDocument(ctx);
    
    d.body.innerHTML = '' +
    	'<div id="player">' +
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
		    '<div class="volume-slider-container">' +
		        '<input type="range" class="volume-slider">' +
		            '<div id="volume-shadow-root">' +		                
		            '</div>' +
		        '</input>' +
		    '</div>' +
		'</div>';
    
    var timeLineShadowRoot = new SR(playerShadowRoot.querySelector('#timeline-shadow-root'));
    timeLineShadowRoot.innerHTML =  '<div class="slider-thumb" id="timeline-slider-thumb"></div>';
    
    var volumeShadowRoot = new SR(playerShadowRoot.querySelector('#volume-shadow-root'));
    volumeShadowRoot.innerHTML = '<div class="slider-thumb" id="volume-slider-thumb"></div>';
    
    //expected result of what relative target should be see
    //see at http://www.w3.org/TR/shadow-dom/#event-retargeting-example
    
    //For #volume-slider-thumb relative target	#volume-slider-thumb
    volumeShadowRoot.querySelector('#volume-slider-thumb').addEventListener('click', 
	    A_05_05_01_T01.step_func(function(event) {
	    	assert_equals(event.target.getAttribute('id'), 'volume-slider-thumb', 
	    			'Point 1: Wrong target');
	    	assert_equals(event.currentTarget.getAttribute('id'), 'volume-slider-thumb', 
	    			'Point 1: Wrong currentTarget');
	    }), false);
    
    //For #volume-shadow-root relative target	#volume-slider-thumb
    volumeShadowRoot.addEventListener('click', 
	    A_05_05_01_T01.step_func(function(event) {
	    	assert_equals(event.target.getAttribute('id'), 'volume-slider-thumb', 
	    			'Point 2: Wrong target');
	    	assert_true(event.currentTarget == volumeShadowRoot, 
	    			'Point 2: Wrong currentTarget');
	    }), false);
    
    var event = d.createEvent('HTMLEvents');
    event.initEvent ('click', true, false);
    volumeShadowRoot.querySelector('#volume-slider-thumb').dispatchEvent(event);
    
    A_05_05_01_T01.done();
}));