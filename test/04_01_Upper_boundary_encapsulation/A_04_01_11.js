/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_04_01_11 = {
    name:'A_04_01_11',
    assert:'Upper-boundary encapsulation:The style sheets, represented by the shadow nodes ' +
        'are not accessible using shadow host document\'s CSSOM extensions',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation',
    highlight:'The style sheets, represented by the nodes are not accessible using ' +
        'shadow host document\'s CSSOM extensions',
    bug: ['https://bugs.webkit.org/show_bug.cgi?id=103393', 'https://bugs.webkit.org/show_bug.cgi?id=105274']
};

// check that <style> element added to head is not exposed
test_in_iframe('resources/blank.html', function(ctx){
  var d = ctx.iframes[0].contentWindow.document;
  var initialStyleSheetsCount = d.styleSheets.length;
  var s = createSR(d.head);
  var style = d.createElement('style');
  s.appendChild(style);
  assert_equals(d.styleSheets.length, initialStyleSheetsCount, 'style elements in shadow DOM must not be exposed via ' +
      'the document.styleSheets collection ');
},
  'A_04_01_11_T01', PROPS(A_04_01_11, {
  author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
  reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));



// check that <link> element added to head is not exposed
test_in_iframe(null, function(ctx){
	var d = ctx.iframes[0].contentWindow.document;
	var initialStyleSheetsCount = d.styleSheets.length;

	var link = d.createElement('link');
	link.setAttribute('href', 'testharness.css');
	link.setAttribute('rel', 'stylesheet');
	d.body.appendChild(link);

	//create Shadow root
	var root = d.createElement('div');
	d.body.appendChild(root);
	var s = createSR(root);

	s.appendChild(link);

	assert_equals(d.styleSheets.length, initialStyleSheetsCount, 'stylesheet link elements in shadow DOM must not be ' +
            'exposed via the document.styleSheets collection');
},
	'A_04_01_11_T2', PROPS(A_04_01_11, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));


// TODO check selectedStyleSheetSet, lastStyleSheetSet, preferredStyleSheetSet, styleSheetSets

