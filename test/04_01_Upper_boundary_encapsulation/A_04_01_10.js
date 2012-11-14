// Copyright 2012 Google Inc. All Rights Reserved.

var A_04_01_10 = {
    name:'A_04_01_10',
    assert:'Upper-boundary encapsulation: attributes of the shadow root object',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation',
    highlight:'The parentNode and parentElement attributes of the shadow root object ' +
        'must always return null.'
};

//check parentNode of usual shadow
test(function () {
    var d = newHTMLDocument();
    var s = new SR(d.body);

    assert_equals(s.parentNode, null, 'the parentNode attribute of the shadow ' +
        'root object must always return null');

}, 'A_04_01_10_T01', PROPS(A_04_01_10, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

//check parentElement of usual shadow
test(function () {
    var d = newHTMLDocument();
    var s = new SR(d.body);

    assert_equals(s.parentElement, null, 'the parentElement attribute of the shadow root object ' +
        'must always return null');

}, 'A_04_01_10_T02', PROPS(A_04_01_10, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

//check parentNode for nested shadow
test(function () {
    var d = newHTMLDocument();
    var s1 = new SR(d.body);
    var e1 = d.createElement('div');
    s1.appendChild(e1);
    var s2 = new SR(e1);

    assert_equals(s2.parentNode, null, 'the parentNode attribute of the shadow ' +
        'root object must always return null');

}, 'A_04_01_10_T03', PROPS(A_04_01_10, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:''
}));

//check parentElement for nested shadow
test(function () {
    var d = newHTMLDocument();
    var s1 = new SR(d.body);
    var e1 = d.createElement('div');
    s1.appendChild(e1);
    var s2 = new SR(e1);

    assert_equals(s2.parentElement, null, 'the parentElement attribute of the shadow root object ' +
        'must always return null');

}, 'A_04_01_10_T04', PROPS(A_04_01_10, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:''
}));
