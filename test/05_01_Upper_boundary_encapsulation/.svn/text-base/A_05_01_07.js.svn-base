// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_01_07 = {
    name:'A_05_01_07',
    assert:'Upper-boundary encapsulation:' +
        'The selectors must not cross the shadow boundary from the document' +
        'tree into the shadow DOM subtree',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation'
};

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');

    var s = new SR(d.body);

    var e = d.createElement('span');
    e.setAttribute('id', 'spandex');
    e.setAttribute('class', 'shadowy');
    s.appendChild(e);

    assert_equals(d.querySelector('span'), null,
        'elements in shadow DOM must not be accessible via the ' +
            'document host\'s tag name selectors');

    assert_equals(d.querySelector('.shadowy'), null,
        'elements in shadow DOM must not be accessible via the ' +
            'document host\'s .className selectors');

    assert_equals(d.querySelector('#spandex'), null,
        'elements in shadow DOM must not be accessible via the ' +
            'document host\'s #id selectors');

}, 'A_05_01_07_T01', PROPS(A_05_01_07, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));
