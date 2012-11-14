// Copyright 2012 Google Inc. All Rights Reserved.

var A_04_01_05 = {
    name:'A_04_01_05',
    assert:'Upper-boundary encapsulation:' +
        'The nodes with a unique id and named elements are not addressable ' +
        'from any attributes of elements in shadow host\'s document',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation',
    highlight:'The nodes with a unique id and named elements are not addressable from ' +
        'any attributes of elements in shadow host\'s document'
};

// check label.for attribute
test(function () {
    var d = newHTMLDocument();
    var div = d.createElement('div');
    d.body.appendChild(div);
    var s = new SR(div);

    // node in shadow with id
    var input = d.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'input_id');
    s.appendChild(input);

    // node in host with a reference to host element with id
    var label = d.createElement('label');
    label.setAttribute('for', 'input_id');
    d.body.appendChild(label);

    assert_equals(label.control, null, 'Elements in shadow DOM must not be accessible from ' +
        'owner\'s document label.for attribute');

}, 'A_04_01_05_T01', PROPS(A_04_01_05, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

// check form associated elements
test(function () {
    var formAssociatedElements = ['button', 'fieldset', 'input', 'keygen', 'label', 'object',
        'output', 'select', 'textarea'];

    formAssociatedElements.forEach(function (tagName) {
        var d = newHTMLDocument();
        div = d.createElement('div');
        d.body.appendChild(div);
        s = new SR(div);

        var form = d.createElement('form');
        var el = d.createElement(tagName);

        form.setAttribute('id', 'form_id');
        el.setAttribute('form', 'form_id');

        s.appendChild(form);
        d.body.appendChild(el);

        assert_equals(el.form, null, 'Elements in shadow DOM must not be accessible from ' +
            'owner\'s document ' + tagName + '.form attribute');
    });
}, 'A_04_01_05_T02', PROPS(A_04_01_05, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));
