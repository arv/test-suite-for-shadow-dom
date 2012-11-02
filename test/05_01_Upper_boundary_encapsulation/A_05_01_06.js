// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_01_06 = {
    name:'A_05_01_06',
    assert:'Upper-boundary encapsulation: ' +
        'The nodes are accessible using shadow root\'s DOM tree accessor methods',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation'
};

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');

    var s = new SR(d.body);

    var e = d.createElement('img');
    s.appendChild(e);
    assert_equals(s.getElementsByTagName('img').length, 1,
        'elements in shadow DOM must be accessible via the ' +
            'shadow root .getElementsByTagName DOM accessor');
    assert_equals(s.getElementsByTagNameNS('*', 'img').length, 1,
        'elements in shadow DOM must be accessible via the ' +
            'shadow root .getElementsByTagNameNS DOM accessor');

    e = d.createElement('div');
    e.setAttribute('class', 'bob');
    s.appendChild(e);
    assert_equals(s.getElementsByClassName('bob').length, 1,
        'elements in shadow DOM must be accessible via the ' +
            'shadow root .getElementsByClassName DOM accessor');

    e = d.createElement('span');
    e.setAttribute('id', 'spandex');
    s.appendChild(e);
    assert_equals(s.getElementById('spandex'), e,
        'elements in shadow DOM must be accessible via the ' +
            'shadow root .getElementById DOM accessor');

}, 'A_05_01_06_T01', PROPS(A_05_01_06, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));
