/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/


var A_06_03_02 = {
    name:'A_06_03_02',
    assert:'@host @-rule: ' +
        'The declarations of the rules in a @host @-rule must only be matched against ' +
        'the shadow host if this shadow tree is rendered',
    link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#host-at-rule',
    highlight:'The declarations of the rules in a @host @-rule must only be matched against ' +
    	'the shadow host of the shadow tree in which the style is specified, ' +
    	'[[but only if this shadow tree is rendered.]]'
};

// Tree is rendered. Rule must be applied 
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
	
	assert_equals(s2.querySelector('#shd2').offsetTop, 0,
		'Element should not be rendered');
	assert_equals(s1.querySelector('#shd1').offsetTop, 0,
		'Element should not be rendered');
	assert_equals(s2.querySelector('#shd3').offsetTop, 0,
		'Element should not be rendered');
	
}), 'A_06_03_02_T01', PROPS(A_06_03_02, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));


//Tree is not rendered. Rule must not be applied 
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
	div2.innerHTML = '<div><span id="shd2">This is a young shadow tree</span></div>';  
	s2.appendChild(div2);
	
	var style = d.createElement('style');
    style.innerHTML = '' + 
			'@host {' +
				'div{display:none;}' +
			'}';
	s1.appendChild(style);
	
	assert_true(s2.querySelector('#shd2').offsetTop > 0,
		'Element should not be rendered');
	assert_equals(s1.querySelector('#shd1').offsetTop, 0,
		'Element should not be rendered');
	
}), 'A_06_03_02_T02', PROPS(A_06_03_02, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));
