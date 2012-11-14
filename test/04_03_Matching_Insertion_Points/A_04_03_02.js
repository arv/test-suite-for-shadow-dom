// Copyright 2012 Google Inc. All Rights Reserved.

var A_04_03_02 = {
    name:'A_04_03_02',
    assert:'Matching Insertion Points: ' +
        'A valid selector fragment may contain an universal selector',
    link:'http://www.w3.org/TR/shadow-dom/#matching-insertion-points',
    highlight:'[[A valid selector fragment may contain:]][\\s\\S]*[[a universal selector]]'
};

var A_04_03_02_T1 = async_test('A_04_03_02_T01', PROPS(A_04_03_02, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));


A_04_03_02_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_03_02_T1.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = new SR(ul);

            //make shadow subtree
            var subdiv1 = document.createElement('div');

            // TODO add tests for namespace universal selector ns|*
            subdiv1.innerHTML = '<ul><content select="*"></content></ul>';
            s.appendChild(subdiv1);

            //The order of DOM elements should be the following:
            // li1-li6 should be visible and located on-order
            assert_true(d.querySelector('#li1').offsetTop < d.querySelector('#li2').offsetTop,
                'Point 1: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li2').offsetTop < d.querySelector('#li3').offsetTop,
                'Point 2: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li3').offsetTop < d.querySelector('#li4').offsetTop,
                'Point 3: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li4').offsetTop < d.querySelector('#li5').offsetTop,
                'Point 4: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li5').offsetTop < d.querySelector('#li6').offsetTop,
                'Point 5: Elements that mach insertion point criteria don\'t participate in distribution');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_03_02_T1.done();
    });
});