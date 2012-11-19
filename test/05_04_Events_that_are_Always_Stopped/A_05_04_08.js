/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_05_04_08 = {
    name:'A_05_04_08',
    assert:'The following events must always be stopped at the nearest shadow boundary: ' +
    	'abort, error, select, change, load, reset, resize, scroll, selectstart',
    highlight:'[[The following events must always be stopped at the nearest shadow boundary:]]' +
		'[\\s\\S]*[[scroll]]'
};

var A_05_04_08_T01 = async_test('A_05_04_08_T01', PROPS(A_05_04_08, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_05_04_08_T01.step(unit(function (ctx) {	
	
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
    
    s.addEventListener('scroll', A_05_04_08_T01.step_func(function(event) {
    	assert_equals(event.target.getAttribute('id'), 'inp1', 'Inside shadoe tree: Wrong target');  	
    }), false);
    
    d.body.addEventListener('scroll', A_05_04_08_T01.step_func(function(event) {
    	assert_true(false, 'scroll event should always be stopped at Shadow boundary');  	
    }), false);
    
    var event = d.createEvent('UIEvent');
    event.initUIEvent ('scroll', true, false);
    inp1.dispatchEvent(event);		  
    
    A_05_04_08_T01.done();
}));