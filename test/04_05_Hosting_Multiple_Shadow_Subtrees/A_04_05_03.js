/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_04_05_03 = {
    name: 'A_04_05_03',
    assert: 'Hosting Multiple Shadow Subtrees:' +
    	'When an insertion point or a shadow insertion point has nothing assigned ' +
    	'or distributed to them, the fallback content must be used instead when rendering',
    link:'http://www.w3.org/TR/shadow-dom/#multiple-shadow-subtrees',
    highlight: 'Just like other insertion points, [[the shadow insertion points can be active ' +
    	'or inactive]]'
};



var A_04_05_03_T1 = async_test('A_04_05_03_T01', PROPS(A_04_05_03, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_04_05_03_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_05_03_T1.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');

            //make the oldest shadow subtree
            var s1 = createSR(ul);
            var subdiv1 = d.createElement('div');
            subdiv1.innerHTML = '<ul><content select="#li1"></content></ul>';
            s1.appendChild(subdiv1);

            //make an old shadow subtree
            var s2 = createSR(ul);
            var subdiv2 = d.createElement('div');
            subdiv2.innerHTML = '<ul><content select=".shadow"></content></ul>';
            s2.appendChild(subdiv2);

            //make the youngest shadow subtree
            var s3 = createSR(ul);
            var subdiv3 = d.createElement('div');
            subdiv3.innerHTML = '<ul><content select=".shadow2"></content></ul>' +
            	'<shadow><span id="spn_first">The first span</span></shadow>' +
            	'<shadow><span id="spn_second">The second span</span></shadow>';

            s3.appendChild(subdiv3);

            //The order of DOM elements should be the following:
            //li4, li3, li6 visible. Other elements invisible
            assert_true(isVisible(d.querySelector('#li4')),
                'Only the younger tree should take part in the distribution');
            assert_true(d.querySelector('#li3').offsetTop > d.querySelector('#li4').offsetTop,
        		'Point 1: Older tree should take part in the distribution');
            assert_true(d.querySelector('#li6').offsetTop > d.querySelector('#li3').offsetTop,
        		'Point 2: Older tree should take part in the distribution');

            assert_false(isVisible(d.querySelector('#li1')),
                'The oldest tree shouldn\'t take part in the distribution');
            assert_false(isVisible(d.querySelector('#li2')),
                'Point 3: Elements that don\'t match insertion point criteria participate in distribution');
            assert_false(isVisible(d.querySelector('#li5')),
                'Point 4: Elements that don\'t match insertion point criteria participate in distribution');

            //spn_first should be invisible, spn_second visible
            assert_false(isVisible(s3.querySelector('#spn_first')),
            	'Shadow insertion point should be active');
            assert_true(isVisible(s3.querySelector('#spn_second')),
            	'Shadow insertion point should be inactive');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_05_03_T1.done();
    });
});