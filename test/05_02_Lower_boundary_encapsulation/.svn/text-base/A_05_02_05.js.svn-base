// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_02_05 = {
    name:'A_05_02_05',
    assert:'Lower-boundary encapsulation: ' +
        'An insertion point may be active or inactive. An active insertion point participates in the distribution process, whereas the inactive insertion does not',
    link:'http://www.w3.org/TR/shadow-dom/#lower-boundary-encapsulation'
};

var A_05_02_05_T1 = async_test('A_05_02_05_T01', PROPS(A_05_02_05, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));

A_05_02_05_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_02_05_T1.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector("ul.stories");
            var s = new SR(ul);

            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = "<ul><content select='.nobody'><span id='shadowspan'>Inactive insertion point</span></content></ul>";
            s.appendChild(subdiv1);

            assert_true(s.querySelector('#shadowspan').offsetTop > 0,
                'Inactive insertion point should be in a fallback content');

            // All li1-li6 should be invisible, shadowspan visible
            assert_equals(d.querySelector('#li1').offsetTop, 0,
                'Point 1: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
                'Point 2: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li3').offsetTop, 0,
                'Point 3: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li4').offsetTop, 0,
                'Point 4: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li5').offsetTop, 0,
                'Point 5: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li6').offsetTop, 0,
                'Point 6: Elements that don\'t mach insertion point criteria participate in distribution');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_02_05_T1.done();
    });
});
