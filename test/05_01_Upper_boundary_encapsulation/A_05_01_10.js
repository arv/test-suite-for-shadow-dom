// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_01_10 = {
    name:'A_05_01_10',
    assert:'Upper-boundary encapsulation: attributes of the shadow root object',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation'
};

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    var s = new SR(d.body);
    assert_equals(s.parentNode, null, 'the parentNode attribute of the shadow ' +
        'root object must always return null');
    assert_equals(s.parentElement, null,
        'the parentElement attribute of the shadow root object ' +
            'must always return null');
}, 'A_05_01_10_T01', PROPS(A_05_01_10, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));
