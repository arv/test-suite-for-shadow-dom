/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_04_03_06_01 = {
    name:'A_04_03_06_01',
    link:'http://www.w3.org/TR/shadow-dom/#matching-insertion-points',
    assert:'Matching Insertion Points: ' +
    	'A valid selector fragment may contain a :link pseudo-class selector',
    highlight: '[[A valid selector fragment may contain:]][\\s\\S]*[[the following pseudo-class selector\\(s\\):]][\\s\\S]*[[:link]]'
};

var A_04_03_06_01_T01 = async_test('A_04_03_06_01_T01', PROPS(A_04_03_06_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));


A_04_03_06_01_T01.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_03_06_01_T01.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var div = d.querySelector('#links-wrapper');
            var span = d.createElement('span');
            div.appendChild(span);
            var s = createSR(div);

            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<content select=":link"></content>';
            s.appendChild(subdiv1);

            //All links elements should be visible
            assert_true(d.querySelector('#link10').offsetTop > 0,
                'Point 1: <a> tag should match :link pseudo-class selector');
            assert_true(d.querySelector('#link11').offsetTop > 0,
                'Point 2: <a> tag should match :link pseudo-class selector');
            assert_equals(span.offsetTop, 0, '<span> tag should not match :link selector');
            
            //All other elements should be invisible
            assert_equals(d.querySelector('#nonlink').offsetTop, 0, 
            		'Point 3: element shouldn\'t match :link pseudo-class selector');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_03_06_01_T01.done();
    });
});
