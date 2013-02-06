/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_04_07_01 = {
    name: 'A_04_07_01',
    assert: 'Composition:' +
    	'Composition algorithm',
    link:'http://www.w3.org/TR/shadow-dom/#multiple-shadow-subtrees',
    highlight: 'The composition of shadow trees for a given shadow host is ' +
    	'performed with the tree composition algorithm, which must be equivalent to ' +
    	'processing the following steps'
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
    		'</li>' +
    		'<li id="li2">' +
    			'<a id="a21" href="#">Link21</a><a id="a22" href="#">Link22</a>' +
    		'</li>' +
    		'<li id="li3" class="shadow">' +
    			'<a id="a31" href="#">Link31 Shadow</a><a id="a32" href="#">Link32 Shadow</a>' +
    		'</li>' +
    		'<li id="li4" class="shadow2">' +
    			'<a id="a41" href="#">Link41 Shadow 2</a><a id="a42" href="#">Link22 Shadow 2</a>' +
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
    
    //Shadow root to play with
    var ul = d.querySelector('#host');
    
    //make an old shadow tree
    var s2 = createSR(ul);
    var div2 = d.createElement('div');
    div2.innerHTML = '<ul><content select=".shadow2"></content></ul>';
    s2.appendChild(div2);
    
    // At this point visible: li4 and li5
    assert_true(isVisible(d.querySelector('#li4')), 'Point 1: Node that match insertion ' +
		'point criteria should be rendered');
	assert_true(isVisible(d.querySelector('#li5')), 'Point 2: Node that match insertion ' +
		'point criteria should be rendered');
	assert_false(isVisible(d.querySelector('#li1')), 'Point 3: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_false(isVisible(d.querySelector('#li2')), 'Point 4: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_false(isVisible(d.querySelector('#li3')), 'Point 5: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	
	//check the nested tree
	assert_false(isVisible(d.querySelector('#a11')),
	    'Point 6: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_false(isVisible(d.querySelector('#a13')),
		'Point 7: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_false(isVisible(d.querySelector('#a12')),
		'Point 8: Aleady distributed nodes should behave like a shadow host child nodes');
    
    
    
    //make a young shadow tree
    var s3 = createSR(ul);
    var div3 = d.createElement('div');
    div3.innerHTML = '<ul><content select=".shadow"></content></ul>';
    s3.appendChild(div3);

    //At this point: li1 and li3 visible, others not    
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
	
	//check the reprojected nodes (a11 and a13 visible, a12 not)
	assert_true(isVisible(d.querySelector('#a11')),
	    'Point 26: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_false(isVisible(d.querySelector('#a12')),
		'Point 27: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_true(isVisible(d.querySelector('#a13')),
		'Point 28: Aleady distributed nodes should behave like a shadow host child nodes');
	
	var shadow = d.createElement('shadow');
	s3.appendChild(shadow);

    //At this point: li1, li3, li4 and li5 visible li2 not    
    assert_true(isVisible(d.querySelector('#li1')), 'Point 31: Node that match insertion ' +
		'point criteria should be rendered');
	assert_true(isVisible(d.querySelector('#li3')), 'Point 32: Node that match insertion ' +
		'point criteria should be rendered');
	assert_false(isVisible(d.querySelector('#li2')), 'Point 33: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_true(isVisible(d.querySelector('#li4')), 'Point 34: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	assert_true(isVisible(d.querySelector('#li5')), 'Point 35: Node that does not match ' +
		'insertion point criteria shouldn\'t be rendered');
	
	//check the reprojected nodes (a11 and a13 visible, a12 not)
	assert_true(isVisible(d.querySelector('#a11')),
	    'Point 36: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_false(isVisible(d.querySelector('#a12')),
		'Point 37: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_true(isVisible(d.querySelector('#a13')),
		'Point 38: Aleady distributed nodes should behave like a shadow host child nodes');
	
	var shadow2 = d.createElement('shadow');
	s3.appendChild(shadow2);	
	
	// Nothing should be changed
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
	
	//check the reprojected nodes (a11 and a13 visible, a12 not)
	assert_true(isVisible(d.querySelector('#a11')),
	    'Point 46: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_false(isVisible(d.querySelector('#a12')),
		'Point 47: Aleady distributed nodes should behave like a shadow host child nodes');
	assert_true(isVisible(d.querySelector('#a13')),
		'Point 48: Aleady distributed nodes should behave like a shadow host child nodes');
}), 'A_04_07_01', PROPS(A_04_07_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));
