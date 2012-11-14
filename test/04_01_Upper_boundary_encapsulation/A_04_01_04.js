// Copyright 2012 Google Inc. All Rights Reserved.

var A_04_01_04 = {
    name:'A_04_01_04',
    assert:'Upper-boundary encapsulation: ' +
        'The nodes are not present the document\'s NodeList collection instances',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation',
    highlight:'The nodes are not present in any of the document\'s NodeList, HTMLCollection, ' +
        'or DOMElementMap instances'
};

// check node list returned by getElementsByTagName method
test(function () {
    var d = newHTMLDocument();
    var s = new SR(d.body);

    var span = document.createElement('span');
    s.appendChild(span);

    var nodeList = d.getElementsByTagName('span');
    assert_equals(nodeList.length, 0, 'elements in shadow DOM must not be exposed via ' +
        'document.getElementsByTagName');

}, 'A_04_01_04_T01', PROPS(A_04_01_04, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

// check node list returned by getElementsByTagNameNS method
test(function () {
    var d = newHTMLDocument();
    var s = new SR(d.body);

    var span = document.createElement('span');
    s.appendChild(span);

    // getElementsByTagNameNS
    var nodeList = d.getElementsByTagNameNS('*', 'span');
    assert_equals(nodeList.length, 0, 'elements in shadow DOM must not be exposed via ' +
        'document.getElementsByTagNameNS');

}, 'A_04_01_04_T02', PROPS(A_04_01_04, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

// check node list returned by getElementsByClassName method
test(function () {
    var d = newHTMLDocument();
    var s = new SR(d.body);

    var span = document.createElement('span');
    s.appendChild(span);

    span.setAttribute('class', 'shadowy');
    var nodeList = d.getElementsByClassName('shadowy');
    assert_equals(nodeList.length, 0, 'elements in shadow DOM must not be exposed via ' +
        'document.getElementsByClassName');

}, 'A_04_01_04_T03', PROPS(A_04_01_04, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

// check node list returned by querySelectorAll method
test(function () {
    var d = newHTMLDocument();
    var s = new SR(d.body);

    var span = document.createElement('span');
    s.appendChild(span);

    // querySelectorAll
    span.setAttribute('id', 'span_id');
    span.setAttribute('class', 'span_class');

    var nodeList1 = d.querySelectorAll('#span_id');
    assert_equals(nodeList1.length, 0, 'elements in shadow DOM must not be exposed via ' +
        'document.querySelectorAll by their id');

    var nodeList2 = d.querySelectorAll('.span_class');
    assert_equals(nodeList2.length, 0, 'elements in shadow DOM must not be exposed via ' +
        'document.querySelectorAll by their class name');

    var nodeList3 = d.querySelectorAll('span');
    assert_equals(nodeList3.length, 0, 'elements in shadow DOM must not be exposed via ' +
        'document.querySelectorAll by their tag name');

}, 'A_04_01_04_T04', PROPS(A_04_01_04, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

// check for HTMLCollection content
test(function () {
    var d = newHTMLDocument();
    var s = new SR(d.body);

    var htmlCollections = ['anchors', 'embeds', 'forms', 'images', 'links', 'plugins', 'scripts'];
    var htmlCollectionsElements = ['a', 'object', 'form', 'img', 'area', 'embed', 'script'];
    var cnt = 0;
    htmlCollectionsElements.forEach(function (tagName) {
        var e = d.createElement(tagName);
        s.appendChild(e);
        var collection = null;
        collection = d[htmlCollections[cnt]];
        if (collection) {
            assert_equals(collection.length, 0, 'Elements in shadow DOM must not be exposed via ' +
                'document.' + htmlCollections[cnt] + ' collection');
        }
        cnt++;
    })
}, 'A_04_01_04_T05', PROPS(A_04_01_04, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));
