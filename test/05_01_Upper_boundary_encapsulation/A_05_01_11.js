// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_01_11 = {
    name:'A_05_01_11',
    assert:'Upper-boundary encapsulation:The style sheets, represented by the nodes ' +
        'are not accessible using shadow host document\'s CSSOM extensions',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation'
};

var A_05_01_11_T1 = async_test('A_05_01_11_T01', PROPS(A_05_01_11, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));

A_05_01_11_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/blank.html';
    document.body.appendChild(iframe);
    iframe.onload = A_05_01_11_T1.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var s = new SR(d.head);
            var style = d.createElement('style');
            s.appendChild(style);
            assert_equals(d.styleSheets.length, 0,
                'style elements in shadow DOM must not be exposed via ' +
                    'the document.styleSheets collection');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_01_11_T1.done();
    });
});


var A_05_01_11_T2 = async_test('A_05_01_11_T02', PROPS(A_05_01_11, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));

A_05_01_11_T2.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/blank.html';
    document.body.appendChild(iframe);
    iframe.onload = A_05_01_11_T2.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var s = new SR(d.head);

            var link = d.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', 'testharness.css');
            s.appendChild(link);
            assert_equals(d.styleSheets.length, 0,
                'stylesheet link elements in shadow DOM must not be ' +
                    'exposed via the document.styleSheets collection');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_01_11_T2.done();
    });
});

