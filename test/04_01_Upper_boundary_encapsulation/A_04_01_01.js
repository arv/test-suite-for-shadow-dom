// Copyright 2012 Google Inc. All Rights Reserved.

var A_04_01_01 = {
    name:'A_04_01_01',
    assert:'Upper-boundary encapsulation:' +
        'The ownerDocument property refers to the document of the shadow host',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation',
    highlight:'The ownerDocument property refers to the document of the shadow host'
};


// check that top-level elements (documentElement, head, body)
// has valid owner document when used as shadow hosts
test(function () {
    var d = newHTMLDocument();

    var s1 = new SR(d.body);
    assert_equals(s1.ownerDocument, d, 'Check for d.body node');

    var s2 = new SR(d.documentElement);
    assert_equals(s2.ownerDocument, d, 'Check for d.documentElement node');

    var s3 = new SR(d.head);
    assert_equals(s3.ownerDocument, d, 'Check for d.head node');

}, 'A_04_01_01_T01', PROPS(A_04_01_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

// check that elements with different depth in the original document
// has valid owner document when used as shadow hosts
test(function () {
    var d = newHTMLDocument();

    var e1 = d.createElement('div');
    d.body.appendChild(e1);
    var s1 = new SR(e1);
    assert_equals(s1.ownerDocument, d, 'Check for a simple element at depth 1 [div]');


    var e2 = d.createElement('h1');
    e1.appendChild(e2);
    var s2 = new SR(e2);
    assert_equals(s2.ownerDocument, d, 'Check for a simple element at depth 2: [div.h1]');

    var e3 = d.createElement('script');
    e2.appendChild(e3);
    var s3 = new SR(e3);
    assert_equals(s3.ownerDocument, d, 'Check for a simple element at depth 3: [div.h1.script]');

}, 'A_04_01_01_T02', PROPS(A_04_01_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));


// check that element added to shadow tree automatically gets
// valid owner document
test(function () {
    var d = newHTMLDocument();
    var s = new SR(d.body);

    var e = d.createElement('div');
    e = s.appendChild(e);
    assert_equals(e.ownerDocument, d, 'the ownerDocument of a node in a shadow tree must refer ' +
        'to the document of the shadow host');

}, 'A_04_01_01_T03', PROPS(A_04_01_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

// check that element created by different document automatically
// gets valid owner document when added to shadow tree
test(function () {
    var d1 = newHTMLDocument();
    var d2 = newHTMLDocument();

    var s = new SR(d1.body);
    var e = d2.createElement('div');
    e = s.appendChild(e);

    assert_equals(e.ownerDocument, d1, 'the ownerDocument of an adopted node in a shadow tree ' +
        'must refer to the document of the shadow host');

}, 'A_04_01_01_T04', PROPS(A_04_01_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

// check that all child elements of adopted element automatically
// gets valid owner document when added to shadow tree
test(function () {
    var d1 = newHTMLDocument();
    var d2 = newHTMLDocument();
    var s = new SR(d1.body);

    var e1 = d2.createElement('div');
    var e2 = d2.createElement('div');

    e1.appendChild(e2);
    s.appendChild(e1);

    assert_equals(e2.ownerDocument, d1, 'the ownerDocument of an adopted node child nodes ' +
    	'in a shadow tree must refer to the document of the shadow host');

}, 'A_04_01_01_T05', PROPS(A_04_01_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:''
}));

// check that parent document of adopted element still refer to the
// original owner document
test(function () {
    var d1 = newHTMLDocument();
    var d2 = newHTMLDocument();
    var s = new SR(d1.body);

    var e1 = d2.createElement('div');
    var e2 = d2.createElement('div');

    e1.appendChild(e2);
    s.appendChild(e2);

    assert_equals(e1.ownerDocument, d2, 'the ownerDocument of an adopted node parent node in a shadow tree ' +
        'must refer to the original document');

}, 'A_04_01_01_T06', PROPS(A_04_01_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));