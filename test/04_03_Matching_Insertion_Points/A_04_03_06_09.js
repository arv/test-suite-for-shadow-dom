/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_04_03_06_09 = {
    name:'A_04_03_06_09',
    assert:'Matching Insertion Points: ' +
		'A valid selector fragment may contain a :nth-last-child() pseudo-class selector',
	highlight: '[[A valid selector fragment may contain:]][\\s\\S]*[[the following pseudo-class selector\\(s\\):]][\\s\\S]*[[:nth-last-child\\(\\)]]',
    link:'http://www.w3.org/TR/shadow-dom/#matching-insertion-points'
};

var A_04_03_06_09_T01 = async_test('A_04_03_06_09_T01', PROPS(A_04_03_06_09, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));


A_04_03_06_09_T01.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_03_06_09_T01.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = createSR(ul);

            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<ul><content select=":nth-last-child(2)"></content></ul>';
            s.appendChild(subdiv1);

            //li6 should be invisible, all other visible
            assert_true(isVisible(d.querySelector('#li1')),
	            'Point 1: element should match :nth-last-child(2) pseudo-class selector');
	        assert_true(isVisible(d.querySelector('#li2')),
	        	'Point 2: element should match :nth-last-child(2) pseudo-class selector');
	        assert_true(isVisible(d.querySelector('#li3')),
	        	'Point 3: element should match :nth-last-child(2) pseudo-class selector');
	        assert_true(isVisible(d.querySelector('#li4')),
	        	'Point 4: element should match :nth-last-child(2) pseudo-class selector');
	        assert_true(isVisible(d.querySelector('#li5')),
	        	'Point 5: element should match :nth-last-child(2) pseudo-class selector');
	        assert_false(isVisible(d.querySelector('#li6')),
	    		'Element shouldn\'t match :nth-last-child(2) pseudo-class selector');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_03_06_09_T01.done();
    });
});
