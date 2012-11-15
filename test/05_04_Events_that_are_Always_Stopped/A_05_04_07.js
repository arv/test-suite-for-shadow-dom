// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_04_07 = {
    name:'A_05_04_07',
    assert:'The following events must always be stopped at the nearest shadow boundary: ' +
    	'abort, error, select, change, load, reset, resize, scroll, selectstart',
    highlight:'[[The following events must always be stopped at the nearest shadow boundary:]]' +
		'[\\s\\S]*[[resize]]'
};

var A_05_04_07_T01 = async_test('A_05_04_07_T01', PROPS(A_05_04_07, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_05_04_07_T01.step(unit(function (ctx) {	
	
    var d = newRenderedHTMLDocument(ctx);
    
    var host = d.createElement('div');
    host.setAttribute('style', 'height:50%; width:100%');
    host.setAttribute('id', 'host');
    d.body.appendChild(host);
    
    //Shadow root to play with
    var s = new SR(host);

    var inp1 = d.createElement('input');
    inp1.setAttribute('id', 'inp1');
    inp1.setAttribute('type', 'text');
    inp1.setAttribute('value', '12345');
    s.appendChild(inp1);
    
    s.addEventListener('resize', A_05_04_07_T01.step_func(function(event) {
    	assert_equals(event.target.getAttribute('id'), 'inp1', 'Inside shadoe tree: Wrong target');  	
    }), false);
    
    d.body.addEventListener('resize', A_05_04_07_T01.step_func(function(event) {
    	assert_true(false, 'resize event should always be stopped at Shadow boundary');  	
    }), false);
    
    var event = d.createEvent('UIEvent');
    event.initUIEvent ('resize', true, false);
    inp1.dispatchEvent(event);		  
    
    A_05_04_07_T01.done();
}));