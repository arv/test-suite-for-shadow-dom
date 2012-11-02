// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_01_07 = {
    name:'A_05_01_07',
    assert:'Upper-boundary encapsulation:' +
        'The nodes with a unique id and named elements are addressable ' +
        'from any attributes of elements in the same shadow DOM subtree',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation'
};

test(function () {
    var d = document.implementation.createHTMLDocument('test doc');

    var div = d.createElement('div');
    d.body.appendChild(div);

    var s = new SR(div);

    var inp = d.createElement('input');
    inp.setAttribute('type', 'text');
    inp.setAttribute('id', 'inpid');
    d.body.appendChild(inp);

    var lbl = d.createElement('label');
    lbl.setAttribute('for', 'inpid');
    s.appendChild(lbl);
    s.appendChild(inp);

    assert_equals(lbl.control, inp, 'Elements in shadow DOM must be accessible from ' +
        'shadow document label.for attribute');


    var formAssociatedElements = ['button', 'fieldset', 'input', 'keygen', 'label', 'object',
        'output', 'select', 'textarea'];

    formAssociatedElements.forEach(function (tagName) {
        d = document.implementation.createHTMLDocument('test doc');

        var form = d.createElement('form');
        var el = d.createElement(tagName);

        d.body.appendChild(form);
        d.body.appendChild(el);

        form.setAttribute('id', 'formid');
        el.setAttribute('form', 'formid');

        div = d.createElement('div');
        d.body.appendChild(div);

        s = new SR(div);
        s.appendChild(form);
        s.appendChild(el);

        assert_equals(el.form, form, 'Elements in shadow DOM must be accessible from ' +
            'shadow document ' + tagName + '.form attribute');
    });
}, 'A_05_01_07_T01', PROPS(A_05_01_07, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));
