// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_01_01 = {
    name:'A_05_01_01',
    assert:'Upper-boundary encapsulation:' +
        'The ownerDocument property refers to the document of the shadow host',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation',
    highlight: 'The ownerDocument property refers to the document of the shadow host'
};


test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    var s1 = new SR(d.body);
    assert_equals(s1.ownerDocument, d, 'Check for d.body node');

    var s2 = new SR(d.documentElement);
    assert_equals(s2.ownerDocument, d, 'Check for d.documentElement node');

}, 'A_05_01_01_T01', PROPS(A_05_01_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');

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

}, 'A_05_01_01_T02', PROPS(A_05_01_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:''
}));

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    var n = d.createTextNode('div'); //create a text node
    d.body.appendChild(n);
    try {
        var s = new SR(n);
        assert(false, 'Text node can\'t be used as shadow root');
        //TODO: no such text in specification?? -> https://www.w3.org/Bugs/Public/show_bug.cgi?id=19690
    } catch (e) {
        //ok
    }
}, 'A_05_01_01_T03_01', PROPS(A_05_01_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:''
}));

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    var n = d.createComment('comment'); //create a comment node
    d.body.appendChild(n);
    try {
        var s = new SR(n);
        assert(false, 'Comment node can\'t be used as shadow root');
    } catch (e) {
        //ok
    }
}, 'A_05_01_01_T03_02', PROPS(A_05_01_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:''
}));

test(function () {
    var d = document.implementation.createDocument('test doc');
    var n = d.createCDATASection('text');
    d.documentElement.appendChild(n);
    try {
        var s = new SR(n);
        assert(false, 'CDATA section can\'t be used as shadow root');
    } catch (e) {
        //ok
    }
}, 'A_05_01_01_T03_03', PROPS(A_05_01_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:''
}));

test(function () {
    var d = document.implementation.createDocument('test doc');
    var n = d.createAttribute('text');
    d.documentElement.setAttributeNode(n);
    try {
        var s = new SR(n);
        assert(false, 'Check that Attribute node can\'t be used as shadow root');
    } catch (e) {
        //ok
    }
}, 'A_05_01_01_T03_04', PROPS(A_05_01_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:''
}));


test(function () {
    var d = document.implementation.createDocument('test doc');
    var n = d.createDocumentFragment();
    d.documentElement.appendChild(n);
    try {
        var s = new SR(n);
        assert(false, 'DocumentFragment node can\'t be used as shadow root');
    } catch (e) {
        //ok
    }
}, 'A_05_01_01_T03_05', PROPS(A_05_01_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:''
}));

test(function () {
    var d = document.implementation.createDocument('test doc');
    var n = d.createEntityReference('reference');
    d.documentElement.appendChild(n);
    try {
        var s = new SR(n);
        assert(false, 'Entity Reference node can\'t be used as shadow root');
    } catch (e) {
        //ok
    }
}, 'A_05_01_01_T03_06', PROPS(A_05_01_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:''
}));

test(function () {
    var d = document.implementation.createDocument('test doc');
    var n = d.createProcessingInstruction('xml', ' version = "1.0"');
    d.documentElement.appendChild(n);
    try {
        var s = new SR(n);
        assert(false, 'Processing instruction node can\'t be used as shadow root');
    } catch (e) {
        //ok
    }
}, 'A_05_01_01_T03_07', PROPS(A_05_01_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:''
}));


test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    var s = new SR(d.body);

    var e = d.createElement('div');

    e = s.appendChild(e);
    assert_equals(e.ownerDocument, d,
        'the ownerDocument of a node in a shadow tree must refer ' +
            'to the document of the shadow host');

}, 'A_05_01_01_T04', PROPS(A_05_01_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

test(function () {
    var d1 = document.implementation.createHTMLDocument('test doc');
    var d2 = document.implementation.createHTMLDocument('test doc 2');
    var s = new SR(d1.body);

    var e = d2.createElement('div');
    e = s.appendChild(e);

    assert_equals(e.ownerDocument, d1,
        'the ownerDocument of an adopted node in a shadow tree ' +
            'must refer to the document of the shadow host');

}, 'A_05_01_01_T05', PROPS(A_05_01_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

test(function () {
    var d1 = document.implementation.createHTMLDocument('test doc');
    var d2 = document.implementation.createHTMLDocument('test doc 2');
    var s = new SR(d1.body);

    var e1 = d2.createElement('div');
    var e2 = d2.createElement('div');
    e1.appendChild(e2);

    e1 = s.appendChild(e1);

    assert_equals(e2.ownerDocument, d1,
        'the ownerDocument of an adopted node child nodes in a shadow tree ' +
            'must refer to the document of the shadow host');

}, 'A_05_01_01_T06', PROPS(A_05_01_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:''
}));

test(function () {
    var d1 = document.implementation.createHTMLDocument('test doc');
    var d2 = document.implementation.createHTMLDocument('test doc 2');
    var s = new SR(d1.body);

    var e1 = d2.createElement('div');
    var e2 = d2.createElement('div');
    e1.appendChild(e2);

    e2 = s.appendChild(e2);

    assert_equals(e1.ownerDocument, d2,
        'the ownerDocument of an adopted node parent node in a shadow tree ' +
            'must refer to the original document');

}, 'A_05_01_01_07', PROPS(A_05_01_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:''
}));
