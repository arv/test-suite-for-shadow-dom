/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_04_03_06_10 = {
    name:'A_04_03_06_10',
    assert:'Matching Insertion Points: ' +
		'A valid selector fragment may contain a :nth-of-type() pseudo-class selector',
	highlight: '[[A valid selector fragment may contain:]][\\s\\S]*[[the following pseudo-class selector\\(s\\):]][\\s\\S]*[[:nth-of-type\\(\\)]]',
    link:'http://www.w3.org/TR/shadow-dom/#matching-insertion-points'
};

var A_04_03_06_10_T01 = async_test('A_04_03_06_10_T01', PROPS(A_04_03_06_10, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));


A_04_03_06_10_T01.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_03_06_10_T01.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = createSR(ul);

            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<ul><content select=":nth-of-type(2n+1)"></content></ul>';
            s.appendChild(subdiv1);

            //li1, li3, li5 should be visible, li2, li4, li6 not
            assert_true(isVisible(d.querySelector('#li1')),
                '1-st element should match :nth-of-type(2n+1) pseudo-class selector');
            assert_true(isVisible(d.querySelector('#li3')),
            	'3-rd element should match :nth-of-type(2n+1) pseudo-class selector');
            assert_true(isVisible(d.querySelector('#li5')),
            	'5-th element should match :nth-of-type(2n+1) pseudo-class selector');
            assert_false(isVisible(d.querySelector('#li2')),
                '2-nd element shouldn\'t match :nth-of-type(2n+1) pseudo-class selector');
            assert_false(isVisible(d.querySelector('#li4')),
            	'4-th element shouldn\'t match :nth-of-type(2n+1) pseudo-class selector');
            assert_false(isVisible(d.querySelector('#li6')),
            	'6-nd element shouldn\'t match :nth-of-type(2n+1) pseudo-class selector');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_03_06_10_T01.done();
    });
});
