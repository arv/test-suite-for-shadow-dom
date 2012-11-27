/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_06_00_03 = {
    name:'A_06_00_03',
    assert: 'Styles: ' +
		'Each shadow root has an associated list of zero or more style sheets, ' +
    	'named shadow root style sheets',
    link:'http://www.w3.org/TR/shadow-dom/#styles',
    highlight:'Each shadow root has an associated list of zero or more style sheets, ' +
    	'named shadow root style sheets'
};

//TODO Now this tests produces an error because styleSheets property 
// is not implemented. See https://bugs.webkit.org/show_bug.cgi?id=103393
var A_06_00_03_T01 = async_test('A_06_00_03_T01', PROPS(A_06_00_03, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_06_00_03_T01.step(unit(function (ctx) {	
	
	var iframe = newIFrame(ctx, 'resources/bobs_page.html');
	
	iframe.onload = A_06_00_03_T01.step_func(function() {
		var d = iframe.contentWindow.document;

	    var ul = d.querySelector('ul.stories');
	    var s = new SR(ul);

		assert_equals(s.styleSheets.length, 0, 'There should be no style sheets');
		A_06_00_03_T01.done();
    });		
}));


//TODO Now this tests produces an error because styleSheets property 
//is not implemented. See https://bugs.webkit.org/show_bug.cgi?id=103393
var A_06_00_03_T02 = async_test('A_06_00_03_T02', PROPS(A_06_00_03, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_06_00_03_T02.step(unit(function (ctx) {	
	
	var iframe = newIFrame(ctx, 'resources/bobs_page.html');
	
	iframe.onload = A_06_00_03_T02.step_func(function() {
		var d = iframe.contentWindow.document;

	    var ul = d.querySelector('ul.stories');
	    ul.setAttribute('style', 'width:100px');
	    var s = new SR(ul);

		assert_equals(s.styleSheets.length, 0, 'There should be no style sheets');
		A_06_00_03_T02.done();
    });		
}));


//TODO Now this tests produces an error because addStyleSheet method 
//is not implemented. See https://bugs.webkit.org/show_bug.cgi?id=103395
var A_06_00_03_T03 = async_test('A_06_00_03_T03', PROPS(A_06_00_03, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_06_00_03_T03.step(unit(function (ctx) {	
	
	var iframe = newIFrame(ctx, 'resources/bobs_page.html');
	
	iframe.onload = A_06_00_03_T03.step_func(function() {
		var d = iframe.contentWindow.document;

	    var ul = d.querySelector('ul.stories');
	    var s = new SR(ul);
	    // create StyleSheet
	    var style = d.createElement('style');
	    s.addStyleSheet(style);

		assert_equals(s.styleSheets.length, 1, 'Style sheet is not accessible via styleSheets');
		A_06_00_03_T03.done();
    });		
}));