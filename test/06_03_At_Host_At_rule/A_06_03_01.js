/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/


var A_06_03_01 = {
    name:'A_06_03_01',
    assert:'@host @-rule: ' +
        'The declarations of the rules in a @host @-rule must only be matched against ' +
        'the shadow host of the shadow tree in which the style is specified',
    link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#host-at-rule',
    highlight:'The declarations of the rules in a @host @-rule must only be matched against ' +
    	'the shadow host of the shadow tree in which the style is specified'
};

// declare @host rule in document header. It shouldn't be applied
test(unit(function (ctx) {
	var d = newRenderedHTMLDocument(ctx);
	
	var style = d.createElement('style');
    style.innerHTML = '' + 
			'@host {' +
				'ul{display:none;}' +
			'}';
	d.head.appendChild(style);	

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
	var s = createSR(host);
	
	var div = d.createElement('div');	
	div.innerHTML = '' +
		'<div id="shDiv"><span>Div in the Shadow tree</span></div>' +
		'<ul><content select=".shadow"></content></ul>'; 
	s.appendChild(div);
	
	assert_true(isVisible(s.querySelector('#shDiv')),
		'Point 1: element should be rendered');	
	assert_true(isVisible(d.querySelector('#li1')),
		'Point 2: element should be rendered');
	assert_true(isVisible(d.querySelector('#li3')),
		'Point 3: element should be rendered');
	assert_true(isVisible(d.querySelector('#li5')),
		'Point 4: element should be rendered');

	
}), 'A_06_03_01_T01', PROPS(A_06_03_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));


//declare @host rule in shadow tree. It should be applied
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
	var s = createSR(host);
	
	var div = d.createElement('div');	
	div.innerHTML = '' +
		'<div id="shDiv"><span>Div in the Shadow tree</span></div>' +
		'<ul><content select=".shadow"></content></ul>'; 
	s.appendChild(div);
	
	var style = d.createElement('style');
    style.innerHTML = '' + 
			'@host {' +
				'ul{display:none;}' +
			'}';
	s.appendChild(style);
	
	assert_false(isVisible(s.querySelector('#shDiv')),
		'Point 1: element should not be rendered');	
	assert_false(isVisible(d.querySelector('#li1')),
		'Point 2: element should not be rendered');
	assert_false(isVisible(d.querySelector('#li3')),
		'Point 3: element should not be rendered');
	assert_false(isVisible(d.querySelector('#li5')),
		'Point 4: element should not be rendered');


}), 'A_06_03_01_T02', PROPS(A_06_03_01, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));


//declare @host rule in nesting shadow tree
test(unit(function (ctx) {
	
	var d = newRenderedHTMLDocument(ctx);

    var host = d.createElement('div');
    d.body.appendChild(host);

	//Older tree
	var s1 = createSR(host);
	var div1 = d.createElement('div');
	div1.innerHTML = '<span id="shd1">This is an old shadow tree</span>'; 
	s1.appendChild(div1);
	
	//Younger tree
	var s2 = createSR(host);
	var div2 = d.createElement('div');
	div2.innerHTML = '<div><span id="shd2">This is a young shadow tree</span></div>' + 
		'<shadow><span id="shd3">This is the shadow tree fallback content</span></shadow>'; 
	s2.appendChild(div2);
	
	var style = d.createElement('style');
    style.innerHTML = '' + 
			'@host {' +
				'div{display:none;}' +
			'}';
	s2.appendChild(style);
	
	assert_false(isVisible(s2.querySelector('#shd2')),
		'Element should not be rendered');
	assert_false(isVisible(s1.querySelector('#shd1')),
		'Element should not be rendered');
	assert_false(isVisible(s2.querySelector('#shd3')),
		'Element should not be rendered');
	
}), 'A_06_03_01_T03', PROPS(A_06_03_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));


//declare @host rule in nested tree. Should be applied
test(unit(function (ctx) {

	var d = newRenderedHTMLDocument(ctx);

    var host = d.createElement('div');
    d.body.appendChild(host);

	//Older tree
	var s1 = createSR(host);
	var div1 = d.createElement('div');
	div1.innerHTML = '<span id="shd1">This is an old shadow tree</span>'; 
	s1.appendChild(div1);
	
	//Younger tree
	var s2 = createSR(host);
	var div2 = d.createElement('div');
	div2.innerHTML = '<div><span id="shd2">This is a young shadow tree</span></div>' + 
		'<shadow><span id="shd3">This is the shadow tree fallback content</span></shadow>'; 
	s2.appendChild(div2);
	
	var style = d.createElement('style');
    style.innerHTML = '' + 
			'@host {' +
				'div{display:none;}' +
			'}';
	s1.appendChild(style);
	
	assert_false(isVisible(s2.querySelector('#shd2')),
		'Element should not be rendered');
	assert_false(isVisible(s1.querySelector('#shd1')),
		'Element should not be rendered');
	assert_false(isVisible(s2.querySelector('#shd3')),
		'Element should not be rendered');
	
}), 'A_06_03_01_T04', PROPS(A_06_03_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));