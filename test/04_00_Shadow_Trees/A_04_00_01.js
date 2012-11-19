/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_04_00_01 = {
    name:'A_04_00_01',
    assert:'Any element in the document tree is able to host one or more DOM subtrees',
    link:'http://www.w3.org/TR/shadow-dom/#shadow-dom-subtrees',
    highlight:'The existence of multiple DOM trees is enabled by letting any element in the ' +
        'document tree to host one or more additional DOM trees'
};

// check one or multiple shadows for usual element (<div>)
test(function () {
    var d = newHTMLDocument();
    var n = d.createElement('div');

    d.body.appendChild(n);

    var s1 = new SR(n);
    assert_equals(s1.ownerDocument, d, 'Check1 for s1.ownerDocument value');

    var s2 = new SR(n);
    assert_equals(s2.ownerDocument, d, 'Check1 for s2.ownerDocument value');

    assert_equals(s1.ownerDocument, d, 'Check2 for s1.ownerDocument value');

}, 'A_04_00_01_T01', PROPS(A_04_00_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));


// check one or multiple shadows for more complex element (<iframe>)
test(function () {
    var d = newHTMLDocument();
    var n = d.createElement('iframe');

    d.body.appendChild(n);

    var s1 = new SR(n);
    assert_equals(s1.ownerDocument, d, 'Check1 for s1.ownerDocument value');

    var s2 = new SR(n);
    assert_equals(s2.ownerDocument, d, 'Check1 for s2.ownerDocument value');

    assert_equals(s1.ownerDocument, d, 'Check2 for s1.ownerDocument value');

}, 'A_04_00_01_T02', PROPS(A_04_00_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// check one or multiple shadows for markup elements that usually do not have children (<br>)
test(function () {
    var d = newHTMLDocument();
    var n = d.createElement('br');

    d.body.appendChild(n);

    var s1 = new SR(n);
    assert_equals(s1.ownerDocument, d, 'Check1 for s1.ownerDocument value');

    var s2 = new SR(n);
    assert_equals(s2.ownerDocument, d, 'Check1 for s2.ownerDocument value');

    assert_equals(s1.ownerDocument, d, 'Check2 for s1.ownerDocument value');

}, 'A_04_00_01_T03', PROPS(A_04_00_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// check one or multiple shadows for special functional elements that do not participate
// in rendering (<script>)
test(function () {
    var d = newHTMLDocument();
    var n = d.createElement('script');

    d.body.appendChild(n);

    var s1 = new SR(n);
    assert_equals(s1.ownerDocument, d, 'Check1 for s1.ownerDocument value');

    var s2 = new SR(n);
    assert_equals(s2.ownerDocument, d, 'Check1 for s2.ownerDocument value');

    assert_equals(s1.ownerDocument, d, 'Check2 for s1.ownerDocument value');

}, 'A_04_00_01_T04', PROPS(A_04_00_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));


// check one or multiple shadows for elements in document head (<link>)
test(function () {
    var d = newHTMLDocument();
    var n = d.createElement('link');

    d.head.appendChild(n);

    var s1 = new SR(n);
    assert_equals(s1.ownerDocument, d, 'Check1 for s1.ownerDocument value');

    var s2 = new SR(n);
    assert_equals(s2.ownerDocument, d, 'Check1 for s2.ownerDocument value');

    assert_equals(s1.ownerDocument, d, 'Check2 for s1.ownerDocument value');

}, 'A_04_00_01_T05', PROPS(A_04_00_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// check one or multiple shadows for non-valid HTML tag
test(function () {
    var d = newHTMLDocument();
    var n = d.createElement('babai');

    d.body.appendChild(n);

    var s1 = new SR(n);
    assert_equals(s1.ownerDocument, d, 'Check1 for s1.ownerDocument value');

    var s2 = new SR(n);
    assert_equals(s2.ownerDocument, d, 'Check1 for s2.ownerDocument value');

    assert_equals(s1.ownerDocument, d, 'Check2 for s1.ownerDocument value');

}, 'A_04_00_01_T06', PROPS(A_04_00_01, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));



