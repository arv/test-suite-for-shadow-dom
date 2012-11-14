// Copyright 2012 Google Inc. All Rights Reserved.

var A_04_00_03 = {
    name:'A_04_00_03',
    assert:'Shadow DOM subtree takes place of the shadow host\'s content when rendered',
    link:'http://www.w3.org/TR/shadow-dom/#shadow-dom-subtrees',
    highlight:'When rendered, the shadow tree takes place of the shadow host\'s content.'
};

// check that elements from shadow tree are rendered as a part of the host document
test(unit(function (ctx) {

    var d = newRenderedHTMLDocument(ctx);
    var div = d.createElement('div');
    d.body.appendChild(div);
    assert_true(div.offsetTop > 0, 'The host element is rendered before the check');

    var s = new SR(div);
    var hr = d.createElement('hr');
    assert_true(hr.offsetTop == 0, 'The element to be added to shadow is not rendered before the check');

    s.appendChild(hr);
    assert_true(hr.offsetTop >= div.offsetTop, 'The element is rendered after adding to shadow tree');

}), 'A_04_00_03_T01', PROPS(A_04_00_03, {
    author:'Mikhail Fursov <mfursov@unipro.ru>',
    reviewer:'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));


//check that shadow root content is replaced by the shadow tree
test(unit(function (ctx) {

    var d = newRenderedHTMLDocument(ctx);
    var div = d.createElement('div');
    div.innerHTML = '<span id="spandex">Shadow Root content to be replaced</span>';
    d.body.appendChild(div);

    assert_true(d.querySelector('#spandex').offsetTop > 0, 'The host element content is ' +
        'rendered before the check');

    var s = new SR(div);
    var hr = d.createElement('hr');
    assert_true(hr.offsetTop == 0, "The element to be added to shadow is not rendered before the check");

    s.appendChild(hr);
    assert_true(hr.offsetTop >= div.offsetTop, "The element is rendered after adding to shadow tree");
    assert_equals(d.querySelector('#spandex').offsetTop, 0, 'The shadow host element content should ' +
        'be replaced by the shadow tree');

}), 'A_04_00_03_T02', PROPS(A_04_00_03, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Mikhail Fursov <mfursov@unipro.ru>'
}));