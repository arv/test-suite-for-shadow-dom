/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/


var A_06_00_12 = {
    name:'A_06_00_12',
    assert:'Styles:' +
	    'If the reset-style-inheritance flag is set for a shadow tree, all inheritable CSS ' +
	    'properties must behave as if they were explicitly set to the initial value at the upper ' +
	    'boundary of the tree.',
	link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#styles',
	highlight:'If the reset-style-inheritance flag is set for a shadow tree, all inheritable CSS ' +
		'properties must behave as if they were explicitly set to the initial value at the upper ' +
		'boundary of the tree.'
};

// test Shadow root
test(unit(function (ctx) {
	var d = newRenderedHTMLDocument(ctx);
    
    d.body.innerHTML = 
    	'<ul id="shHost">' +
    		'<li id="li1" class="shadow">1</li>' +
    		'<li id="li2" class="shadow2">2</li>' +
    		'<li id="li3" class="shadow">3</li>' +
    		'<li id="li4">4</li>' +
    		'<li id="li5" class="shadow">5</li>' +
    		'<li id="li6" class="shadow2">6</li>' +
    	'</ul>';

    
	var defHeight1 = d.querySelector('#li1').offsetHeight;
	var defHeight2 = d.querySelector('#li2').offsetHeight;
	var defHeight3 = d.querySelector('#li3').offsetHeight;
	var defHeight4 = d.querySelector('#li4').offsetHeight;
	var defHeight5 = d.querySelector('#li5').offsetHeight;
	var defHeight6 = d.querySelector('#li6').offsetHeight;
	
	assert_true(defHeight1 > 0, 'Point 1: Element height should be greater than zero');
	assert_true(defHeight2 > 0, 'Point 2: Element height should be greater than zero');
	assert_true(defHeight3 > 0, 'Point 3: Element height should be greater than zero');
	assert_true(defHeight4 > 0, 'Point 4: Element height should be greater than zero');
	assert_true(defHeight5 > 0, 'Point 5: Element height should be greater than zero');
	assert_true(defHeight6 > 0, 'Point 6: Element height should be greater than zero');
    
    var host = d.querySelector('#shHost');
    
    d.body.setAttribute('style', 'font-size: 30px');
    
	var height1 = d.querySelector('#li1').offsetHeight;
	var height2 = d.querySelector('#li2').offsetHeight;
	var height3 = d.querySelector('#li3').offsetHeight;
	var height4 = d.querySelector('#li4').offsetHeight;
	var height5 = d.querySelector('#li5').offsetHeight;
	var height6 = d.querySelector('#li6').offsetHeight;
    
    
	assert_true(height1 > defHeight1, 'Point 11: Element height should be changed');
	assert_true(height2 > defHeight2, 'Point 12: Element height should be changed');
	assert_true(height3 > defHeight3, 'Point 13: Element height should be changed');
	assert_true(height4 > defHeight4, 'Point 14: Element height should be changed');
	assert_true(height5 > defHeight5, 'Point 15: Element height should be changed');
	assert_true(height6 > defHeight6, 'Point 16: Element height should be changed');
    
	//Shadow root to play with
    var s = createSR(host);

	var div = d.createElement('div');	
	div.innerHTML ='<ul><content select=".shadow"></content></ul>'; 
	s.appendChild(div);
	
	assert_equals(d.querySelector('#li1').offsetHeight, height1, 'Point 21: Element height should not be changed');
	assert_equals(d.querySelector('#li3').offsetHeight, height3, 'Point 22: Element height should not be changed');
	assert_equals(d.querySelector('#li5').offsetHeight, height5, 'Point 23: Element height should not be changed');
	
	assert_false(isVisible(d.querySelector('#li2')), 'Point 24: Element shouldn\'t be rendered');
	assert_false(isVisible(d.querySelector('#li4')), 'Point 25: Element shouldn\'t be rendered');
	assert_false(isVisible(d.querySelector('#li6')), 'Point 26: Element shouldn\'t be rendered');
	
	s.resetStyleInheritance = true;

	assert_equals(d.querySelector('#li1').offsetHeight, defHeight1, 'Point 31: Inherited ' +
			'element style should be reset');
	assert_equals(d.querySelector('#li3').offsetHeight, defHeight3, 'Point 32: Inherited ' + 
			'element style should be reset');
	assert_equals(d.querySelector('#li5').offsetHeight, defHeight5, 'Point 33: Inherited ' +
			'element style should be reset');
	
}), 'A_06_00_12_T01', PROPS(A_06_00_12, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

// test shadow insertion point (<shadow> element)
test(unit(function (ctx) {
	var d = newRenderedHTMLDocument(ctx);
    
    d.body.innerHTML = 
    	'<ul id="shHost">' +
    		'<li id="li1" class="shadow">1</li>' +
    		'<li id="li2" class="shadow2">2</li>' +
    		'<li id="li3" class="shadow">3</li>' +
    		'<li id="li4">4</li>' +
    		'<li id="li5" class="shadow">5</li>' +
    		'<li id="li6" class="shadow2">6</li>' +
    	'</ul>';

    
	var defHeight1 = d.querySelector('#li1').offsetHeight;
	var defHeight2 = d.querySelector('#li2').offsetHeight;
	var defHeight3 = d.querySelector('#li3').offsetHeight;
	var defHeight4 = d.querySelector('#li4').offsetHeight;
	var defHeight5 = d.querySelector('#li5').offsetHeight;
	var defHeight6 = d.querySelector('#li6').offsetHeight;
	
	assert_true(defHeight1 > 0, 'Point 1: Element height should be greater than zero');
	assert_true(defHeight2 > 0, 'Point 2: Element height should be greater than zero');
	assert_true(defHeight3 > 0, 'Point 3: Element height should be greater than zero');
	assert_true(defHeight4 > 0, 'Point 4: Element height should be greater than zero');
	assert_true(defHeight5 > 0, 'Point 5: Element height should be greater than zero');
	assert_true(defHeight6 > 0, 'Point 6: Element height should be greater than zero');
    
    var host = d.querySelector('#shHost');
    
    d.body.setAttribute('style', 'font-size: 30px');
    
	var height1 = d.querySelector('#li1').offsetHeight;
	var height2 = d.querySelector('#li2').offsetHeight;
	var height3 = d.querySelector('#li3').offsetHeight;
	var height4 = d.querySelector('#li4').offsetHeight;
	var height5 = d.querySelector('#li5').offsetHeight;
	var height6 = d.querySelector('#li6').offsetHeight;
    
    
	assert_true(height1 > defHeight1, 'Point 11: Element height should be changed');
	assert_true(height2 > defHeight2, 'Point 12: Element height should be changed');
	assert_true(height3 > defHeight3, 'Point 13: Element height should be changed');
	assert_true(height4 > defHeight4, 'Point 14: Element height should be changed');
	assert_true(height5 > defHeight5, 'Point 15: Element height should be changed');
	assert_true(height6 > defHeight6, 'Point 16: Element height should be changed');
    
	//Shadow root to play with
    var s = createSR(host);

	var div = d.createElement('div');	
	div.innerHTML ='<ul><content select=".shadow"></content></ul>'; 
	s.appendChild(div);
	
	assert_equals(d.querySelector('#li1').offsetHeight, height1, 'Point 21: Element height should not be changed');
	assert_equals(d.querySelector('#li3').offsetHeight, height3, 'Point 22: Element height should not be changed');
	assert_equals(d.querySelector('#li5').offsetHeight, height5, 'Point 23: Element height should not be changed');
	
	assert_equals(d.querySelector('#li2').offsetHeight, 0, 'Point 24: Element shouldn\'t be rendered');
	assert_equals(d.querySelector('#li4').offsetHeight, 0, 'Point 25: Element shouldn\'t be rendered');
	assert_equals(d.querySelector('#li6').offsetHeight, 0, 'Point 26: Element shouldn\'t be rendered');
	
	//Young tree
	var s2 = createSR(host);
	
	var div2 = d.createElement('div');	
	div2.innerHTML = '<span id="spn1">A young shadow tree</span>' + 
		'<shadow id="shTree"></shadow>'; 
	s2.appendChild(div2);
	
	//styles still should be inherited
	assert_equals(d.querySelector('#li1').offsetHeight, height1, 'Point 31: Element height should not be changed');
	assert_equals(d.querySelector('#li3').offsetHeight, height3, 'Point 32: Element height should not be changed');
	assert_equals(d.querySelector('#li5').offsetHeight, height5, 'Point 33: Element height should not be changed');
	
	assert_false(isVisible(d.querySelector('#li2')), 'Point 34: Element shouldn\'t be rendered');
	assert_false(isVisible(d.querySelector('#li4')), 'Point 35: Element shouldn\'t be rendered');
	assert_false(isVisible(d.querySelector('#li6')), 'Point 36: Element shouldn\'t be rendered');
	
	var spnHeight = s2.querySelector('#spn1').offsetHeight;
	
	s2.querySelector('#shTree').resetStyleInheritance = true;
	
	assert_equals(d.querySelector('#li1').offsetHeight, defHeight1, 'Point 41: Inherited ' +
			'element style should be reset');
	assert_equals(d.querySelector('#li3').offsetHeight, defHeight3, 'Point 42: Inherited ' + 
			'element style should be reset');
	assert_equals(d.querySelector('#li5').offsetHeight, defHeight5, 'Point 43: Inherited ' +
			'element style should be reset');
	
	assert_equals(s2.querySelector('#spn1').offsetHeight, spnHeight, 'Element shouldn\'t ' +
		'be affected by resetStyleInheritance flag');
	
}), 'A_06_00_12_T02', PROPS(A_06_00_12, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));


//test shadow insertion point (<shadow reset-style-inheritance=true> element)
test(unit(function (ctx) {
	var d = newRenderedHTMLDocument(ctx);
    
    d.body.innerHTML = 
    	'<ul id="shHost">' +
    		'<li id="li1" class="shadow">1</li>' +
    		'<li id="li2" class="shadow2">2</li>' +
    		'<li id="li3" class="shadow">3</li>' +
    		'<li id="li4">4</li>' +
    		'<li id="li5" class="shadow">5</li>' +
    		'<li id="li6" class="shadow2">6</li>' +
    	'</ul>';

    
	var defHeight1 = d.querySelector('#li1').offsetHeight;
	var defHeight2 = d.querySelector('#li2').offsetHeight;
	var defHeight3 = d.querySelector('#li3').offsetHeight;
	var defHeight4 = d.querySelector('#li4').offsetHeight;
	var defHeight5 = d.querySelector('#li5').offsetHeight;
	var defHeight6 = d.querySelector('#li6').offsetHeight;
	
	assert_true(defHeight1 > 0, 'Point 1: Element height should be greater than zero');
	assert_true(defHeight2 > 0, 'Point 2: Element height should be greater than zero');
	assert_true(defHeight3 > 0, 'Point 3: Element height should be greater than zero');
	assert_true(defHeight4 > 0, 'Point 4: Element height should be greater than zero');
	assert_true(defHeight5 > 0, 'Point 5: Element height should be greater than zero');
	assert_true(defHeight6 > 0, 'Point 6: Element height should be greater than zero');
    
    var host = d.querySelector('#shHost');
    
    d.body.setAttribute('style', 'font-size: 30px');
    
	var height1 = d.querySelector('#li1').offsetHeight;
	var height2 = d.querySelector('#li2').offsetHeight;
	var height3 = d.querySelector('#li3').offsetHeight;
	var height4 = d.querySelector('#li4').offsetHeight;
	var height5 = d.querySelector('#li5').offsetHeight;
	var height6 = d.querySelector('#li6').offsetHeight;
    
    
	assert_true(height1 > defHeight1, 'Point 11: Element height should be changed');
	assert_true(height2 > defHeight2, 'Point 12: Element height should be changed');
	assert_true(height3 > defHeight3, 'Point 13: Element height should be changed');
	assert_true(height4 > defHeight4, 'Point 14: Element height should be changed');
	assert_true(height5 > defHeight5, 'Point 15: Element height should be changed');
	assert_true(height6 > defHeight6, 'Point 16: Element height should be changed');
    
	//Shadow root to play with
    var s = createSR(host);

	var div = d.createElement('div');	
	div.innerHTML ='<ul><content select=".shadow"></content></ul>'; 
	s.appendChild(div);
	
	assert_equals(d.querySelector('#li1').offsetHeight, height1, 'Point 21: Element height should not be changed');
	assert_equals(d.querySelector('#li3').offsetHeight, height3, 'Point 22: Element height should not be changed');
	assert_equals(d.querySelector('#li5').offsetHeight, height5, 'Point 23: Element height should not be changed');
	
	assert_false(isVisible(d.querySelector('#li2')), 'Point 24: Element shouldn\'t be rendered');
	assert_false(isVisible(d.querySelector('#li4')), 'Point 25: Element shouldn\'t be rendered');
	assert_false(isVisible(d.querySelector('#li6')), 'Point 26: Element shouldn\'t be rendered');
	
	//Young tree
	var s2 = createSR(host);
	
	var div2 = d.createElement('div');	
	div2.innerHTML = '<shadow reset-style-inheritance=true></shadow>'; 
	s2.appendChild(div2);
	
	//styles should be reset	
	assert_equals(d.querySelector('#li1').offsetHeight, defHeight1, 'Point 31: Inherited ' +
			'element style should be reset');
	assert_equals(d.querySelector('#li3').offsetHeight, defHeight3, 'Point 32: Inherited ' + 
			'element style should be reset');
	assert_equals(d.querySelector('#li5').offsetHeight, defHeight5, 'Point 33: Inherited ' +
			'element style should be reset');
	
}), 'A_06_00_12_T03', PROPS(A_06_00_12, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));
