// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_04_01 = {
    name:'A_05_04_01',
    assert:'Matching Children, Distributed To Insertion Points',
    link:'http://www.w3.org/TR/shadow-dom/#selecting-nodes-distributed-to-insertion-points',
    highlight: 'Reference combinators match the children of a shadow host, distributed to the ' +
    	'insertion points within a shadow DOM subtree.'
};

var A_05_04_01_T1 = async_test('A_05_04_01_T01', PROPS(A_05_04_01, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));


// Reference combinators are not implemented yet, so the test shouldn't work for now
// See the progress at  http://wkb.ug/82169

A_05_04_01_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_04_01_T1.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = new SR(ul);
            
            //make shadow subtree
            var subdiv1 = d.createElement('div');
            subdiv1.innerHTML = '<ul><content select="li"></content></ul>';
            s.appendChild(subdiv1);
            
            var style = d.createElement('style');
            style.innerHTML = 'ul.stories/select/li.shadow {display:none}';
            d.head.appendChild(style);
            
            //TODO (sgrekhov). Should we add the test for
            //d.querySelector('ul.stories /select/ .shadow')?
            
            
            //The order of DOM elements should be the following:
            //li3, li6 - invisible. Other elements visible
            assert_equals(d.querySelector('#li3').offsetTop, 0,
	            'Point 1: Elements that don\'t mach insertion point criteria participate in distribution');
	        assert_equals(d.querySelector('#li6').offsetTop, 0,
	            'Point 2: Elements that don\'t mach insertion point criteria participate in distribution');
            
            
            assert_true(d.querySelector('#li1').offsetTop > 0,
            	'Point 3: Reference combinators should be a valid insertion point matching criteria, element should be visible');
            assert_true(d.querySelector('#li1').offsetTop < d.querySelector('#li2').offsetTop,
                'Point 4: Reference combinators should be a valid insertion point matching criteria');
            assert_true(d.querySelector('#li2').offsetTop < d.querySelector('#li4').offsetTop,
            	'Point 5: Reference combinators should be a valid insertion point matching criteria');
            assert_true(d.querySelector('#li4').offsetTop < d.querySelector('#li5').offsetTop,
            	'Point 6: Reference combinators should be a valid insertion point matching criteria');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_04_01_T1.done();
    });
});
