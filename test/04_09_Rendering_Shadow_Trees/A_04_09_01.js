/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_04_09_01 = {
    name: 'A_04_09_01',
    assert: 'Rendering Shadow DOM Subtrees:' +
    	'rendering algorithm',
    link:'http://www.w3.org/TR/shadow-dom/#multiple-shadow-subtrees',
    highlight: 'Rendering of shadow trees, or presenting them visually, ' +
    	'is defined as a specialization of rendering any DOM tree, and must happen as these steps'
};



test(unit(function (ctx) {

    var d = newRenderedHTMLDocument(ctx);
    var div = d.createElement('div');
    div.innerHTML = '' + 
    	'<ul id="host">' +
    		'<li id="li1" class="shadow">' +
    			'<a id="a11" class="cl1" href="#">Link11 Shadow</a>' +
    			'<a id="a12" class="cl2" href="#">Link12 Shadow</a>' +
    			'<a id="a13" class="cl1" href="#">Link13 Shadow</a>' +
    			'<a id="a14" class="cl3" href="#">Link14 Shadow</a>' +
    		'</li>' +
    		'<li id="li2">' +
    			'<a id="a21" href="#">Link21</a><a id="a22" href="#">Link22</a>' +
    		'</li>' +
    		'<li id="li3" class="shadow">' +
    			'<a id="a31" href="#">Link31 Shadow</a><a id="a32" href="#">Link32 Shadow</a>' +
    		'</li>' +
    		'<li id="li4" class="shadow2">' +
    			'<a id="a41" href="#">Link41 Shadow 2</a><a id="a42" href="#">Link42 Shadow 2</a>' +
    		'</li>' +
    		'<li id="li5" class="shadow2">' +
    			'<a id="a51" href="#">Link51 Shadow</a><a id="a52" href="#">Link52 Shadow 2</a>' +
    		'</li>' +
    	'</ul>';
    
    d.body.appendChild(div);
    
    //make nested shadow tree to check the reprojection
    var li1 = d.querySelector('#li1');
    var s = createSR(li1);
    var shadowLI1 = document.createElement('li');
    shadowLI1.innerHTML = '<content select=".cl1"></content>';
    s.appendChild(shadowLI1);

	//check the tree. a11 and a13 should be visible
	assert_true(isVisible(d.querySelector('#a11')),
	    'Point 1: Node that matches insertion point criteria should be rendered');
	assert_true(isVisible(d.querySelector('#a13')),
		'Point 2: Node that matches insertion point criteria should be rendered');
	assert_false(isVisible(d.querySelector('#a12')),
		'Point 3: Node that doesn\'t match insertion point criteria shouldn\'t be rendered');
	assert_false(isVisible(d.querySelector('#a14')),
		'Point 4: Node that doesn\'t match insertion point criteria shouldn\'t be rendered');
    
    
    var shadowLI2 = document.createElement('li');
    shadowLI2.innerHTML = '<content select=".cl3"></content>';
    s.appendChild(shadowLI2);
    
	//At this point a11, a13 and a14 should be visible
	assert_true(isVisible(d.querySelector('#a11')),
	    'Point 11: Node that matches insertion point criteria should be rendered');
	assert_true(isVisible(d.querySelector('#a13')),
		'Point 12: Node that matches insertion point criteria should be rendered');
	assert_true(d.querySelector('#a14').offsetTop > d.querySelector('#a13').offsetTop,
		'Point 13: Node that matches insertion point criteria should be rendered');
	assert_false(isVisible(d.querySelector('#a12')),
		'Point 14: Node that doesn\'t match insertion point criteria shouldn\'t be rendered');
	
    
    //Shadow root to play with
    var ul = d.querySelector('#host');
    
    //make an old shadow tree
    var s2 = createSR(ul);
    var div2 = d.createElement('div');
    div2.innerHTML = '<ul><content select=".shadow"></content></ul>';
    s2.appendChild(div2);
    
    // At this point visible: li1 and li3
    assert_true(isVisible(d.querySelector('#li1')), 'Point 21: Node that match insertion ' +
		'point criteria should be rendered');
	assert_true(isVisible(d.querySelector('#li3')), 'Point 22: Node that match insertion ' +
		'point criteria should be rendered');
	assert_false(isVisible(d.querySelector('#li2')), 'Point 23: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_false(isVisible(d.querySelector('#li4')), 'Point 24: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_false(isVisible(d.querySelector('#li5')), 'Point 25: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	
	//check the reprojected nodes
	assert_true(isVisible(d.querySelector('#a11')),
	    'Point 26: Node that matches insertion point criteria should be rendered');
	assert_true(isVisible(d.querySelector('#a13')),
		'Point 27: Node that matches insertion point criteria should be rendered');
	assert_true(d.querySelector('#a14').offsetTop > d.querySelector('#a13').offsetTop,
		'Point 28: Node that matches insertion point criteria should be rendered');
	assert_false(isVisible(d.querySelector('#a12')),
		'Point 29: Node that doesn\'t match insertion point criteria shouldn\'t be rendered');
    
    
    
    //make a young shadow tree
    var s3 = createSR(ul);
    var div3 = d.createElement('div');
    div3.innerHTML = '<ul><content select=".shadow2"></content></ul>';
    s3.appendChild(div3);

    //At this point: li4 and li5 visible, others not    
    assert_true(isVisible(d.querySelector('#li4')), 'Point 31: Node that match insertion ' +
		'point criteria should be rendered');
	assert_true(isVisible(d.querySelector('#li5')), 'Point 32: Node that match insertion ' +
		'point criteria should be rendered');
	assert_false(isVisible(d.querySelector('#li1')), 'Point 33: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_false(isVisible(d.querySelector('#li2')), 'Point 34: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_false(isVisible(d.querySelector('#li3')), 'Point 35: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	
	//check the reprojected nodes (all invisible)
	assert_false(isVisible(d.querySelector('#a11')),
	    'Point 36: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_false(isVisible(d.querySelector('#a12')),
		'Point 37: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_false(isVisible(d.querySelector('#a13')),
		'Point 38: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_false(isVisible(d.querySelector('#a14')),
		'Point 39: Aleady distributed nodes should behave like a shadow host child nodes');
	
	var shadow = d.createElement('shadow');
	s3.appendChild(shadow);

    //At this point: li1, li3, li4 and li5 visible li2 not    
    assert_true(isVisible(d.querySelector('#li1')), 'Point 41: Node that match insertion ' +
		'point criteria should be rendered');
	assert_true(isVisible(d.querySelector('#li3')), 'Point 42: Node that match insertion ' +
		'point criteria should be rendered');
	assert_false(isVisible(d.querySelector('#li2')), 'Point 43: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_true(isVisible(d.querySelector('#li4')), 'Point 44: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_true(isVisible(d.querySelector('#li5')), 'Point 45: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	
	//check the reprojected nodes (a11, a13, a14 visible, a12 not)
	assert_true(isVisible(d.querySelector('#a11')),
	    'Point 46: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_false(isVisible(d.querySelector('#a12')),
		'Point 47: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_true(isVisible(d.querySelector('#a13')),
		'Point 48: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_true(isVisible(d.querySelector('#a14')),
		'Point 49: Aleady distributed nodes should behave like a shadow host child nodes');
	
	var shadow2 = d.createElement('shadow');
	s3.appendChild(shadow2);	
	
	// Nothing should be changed
    //At this point: li1, li3, li4 and li5 visible li2 not    
    assert_true(isVisible(d.querySelector('#li1')), 'Point 51: Node that match insertion ' +
		'point criteria should be rendered');
	assert_true(isVisible(d.querySelector('#li3')), 'Point 52: Node that match insertion ' +
		'point criteria should be rendered');
	assert_false(isVisible(d.querySelector('#li2')), 'Point 53: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_true(isVisible(d.querySelector('#li4')), 'Point 54: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_true(isVisible(d.querySelector('#li5')), 'Point 55: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	
	//check the reprojected nodes (a11 and a13 visible, a12 not)
	assert_true(isVisible(d.querySelector('#a11')),
	    'Point 56: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_false(isVisible(d.querySelector('#a12')),
		'Point 57: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_true(isVisible(d.querySelector('#a13')),
		'Point 58: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_true(isVisible(d.querySelector('#a14')),
		'Point 59: Aleady distributed nodes should behave like a shadow host child nodes');
	
	//replace the nested tree by younger one
    var s4 = createSR(li1);
    var shadowLI4 = document.createElement('li');
    shadowLI4.innerHTML = '<content select=".cl2"></content>';
    s4.appendChild(shadowLI4);

    //At this point: li1, li3, li4 and li5 visible li2 not    
    assert_true(isVisible(d.querySelector('#li1')), 'Point 61: Node that match insertion ' +
		'point criteria should be rendered');
	assert_true(isVisible(d.querySelector('#li3')), 'Point 62: Node that match insertion ' +
		'point criteria should be rendered');
	assert_false(isVisible(d.querySelector('#li2')), 'Point 63: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_true(isVisible(d.querySelector('#li4')), 'Point 64: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_true(isVisible(d.querySelector('#li5')), 'Point 65: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	
	//check the reprojected nodes (a12 visible, others not)
	assert_false(isVisible(d.querySelector('#a11')),
	    'Point 66: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_true(isVisible(d.querySelector('#a12')),
		'Point 67: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_false(isVisible(d.querySelector('#a13')),
		'Point 68: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_false(isVisible(d.querySelector('#a14')),
		'Point 69: Aleady distributed nodes should behave like a shadow host child nodes');
	
	
	//Let's check that if we add a shadow insertion point to the tree nothing is 
	//changed in the nested three (old tree is still invisible)
	var shadow3 = d.createElement('shadow');
	s3.appendChild(shadow3);
	
    //At this point: li1, li3, li4 and li5 visible li2 not    
    assert_true(isVisible(d.querySelector('#li1')), 'Point 61: Node that match insertion ' +
		'point criteria should be rendered');
	assert_true(isVisible(d.querySelector('#li3')), 'Point 62: Node that match insertion ' +
		'point criteria should be rendered');
	assert_false(isVisible(d.querySelector('#li2')), 'Point 63: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_true(isVisible(d.querySelector('#li4')), 'Point 64: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_true(isVisible(d.querySelector('#li5')), 'Point 65: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	
	//check the reprojected nodes (a12 visible, others not)
	assert_false(isVisible(d.querySelector('#a11')),
	    'Point 66: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_true(isVisible(d.querySelector('#a12')),
		'Point 67: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_false(isVisible(d.querySelector('#a13')),
		'Point 68: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_false(isVisible(d.querySelector('#a14')),
		'Point 69: Aleady distributed nodes should behave like a shadow host child nodes');	
}), 'A_04_09_01_T01', PROPS(A_04_09_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));
