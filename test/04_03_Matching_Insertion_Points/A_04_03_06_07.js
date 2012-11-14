// Copyright 2012 Google Inc. All Rights Reserved.

var A_04_03_06_07 = {
    name:'A_04_03_06_07',
    assert:'Matching Insertion Points: ' +
		'A valid selector fragment may contain a :indeterminate pseudo-class selector',
	highlight: '[[A valid selector fragment may contain:]][\\s\\S]*[[the following pseudo-class selector\\(s\\):]][\\s\\S]*[[:indeterminate]]',
    link:'http://www.w3.org/TR/shadow-dom/#matching-insertion-points'
};

var A_04_03_06_07_T01 = async_test('A_04_03_06_07_T01', PROPS(A_04_03_06_07, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));


A_04_03_06_07_T01.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_03_06_07_T01.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var div = d.querySelector('#inputs-wrapper');
            var s = new SR(div);
            
            d.querySelector('#chb1').indeterminate = true; 
            
            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<content select=":indeterminate"></content>';
            s.appendChild(subdiv1);

            //chb1 should be visible, chb2 not
            assert_true(d.querySelector('#chb1').offsetTop > 0,
                'Element should match :indeterminate pseudo-class selector');
            assert_equals(d.querySelector('#chb2').offsetTop, 0,
                'Element shouldn\'t match :indeterminate pseudo-class selector');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_03_06_07_T01.done();
    });
});
