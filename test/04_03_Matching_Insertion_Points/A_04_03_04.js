// Copyright 2012 Google Inc. All Rights Reserved.

var A_04_03_04 = {
    name:'A_04_03_04',
    assert:'Matching Insertion Points: ' +
        'A valid selector fragment may contain an ID selector',
    link:'http://www.w3.org/TR/shadow-dom/#matching-insertion-points',
    highlight: '[[A valid selector fragment may contain:]][\\s\\S]*[[An ID selector]]'
};

var A_04_03_04_T01 = async_test('A_04_03_04_T01', PROPS(A_04_03_04, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_04_03_04_T01.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_03_04_T01.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = new SR(ul);

            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<ul><content select="#li4"></content></ul>';
            s.appendChild(subdiv1);

            //The order of DOM elements should be the following:
            //li4. Other elements invisible
            assert_true(d.querySelector('#li4').offsetTop > 0,
                'Class name should be a valid insertion point matching criteria, element should be visible');

            assert_equals(d.querySelector('#li1').offsetTop, 0,
                'Point 1: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
                'Point 2: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li3').offsetTop, 0,
                'Point 3: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li5').offsetTop, 0,
                'Point 4: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li6').offsetTop, 0,
                'Point 5: Elements that don\'t mach insertion point criteria participate in distribution');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_03_04_T01.done();
    });
});