// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_03_06 = {
    name:'A_05_03_06',
    link:'http://www.w3.org/TR/shadow-dom/#matching-insertion-points'
};

var A_05_03_06_T01 = async_test('A_05_03_06_T01', PROPS(A_05_03_06, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    assert:'Matching Insertion Points: ' +
    	'A valid selector fragment may contain a :link pseudo-class selector',
    reviewer:''
}));


A_05_03_06_T01.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_03_06_T01.step_func(function () {
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
        A_05_03_06_T01.done();
    });
});


var A_05_03_06_T02 = async_test('A_05_03_06_T02', PROPS(A_05_03_06, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    assert:'Matching Insertion Points: ' +
    	'A valid selector fragment may contain a :target pseudo-class selector',
    reviewer:''
}));


A_05_03_06_T02.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html#link10';
    document.body.appendChild(iframe);

    iframe.onload = A_05_03_06_T02.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var div = d.querySelector('#links-wrapper');
            var s = new SR(div);
            
            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<content select=":target"></content>';
            s.appendChild(subdiv1);

            //link10 should be visible, link11 not
            assert_true(d.querySelector('#link10').offsetTop > 0,
                'Element should match :target pseudo-class selector');
            assert_equals(d.querySelector('#link11').offsetTop, 0,
                'Element shouldn\'t match :target pseudo-class selector');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_03_06_T02.done();
    });
});

var A_05_03_06_T03 = async_test('A_05_03_06_T03', PROPS(A_05_03_06, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    assert:'Matching Insertion Points: ' +
    	'A valid selector fragment may contain a :enabled pseudo-class selector',
    reviewer:''
}));


A_05_03_06_T03.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_03_06_T03.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var div = d.querySelector('#inputs-wrapper');
            var s = new SR(div);
            
            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<content select=":enabled"></content>';
            s.appendChild(subdiv1);

            //inp2 should be visible, inp1 not
            assert_true(d.querySelector('#inp2').offsetTop > 0,
                'Element should match :enabled pseudo-class selector');
            assert_equals(d.querySelector('#inp1').offsetTop, 0,
                'Element shouldn\'t match :enabled pseudo-class selector');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_03_06_T03.done();
    });
});

var A_05_03_06_T04 = async_test('A_05_03_06_T04', PROPS(A_05_03_06, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    assert:'Matching Insertion Points: ' +
    	'A valid selector fragment may contain a :enabled pseudo-class selector',
    reviewer:''
}));


A_05_03_06_T04.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_03_06_T04.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var div = d.querySelector('#inputs-wrapper');
            var s = new SR(div);
            
            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<content select=":disabled"></content>';
            s.appendChild(subdiv1);

            //inp1 should be visible, inp2 not
            assert_true(d.querySelector('#inp1').offsetTop > 0,
                'Element should match :disabled pseudo-class selector');
            assert_equals(d.querySelector('#inp2').offsetTop, 0,
                'Element shouldn\'t match :disabled pseudo-class selector');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_03_06_T04.done();
    });
});

var A_05_03_06_T05 = async_test('A_05_03_06_T05', PROPS(A_05_03_06, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    assert:'Matching Insertion Points: ' +
    	'A valid selector fragment may contain a :checked pseudo-class selector',
    reviewer:''
}));


A_05_03_06_T05.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_03_06_T05.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var div = d.querySelector('#inputs-wrapper');
            var s = new SR(div);
            
            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<content select=":checked"></content>';
            s.appendChild(subdiv1);

            //chb1 should be visible, chb2 not
            assert_true(d.querySelector('#chb1').offsetTop > 0,
                'Element should match :checked pseudo-class selector');
            assert_equals(d.querySelector('#chb2').offsetTop, 0,
                'Element shouldn\'t match :checked pseudo-class selector');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_03_06_T05.done();
    });
});




var A_05_03_06_T06 = async_test('A_05_03_06_T06', PROPS(A_05_03_06, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    assert:'Matching Insertion Points: ' +
    	'A valid selector fragment may contain a :indeterminate pseudo-class selector',
    reviewer:''
}));


A_05_03_06_T06.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_03_06_T06.step_func(function () {
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
        A_05_03_06_T06.done();
    });
});



var A_05_03_06_T07 = async_test('A_05_03_06_T07', PROPS(A_05_03_06, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    assert:'Matching Insertion Points: ' +
    	'A valid selector fragment may contain a :nth-child() pseudo-class selector',
    reviewer:''
}));


A_05_03_06_T07.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_03_06_T07.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = new SR(ul);
            
            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<ul><content select=":nth-child(odd)"></content></ul>';
            s.appendChild(subdiv1);

            //li1, li3, li5 should be visible, li2, li4, li6 not
            assert_true(d.querySelector('#li1').offsetTop > 0,
                '1-st element should match :nth-child(odd) pseudo-class selector');
            assert_true(d.querySelector('#li3').offsetTop > 0,
            	'3-rd element should match :nth-child(odd) pseudo-class selector');
            assert_true(d.querySelector('#li5').offsetTop > 0,
            	'5-th element should match :nth-child(odd) pseudo-class selector');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
                '2-nd element shouldn\'t match :nth-child() pseudo-class selector');
            assert_equals(d.querySelector('#li4').offsetTop, 0,
            	'4-th element shouldn\'t match :nth-child() pseudo-class selector');
            assert_equals(d.querySelector('#li6').offsetTop, 0,
            	'6-nd element shouldn\'t match :nth-child() pseudo-class selector');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_03_06_T07.done();
    });
});

var A_05_03_06_T08 = async_test('A_05_03_06_T08', PROPS(A_05_03_06, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    assert:'Matching Insertion Points: ' +
    	'A valid selector fragment may contain a :nth-last-child() pseudo-class selector',
    reviewer:''
}));


A_05_03_06_T08.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_03_06_T08.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = new SR(ul);
            
            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<ul><content select=":nth-last-child(2)"></content></ul>';
            s.appendChild(subdiv1);

            //li5 should be visible, all other not
            assert_true(d.querySelector('#li5').offsetTop > 0,
                'Element should match :nth-last-child(2) pseudo-class selector');
            assert_equals(d.querySelector('#li1').offsetTop, 0,
                'Point 1: element shouldn\'t match :nth-last-child() pseudo-class selector');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
            	'Point 2: element shouldn\'t match :nth-last-child() pseudo-class selector');
            assert_equals(d.querySelector('#li3').offsetTop, 0,
            	'Point 3: element shouldn\'t match :nth-last-child() pseudo-class selector');
            assert_equals(d.querySelector('#li4').offsetTop, 0,
            	'Point 4: element shouldn\'t match :nth-last-child() pseudo-class selector');
            assert_equals(d.querySelector('#li6').offsetTop, 0,
            	'Point 5: element shouldn\'t match :nth-last-child() pseudo-class selector');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_03_06_T08.done();
    });
});



var A_05_03_06_T09 = async_test('A_05_03_06_T09', PROPS(A_05_03_06, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    assert:'Matching Insertion Points: ' +
    	'A valid selector fragment may contain a :first-child pseudo-class selector',
    reviewer:''
}));


A_05_03_06_T09.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_03_06_T09.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = new SR(ul);
            
            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<ul><content select=":first-child"></content></ul>';
            s.appendChild(subdiv1);

            //li1 should be visible, all other not
            assert_true(d.querySelector('#li1').offsetTop > 0,
                'Element should match :first-child pseudo-class selector');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
                'Point 1: element shouldn\'t match :first-child pseudo-class selector');
            assert_equals(d.querySelector('#li3').offsetTop, 0,
            	'Point 2: element shouldn\'t match :first-child pseudo-class selector');
            assert_equals(d.querySelector('#li4').offsetTop, 0,
            	'Point 3: element shouldn\'t match :first-child pseudo-class selector');
            assert_equals(d.querySelector('#li5').offsetTop, 0,
            	'Point 4: element shouldn\'t match :first-child pseudo-class selector');
            assert_equals(d.querySelector('#li6').offsetTop, 0,
            	'Point 5: element shouldn\'t match :first-child pseudo-class selector');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_03_06_T09.done();
    });
});


var A_05_03_06_T10 = async_test('A_05_03_06_T10', PROPS(A_05_03_06, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    assert:'Matching Insertion Points: ' +
    	'A valid selector fragment may contain a :last-child pseudo-class selector',
    reviewer:''
}));


A_05_03_06_T10.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_03_06_T10.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = new SR(ul);
            
            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<ul><content select=":last-child"></content></ul>';
            s.appendChild(subdiv1);

            //li6 should be visible, all other not
            assert_true(d.querySelector('#li6').offsetTop > 0,
                'Element should match :last-child pseudo-class selector');
            assert_equals(d.querySelector('#li1').offsetTop, 0,
                'Point 1: element shouldn\'t match :last-child pseudo-class selector');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
            	'Point 2: element shouldn\'t match :last-child pseudo-class selector');
            assert_equals(d.querySelector('#li3').offsetTop, 0,
            	'Point 3: element shouldn\'t match :last-child pseudo-class selector');
            assert_equals(d.querySelector('#li4').offsetTop, 0,
            	'Point 4: element shouldn\'t match :last-child pseudo-class selector');
            assert_equals(d.querySelector('#li5').offsetTop, 0,
            	'Point 5: element shouldn\'t match :last-child pseudo-class selector');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_03_06_T10.done();
    });
});





var A_05_03_06_T11 = async_test('A_05_03_06_T11', PROPS(A_05_03_06, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    assert:'Matching Insertion Points: ' +
    	'A valid selector fragment may contain a :nth-of-type() pseudo-class selector',
    reviewer:''
}));


A_05_03_06_T11.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_03_06_T11.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = new SR(ul);
            
            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<ul><content select=":nth-of-type(2n+1)"></content></ul>';
            s.appendChild(subdiv1);

            //li1, li3, li5 should be visible, li2, li4, li6 not
            assert_true(d.querySelector('#li1').offsetTop > 0,
                '1-st element should match :nth-of-type(2n+1) pseudo-class selector');
            assert_true(d.querySelector('#li3').offsetTop > 0,
            	'3-rd element should match :nth-of-type(2n+1) pseudo-class selector');
            assert_true(d.querySelector('#li5').offsetTop > 0,
            	'5-th element should match :nth-of-type(2n+1) pseudo-class selector');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
                '2-nd element shouldn\'t match :nth-of-type(2n+1) pseudo-class selector');
            assert_equals(d.querySelector('#li4').offsetTop, 0,
            	'4-th element shouldn\'t match :nth-of-type(2n+1) pseudo-class selector');
            assert_equals(d.querySelector('#li6').offsetTop, 0,
            	'6-nd element shouldn\'t match :nth-of-type(2n+1) pseudo-class selector');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_03_06_T11.done();
    });
});



var A_05_03_06_T12 = async_test('A_05_03_06_T11', PROPS(A_05_03_06, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    assert:'Matching Insertion Points: ' +
    	'A valid selector fragment may contain a :nth-last-of-type() pseudo-class selector',
    reviewer:''
}));


A_05_03_06_T12.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_03_06_T12.step_func(function () {
        try {

            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = new SR(ul);
            
            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<ul><content select=":nth-last-of-type(2)"></content></ul>';
            s.appendChild(subdiv1);

            //li5 should be visible, all others not
            assert_true(d.querySelector('#li5').offsetTop > 0,
                'Element should match :nth-last-of-type(2) pseudo-class selector');
            assert_equals(d.querySelector('#li1').offsetTop, 0,
                'Point 1: element shouldn\'t match :nth-last-of-type(2) pseudo-class selector');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
            	'Point 2: element shouldn\'t match :nth-last-of-type(2) pseudo-class selector');
            assert_equals(d.querySelector('#li3').offsetTop, 0,
            	'Point 3: element shouldn\'t match :nth-last-of-type(2) pseudo-class selector');
            assert_equals(d.querySelector('#li4').offsetTop, 0,
            	'Point 4: element shouldn\'t match :nth-last-of-type(2) pseudo-class selector');
            assert_equals(d.querySelector('#li6').offsetTop, 0,
        		'Point 5: element shouldn\'t match :nth-last-of-type(2) pseudo-class selector');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_03_06_T12.done();
    });
});
