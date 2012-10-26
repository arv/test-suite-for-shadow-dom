// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_03_03 = {
    name:'A_05_03_03',
    assert:'Matching Insertion Points: ' +
        'A valid selector fragment may contain a class selector',
    link:'http://www.w3.org/TR/shadow-dom/#matching-insertion-points'
};

var A_05_03_03_T01 = async_test('A_05_03_03_T01', PROPS(A_05_03_03, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));


A_05_03_03_T01.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_03_03_T01.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = new SR(ul);

            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<ul><content select=".shadow"></content></ul>';
            s.appendChild(subdiv1);

            //The order of DOM elements should be the following:
            //li3, li6. Other elements invisible
            assert_true(d.querySelector('#li3').offsetTop < d.querySelector('#li6').offsetTop,
                'Class name should be a valid insertion point matching criteria');
            assert_true(d.querySelector('#li3').offsetTop > 0,
                'Class name should be a valid insertion point matching criteria, element should be visible');

            assert_equals(d.querySelector('#li1').offsetTop, 0,
                'Point 1: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
                'Point 2: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li4').offsetTop, 0,
                'Point 3: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li5').offsetTop, 0,
                'Point 4: Elements that don\'t mach insertion point criteria participate in distribution');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_03_03_T01.done();
    });
});