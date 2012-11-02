// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_01_09 = {
    name:'A_05_01_09',
    assert:'Upper-boundary encapsulation: no nodes other than shadow root ' +
        'descendants are accessible with shadow root DOM tree accessor methods',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation'
};

function assert_nodelist_contents(expected, actual, message) {
    assert_equals(expected.length, actual.length, message);
    for (var i = 0; i < expected.length; i++) {
        assert_equals(expected[i], actual[i], message);
    }
}


test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    d.body.innerHTML =
        '<div id="m" name="name_m" class="a"></div>' +
            '<p>' + // host
            '  <div id="n" name="name_n" class="a"></div>' +
            '</p>';

    var s = new SR(d.body.lastChild);
    s.innerHTML =
        '<div id="o" name="name_o" class="a"></div>' +
            '<p>' + // inner host
            '  <div id="p" name="name_p" class="a"></div>' +
            '</p>';

    var innerShadow = new SR(s.lastChild);
    innerShadow.innerHTML = '<div id="q" name="name_q" class="a"></div>';

    var m = d.querySelector('#m');
    var n = d.querySelector('#n');
    var o = s.querySelector('#o');
    var p = s.querySelector('#p');
    var q = innerShadow.querySelector('#q');

    assert_true(m != null, 'set up: m');
    assert_true(n != null, 'set up: n');
    assert_true(o != null, 'set up: o');
    assert_true(p != null, 'set up: p');
    assert_true(q != null, 'set up: q');

    // getElementsByTagName
    assert_nodelist_contents(
        s.getElementsByTagName('div'), [o, p],
        'no nodes other than shadow root descendants are accessible with ' +
            'ShadowRoot.getElementsByTagName');

    // getElementsByTagNameNS
    assert_nodelist_contents(
        s.getElementsByTagNameNS('*', 'div'), [o, p],
        'no nodes other than shadow root descendants are accessible with ' +
            'ShadowRoot.getElementsByTagNameNS');

    // getElementsByClassName
    assert_nodelist_contents(
        s.getElementsByClassName('a'), [o, p],
        'no nodes other than shadow root descendants are accessible with ' +
            'ShadowRoot.getElementsByClassName');

    // getElementById
    assert_equals(s.getElementById('m'), null,
        'elements in the document must not be exposed via ' +
            'ShadowRoot.getElementById');
    assert_equals(s.getElementById('n'), null,
        'children of the host element must not be exposed via ' +
            'ShadowRoot.getElementById');
    assert_equals(s.getElementById('q'), null,
        'elements in a nested shadow root must not be exposed via ' +
            'ShadowRoot.getElementById');
}, 'A_05_01_09_T01', PROPS(A_05_01_09, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));
