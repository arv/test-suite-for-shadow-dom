// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_01_02 = {
    name:'A_05_01_02',
    assert:'Upper-boundary encapsulation: ' +
        'The nodes and named elements are not accessible using shadow host\'s ' +
        'document DOM tree accessors',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation'
};

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    var sd = document.implementation.createHTMLDocument('shadow doc');
    var s = new SR(d.documentElement);

    // head, title, body
    s.appendChild(sd.head);
    s.appendChild(sd.body);

    assert_equals(sd.head, null, 'head in shadow DOM must not be exposed ' +
        'via the document.head DOM accessor');

    assert_equals(sd.title, '', 'title text in shadow DOM must not be ' +
        'exposed via document.title DOM accessor');

    assert_equals(sd.body, null, 'body in shadow DOM must not be exposed ' +
        'via the document.body DOM accessor');

}, 'A_05_01_02_T01', PROPS(A_05_01_02, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    var sd = document.implementation.createHTMLDocument('shadow doc');
    var s = new SR(d.documentElement);

    // images
    var e = d.createElement('img');
    s.appendChild(e);
    assert_equals(d.images.length, 0,
        'images in shadow DOM must not be exposed via the ' +
            'document.images DOM accessor');

}, 'A_05_01_02_T02', PROPS(A_05_01_02, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    var sd = document.implementation.createHTMLDocument('shadow doc');
    var s = new SR(d.documentElement);

    // embeds
    e = d.createElement('embed');
    s.appendChild(e);
    assert_equals(d.embeds.length, 0,
        'embeds in shadow DOM must not be exposed via the ' +
            'document.embeds DOM accessor');
    assert_equals(d.plugins.length, 0,
        'embeds in shadow DOM must not be exposed via the ' +
            'document.plugins DOM accessor');

}, 'A_05_01_02_T03', PROPS(A_05_01_02, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    var sd = document.implementation.createHTMLDocument('shadow doc');
    var s = new SR(d.documentElement);

    // links
    e = d.createElement('a');
    e.setAttribute('href', 'http://www.w3.org/');
    s.appendChild(e);
    assert_equals(d.links.length, 0,
        'a elements with href attributes in shadow DOM must not ' +
            'be exposed via the document.links DOM accessor');
    e = d.createElement('area');
    e.setAttribute('href', 'http://www.w3.org/');
    s.appendChild(e);
    assert_equals(d.links.length, 0,
        'area elements with href attributes in shadow DOM must ' +
            'not be exposed via the document.links DOM accessor');

}, 'A_05_01_02_T04', PROPS(A_05_01_02, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    var sd = document.implementation.createHTMLDocument('shadow doc');
    var s = new SR(d.documentElement);

    // forms
    e = d.createElement('form');
    s.appendChild(e);
    assert_equals(d.forms.length, 0,
        'form elements in shadow DOM must not be exposed via the ' +
            'document.forms DOM accessor');

}, 'A_05_01_02_T05', PROPS(A_05_01_02, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    var sd = document.implementation.createHTMLDocument('shadow doc');
    var s = new SR(d.documentElement);

    //scripts
    e = d.createElement('script');
    s.appendChild(e);
    assert_equals(d.scripts.length, 0,
        'script elements in shadow DOM must not be exposed via ' +
            'the document.scripts DOM accessor');
}, 'A_05_01_02_T06', PROPS(A_05_01_02, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');
    var sd = document.implementation.createHTMLDocument('shadow doc');
    var s = new SR(d.documentElement);

    // images, embeds, plugins, links, forms, scripts

    // getElementsByName
    e = d.createElement('div');
    e.setAttribute('name', 'bob');
    s.appendChild(e);
    assert_equals(d.getElementsByName('bob').length, 0,
        'elements in shadow DOM must not be exposed via the ' +
            'getElementsByName DOM accessor');
}, 'A_05_01_02_T07', PROPS(A_05_01_02, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));


test(function () {
    var d = document.implementation.createHTMLDocument('test doc');

    var shDoc = document.implementation.createHTMLDocument('shadow doc');

    // head, title, body
    var s = new SR(d.documentElement);
    s.appendChild(shDoc.head);
    s.appendChild(shDoc.body);

    //Window named properties
    var namedElements = ['a', 'applet', 'area', 'embed', 'form', 'frame',
        'frameset', 'iframe', 'img', 'object'];
    namedElements.forEach(function (tagName) {
        var element = d.createElement(tagName);
        element.name = 'named' + tagName;
        s.appendChild(element);
        assert_true(!(element.name in window),
            'named ' + tagName + ' must not appear in window object ' +
                'named properties');
    });

    var f = d.createElement('div');
    f.id = 'divWithId';
    s.appendChild(f);
    assert_true(!('divWithId' in window),
        'element with ID must not appear in window object named ' +
            'properties');

}, 'A_05_01_02_T08', PROPS(A_05_01_02, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));
