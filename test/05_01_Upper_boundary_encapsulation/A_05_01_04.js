// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_01_04 = {
    name:'A_05_01_04',
    assert:'Upper-boundary encapsulation: ' +
        'The nodes are not present the document\'s NodeList collection instances',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation'
};

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    var s = new SR(d.body);

    //NodeList is returned by querySelectorAll, getElementsByClassName, getElementsByTagName etc
    var span = document.createElement('span');
    s.appendChild(span);

    // getElementsByTagName
    assert_equals(d.getElementsByTagName('span').length, 0,
        'elements in shadow DOM must not be exposed via ' +
            'document.getElementsByTagName');

    // getElementsByTagNameNS
    assert_equals(d.getElementsByTagNameNS('*', 'span').length, 0,
        'elements in shadow DOM must not be exposed via ' +
            'document.getElementsByTagNameNS');

    // getElementsByClassName
    span.setAttribute('class', 'shadowy');
    assert_equals(d.getElementsByClassName('shadowy').length, 0,
        'elements in shadow DOM must not be exposed via ' +
            'document.getElementsByClassName');

    // querySelectorAll
    span.setAttribute('id', 'spandex');
    assert_equals(d.querySelectorAll('#spandex').length, 0,
        'elements in shadow DOM must not be exposed via ' +
            'document.querySelectorAll by their id');
    assert_equals(d.querySelectorAll('.shadowy').length, 0,
        'elements in shadow DOM must not be exposed via ' +
            'document.querySelectorAll by their class name');
    assert_equals(d.querySelectorAll('span').length, 0,
        'elements in shadow DOM must not be exposed via ' +
            'document.querySelectorAll by their tag name');

}, 'A_05_01_04_T01', PROPS(A_05_01_04, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));


test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    var s = new SR(d.body);

    //HTMLCollection
    var htmlCollections = ['anchors', 'embeds', 'forms', 'images', 'links', 'plugins', 'scripts'];
    var htmlCollectionsElements = ['a', 'object', 'form', 'img', 'area', 'embed', 'script'];
    var cnt = 0;
    htmlCollectionsElements.forEach(function (tagName) {
        var element = d.createElement(tagName);
        s.appendChild(element);
        var collection = null;
        eval('collection = d.' + htmlCollections[cnt++] + ';');
        if (collection) {
            assert_equals(collection.length, 0, 'Elements in shadow DOM must not be exposed via ' +
                'document.' + htmlCollections[cnt++] + ' collection');
        }

    });
}, 'A_05_01_04_T02', PROPS(A_05_01_04, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));
