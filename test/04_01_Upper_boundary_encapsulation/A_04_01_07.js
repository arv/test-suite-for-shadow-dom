// Copyright 2012 Google Inc. All Rights Reserved.

var A_04_01_07 = {
    name:'A_04_01_07',
    assert:'Upper-boundary encapsulation:' +
        'The nodes with a unique id and named elements are addressable ' +
        'from any attributes of elements in the same shadow DOM subtree',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation',
    highlight:'The nodes with a unique id and named elements are addressable ' +
        'from any attributes of elements in the same shadow tree'
};

// check for label.control
test(function () {
    var d = newHTMLDocument();
    var div = d.createElement('div');
    d.body.appendChild(div);
    var s = new SR(div);

    var input = d.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'input_id');
    d.body.appendChild(input);

    var label = d.createElement('label');
    label.setAttribute('for', 'input_id');
    s.appendChild(label);
    s.appendChild(input);

    assert_equals(label.control, input, 'Elements in shadow DOM must be accessible from ' +
        'shadow document label.for attribute');

}, 'A_04_01_07_T01', PROPS(A_04_01_07, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));

// check for elem.form associated elements
test(function () {

    var formAssociatedElements = ['button', 'fieldset', 'input', 'keygen', 'label', 'object',
        'output', 'select', 'textarea'];

    formAssociatedElements.forEach(function (tagName) {
        d = newHTMLDocument();

        var form = d.createElement('form');
        var el = d.createElement(tagName);

        d.body.appendChild(form);
        d.body.appendChild(el);

        form.setAttribute('id', 'form_id');
        el.setAttribute('form', 'form_id');

        div = d.createElement('div');
        d.body.appendChild(div);

        s = new SR(div);
        s.appendChild(form);
        s.appendChild(el);

        assert_equals(el.form, form, 'Elements in shadow DOM must be accessible from ' +
            'shadow document ' + tagName + '.form attribute');
    });
}, 'A_04_01_07_T02', PROPS(A_04_01_07, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));
