// Copyright 2012 Google Inc. All Rights Reserved.

var A_04_03_06_01 = {
    name:'A_04_03_06_01',
    link:'http://www.w3.org/TR/shadow-dom/#matching-insertion-points',
    assert:'Matching Insertion Points: ' +
    	'A valid selector fragment may contain a :link pseudo-class selector',
    highlight: '[[A valid selector fragment may contain:]][\\s\\S]*[[the following pseudo-class selector\\(s\\):]][\\s\\S]*[[:link]]'
};

var A_04_03_06_01_T01 = async_test('A_04_03_06_01_T01', PROPS(A_04_03_06_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''    
}));


A_04_03_06_01_T01.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_03_06_01_T01.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var div = d.querySelector('#links-wrapper');
            var s = new SR(div);

            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<content select=":link"></content>';
            s.appendChild(subdiv1);

            //All links elements should be visible
            assert_true(d.querySelector('#link10').offsetTop > 0,
                'Point 1: <a> tag should match :link pseudo-class selector');
            assert_true(d.querySelector('#link11').offsetTop > 0,
                'Point 2: <a> tag should match :link pseudo-class selector');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_03_06_01_T01.done();
    });
});
