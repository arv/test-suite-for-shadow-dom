// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_01_03 = {
    name:'A_05_01_03',
    assert:'Upper-boundary encapsulation: ' +
        'The nodes and named elements are not accessible with Window object named properties',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation',
    highlight:'[[The nodes and named elements are not accessible]] using shadow host\'s document DOM tree accessors or [[with Window object named properties]]'

};

test(function () {
    var d = document;

    var div = d.createElement('div');
    d.body.appendChild(div);
    var s = new SR(div);

    try {
        //Window named properties
        var namedElements = ['a', 'applet', 'area', 'embed', 'form', 'frame',
            'frameset', 'iframe', 'img', 'object'];

        namedElements.forEach(function (tagName) {
            var element = d.createElement(tagName);
            element.name = 'named' + tagName;
            s.appendChild(element);

            assert_false(element.name in window,
                'named "' + tagName + '" must not appear in window object named properties');
        });
    } finally {
        d.body.removeChild(div);
    }
}, 'A_05_01_03_T01', PROPS(A_05_01_03, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));


test(function () {
    var d = document;

    var div = d.createElement('div');
    d.body.appendChild(div);
    var s = new SR(div);

    try {
        var f = d.createElement('div');
        f.id = 'divWithId';
        s.appendChild(f);
        assert_false('divWithId' in window,
            'element with ID must not appear in window object named properties');
    } finally {
        d.body.removeChild(div);
    }

}, 'A_05_01_03_T2', PROPS(A_05_01_03, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));
