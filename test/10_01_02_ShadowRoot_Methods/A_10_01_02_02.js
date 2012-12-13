/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_10_01_02_02 = {
    name:'A_10_01_02_02',
    assert:'ShadowRoot Object: ' +
    	'NodeList getElementsByClassName(DOMString className) method',
    link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#shadow-root-object',
    highlight: '[[getElementsByClassName]]' +
    	'[\\s\\S]*[[Must behave exactly like document.getElementsByClassName, except scoped to the shadow tree.]]'
};

test(function () {
	
	var d = newHTMLDocument();
	
    var el = d.createElement('div');
    d.body.appendChild(el);
    
    var s = new SR(el);
    
    assert_equals(s.getElementsByClassName('clazz').length, 0, 'ShadowRoot getElementsByClassName() ' +
    		'method should return empty list if there\'s no matching child elements');
        
}, 'A_10_01_02_02_T01', PROPS(A_10_01_02_02, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));



test(function () {
	
	var d = newHTMLDocument();
	
    var el = d.createElement('div');
    d.body.appendChild(el);
    
    var s = new SR(el);
    
    var child = d.createElement('span');
    child.setAttribute('class', 'clazz');
    s.appendChild(child);

    assert_equals(s.getElementsByClassName('clazz').length, 1, 'ShadowRoot getElementsByClassName() ' +
    		'method should return matching child element');
        
}, 'A_10_01_02_02_T02', PROPS(A_10_01_02_02, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));


test(function () {
	
	var d = newHTMLDocument();
	
    var el = d.createElement('div');
    d.body.appendChild(el);
    
    var s = new SR(el);
    
    var child = d.createElement('span');
    child.setAttribute('class', 'clazz');
    s.appendChild(child);

    var child2 = d.createElement('span');
    child2.setAttribute('class', 'clazz');
    s.appendChild(child2);
    
    assert_equals(s.getElementsByClassName('clazz').length, 2, 'ShadowRoot getElementsByClassName() ' +
    		'method should return matching child elements');
        
}, 'A_10_01_02_02_T03', PROPS(A_10_01_02_02, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));
