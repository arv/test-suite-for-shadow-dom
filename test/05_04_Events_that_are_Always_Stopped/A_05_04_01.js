/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_05_04_01 = {
    name:'A_05_04_01',
    assert:'The following events must always be stopped at the nearest shadow boundary: ' +
    	'abort, error, select, change, load, reset, resize, scroll, selectstart',
    highlight:'[[The following events must always be stopped at the nearest shadow boundary:]]' +
		'[\\s\\S]*[[abort]]'
};

var A_05_04_01_T01 = async_test('A_05_04_01_T01', PROPS(A_05_04_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_05_04_01_T01.step(unit(function (ctx) {	
	
    var d = newRenderedHTMLDocument(ctx);
    
    var host = d.createElement('div');
    host.setAttribute('style', 'height:50%; width:100%');
    host.setAttribute('id', 'host');
    d.body.appendChild(host);
    
    //Shadow root to play with
    var s = new SR(host);

    var inp1 = d.createElement('input');
    inp1.setAttribute('id', 'inp1');
    inp1.setAttribute('type', 'checkbox');
    s.appendChild(inp1);
    
    s.addEventListener('abort', A_05_04_01_T01.step_func(function(event) {
    	assert_equals(event.target.getAttribute('id'), 'inp1', 'Inside shadoe tree: Wrong target');  	
    }), false);
    
    d.body.addEventListener('abort', A_05_04_01_T01.step_func(function(event) {
    	assert_true(false, 'Abort event should always be stopped at Shadow boundary');  	
    }), false);
    
    var event = d.createEvent('UIEvent');
    event.initUIEvent ('abort', true, false);
    inp1.dispatchEvent(event);		  
    
    A_05_04_01_T01.done();
}));

//Retargeting shouldn't occur for DOM tree nodes distributed
//among insertion points. Check DOMFocusIn
var A_05_04_01_T02 = async_test('A_05_04_01_T02', PROPS(A_05_04_01, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));

A_05_04_01_T02.step(unit(function (ctx) {	
	
	var d = newRenderedHTMLDocument(ctx);
	
	var host = d.createElement('div');
	host.setAttribute('id', 'host');
	d.body.appendChild(host);
	
	var inp1 = d.createElement('input');
	inp1.setAttribute('id', 'inp1');
	inp1.setAttribute('type', 'checkbox');
	inp1.setAttribute('class', 'clazz1');
	host.appendChild(inp1);
	
	var inp2 = d.createElement('input');
	inp2.setAttribute('id', 'inp2');
	inp2.setAttribute('type', 'checkbox');
	inp2.setAttribute('class', 'clazz2');
	host.appendChild(inp2);
	
	var inp3 = d.createElement('input');
	inp3.setAttribute('id', 'inp3');
	inp3.setAttribute('type', 'checkbox');
	inp3.setAttribute('class', 'clazz1');
	host.appendChild(inp3);
	
	
	//Shadow root to play with
	var s = new SR(host);
	
	var shadowDiv = document.createElement('div');
	shadowDiv.innerHTML = '<content select=".clazz1"></content>';
	s.appendChild(shadowDiv);
		
    s.addEventListener('abort', A_05_04_01_T02.step_func(function(event) {
    	alert(12);
    	assert_equals(event.target.getAttribute('id'), 'inp1', 'Inside shadoe tree: Wrong target');  	
    }), false);
    
    d.body.addEventListener('abort', A_05_04_01_T02.step_func(function(event) {
    	assert_true(false, 'Abort event should always be stopped at Shadow boundary');  	
    }), false);
    
    var event = d.createEvent('UIEvent');
    event.initUIEvent ('abort', true, false);
    inp1.dispatchEvent(event);		  
	
	A_05_04_01_T02.done();
}));