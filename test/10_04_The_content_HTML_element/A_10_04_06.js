/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_10_04_06 = {
    name:'A_10_04_06',
    assert:'The content HTML element: ' +
    	'getDistributedNodes method',
    link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#content-element',
    highlight: '[[getDistributedNodes]]' +
    	'[\\s\\S]*[[Must return a static NodeList consisting of nodes, currently distributed ' +
    	'into this insertion point.]]'
};

test(unit(function (ctx) {
	
	var d = newRenderedHTMLDocument(ctx);
	
	d.body.innerHTML = 
		'<ul class="cls">' +
			'<li id="li1" class="shadow">1</li>' +
			'<li id="li2" class="shadow2">2</li>' +
			'<li id="li3" class="shadow">3</li>' +
			'<li id="li4">4</li>' +
			'<li id="li5" class="shadow">5</li>' +
			'<li id="li6" class="shadow2">6</li>' +
		'</ul>';
	
	var host = d.querySelector('.cls');
	//Shadow root to play with
	var s = new SR(host);
	
	var div = d.createElement('div');	
	div.innerHTML = '' +
		'<ul><content id="contentId" select=".clazz"><span id="spandex">This is fallback content</span></content></ul>'; 
	s.appendChild(div);
	
	assert_equals(s.querySelector('#contentId').getDistributedNodes().length, 0, 
			'There should be no distributed nodes');
    
}), 'A_10_04_06_T01', PROPS(A_10_04_06, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));


test(unit(function (ctx) {
	
	var d = newRenderedHTMLDocument(ctx);
	
	d.body.innerHTML = 
		'<ul class="cls">' +
			'<li id="li1" class="shadow">1</li>' +
			'<li id="li2" class="shadow2">2</li>' +
			'<li id="li3" class="shadow">3</li>' +
			'<li id="li4">4</li>' +
			'<li id="li5" class="shadow">5</li>' +
			'<li id="li6" class="shadow2">6</li>' +
		'</ul>';
	
	var host = d.querySelector('.cls');
	//Shadow root to play with
	var s = new SR(host);
	
	var div = d.createElement('div');	
	div.innerHTML = '' +
		'<ul><content id="contentId" select=".shadow"><span id="spandex">This is fallback content</span></content></ul>'; 
	s.appendChild(div);
	
	assert_equals(s.querySelector('#contentId').getDistributedNodes().length, 3, 
			'Wrond distributed nodes collection size');
	
	assert_equals(s.querySelector('#contentId').getDistributedNodes()[0].getAttribute('id'), 'li1',
			'Point 1: wrong element in distributed nodes collection');
	assert_equals(s.querySelector('#contentId').getDistributedNodes()[1].getAttribute('id'), 'li3',
		'Point 2: wrong element in distributed nodes collection');
	assert_equals(s.querySelector('#contentId').getDistributedNodes()[2].getAttribute('id'), 'li5',
		'Point 3: wrong element in distributed nodes collection');

    
}), 'A_10_04_06_T02', PROPS(A_10_04_06, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));