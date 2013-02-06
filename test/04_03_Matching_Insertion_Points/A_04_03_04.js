/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_04_03_04 = {
    name:'A_04_03_04',
    assert:'Matching Insertion Points: ' +
        'A valid selector fragment may contain an ID selector',
    link:'http://www.w3.org/TR/shadow-dom/#matching-insertion-points',
    highlight: '[[A valid selector fragment may contain:]][\\s\\S]*[[An ID selector]]'
};

var A_04_03_04_T01 = async_test('A_04_03_04_T01', PROPS(A_04_03_04, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));

A_04_03_04_T01.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_03_04_T01.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = createSR(ul);

            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<ul><content select="#li4"></content></ul>';
            s.appendChild(subdiv1);

            //The order of DOM elements should be the following:
            //li4. Other elements invisible
            assert_true(isVisible(d.querySelector('#li4')),
                'Class name should be a valid insertion point matching criteria, element should be visible');

            assert_false(isVisible(d.querySelector('#li1')),
                'Point 1: Elements that don\'t match insertion point criteria participate in distribution');
            assert_false(isVisible(d.querySelector('#li2')),
                'Point 2: Elements that don\'t match insertion point criteria participate in distribution');
            assert_false(isVisible(d.querySelector('#li3')),
                'Point 3: Elements that don\'t match insertion point criteria participate in distribution');
            assert_false(isVisible(d.querySelector('#li5')),
                'Point 4: Elements that don\'t match insertion point criteria participate in distribution');
            assert_false(isVisible(d.querySelector('#li6')),
                'Point 5: Elements that don\'t match insertion point criteria participate in distribution');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_03_04_T01.done();
    });
});