// Copyright 2012 Google Inc. All Rights Reserved.

var A_04_01_03 = {
    name:'A_04_01_03',
    assert:'Upper-boundary encapsulation: ' +
        'The nodes and named elements are not accessible with Window object named properties',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation',
    highlight:'[[The nodes and named elements are not accessible]] using shadow host\'s document DOM tree accessors or [[with Window object named properties]]'

};

// check that 'a', 'applet', 'area', 'embed', 'form', 'frame',
// 'frameset', 'iframe', 'img' and 'object' named elements do not
// appear in window object named properties
test(unit(function (ctx) {
    var f = newIFrame(ctx);
    var d = f.contentWindow.document;

    var div = d.createElement('div');
    d.body.appendChild(div);
    var s = new SR(div);

    //Window named properties
    var namedElements = ['a', 'applet', 'area', 'embed', 'form', 'frame',
        'frameset', 'iframe', 'img', 'object'];

    namedElements.forEach(function (tagName) {
        var element = d.createElement(tagName);
        element.name = 'named_' + tagName;
        s.appendChild(element);

        assert_false(element.name in f.contentWindow,
            'named "' + tagName + '" must not appear in window object named properties');

        assert_false(element.name in d,
            'named "' + tagName + '" must not appear in document object named properties');
    });
}), 'A_04_01_03_T01', PROPS(A_04_01_03, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

// check that element with ID does not appear in window object named properties
test(unit(function (ctx) {
    var f = newIFrame(ctx);
    var d = f.contentWindow.document;

    var div1 = d.createElement('div');
    d.body.appendChild(div1);
    var s = new SR(div1);

    var div2 = d.createElement('div');
    div2.id = 'divWithId';
    s.appendChild(div2);

    assert_false('divWithId' in f.contentWindow,
        'element with ID must not appear in window object named properties');

}), 'A_04_01_03_T2', PROPS(A_04_01_03, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));
