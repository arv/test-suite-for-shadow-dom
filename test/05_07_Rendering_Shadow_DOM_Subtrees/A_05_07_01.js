// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_07_01 = {
    name: 'A_05_07_01',
    assert: 'Rendering Shadow DOM Subtrees:'
    	+ 'If multiple shadow insertion points exist in a shadow DOM subtree, ' + 
    	+ 'only the first, in tree order, is recognized.',
    link:'http://www.w3.org/TR/shadow-dom/#multiple-shadow-subtrees'
};



var A_05_07_01_T1 = async_test('A_05_07_01_T1', PROPS(A_05_07_01, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));

A_05_07_01_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_07_01_T1.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
                                    
            //make the oldest shadow subtree
            var s1 = new SR(ul);
            var subdiv1 = d.createElement('div');
            subdiv1.innerHTML = '<span id="oldest_tree_span">Oldest tree content</span>' + 
            	'<ul><content select="#li1"><li id="li_fallback">Fallback li</li></content></ul>';
            s1.appendChild(subdiv1);
                        
            //make an old shadow subtree
            var s2 = new SR(ul);
            var subdiv2 = d.createElement('div');
            subdiv2.innerHTML = '<ul><content select=".shadow"></content></ul>' +
            	'<ul><content select=".nobody"><li id="li_flbk">Shadow fall back content</li></content></ul>';
            s2.appendChild(subdiv2);
            
            //make the youngest shadow subtree
            var s3 = new SR(ul);
            var subdiv3 = d.createElement('div');
            subdiv3.innerHTML = '<ul><content select=".shadow2"></content></ul>';
            s3.appendChild(subdiv3);
            
            //add a shadow insertion point for the old tree
            s3.appendChild(d.createElement('shadow'));
            
            
            //The order of DOM elements should be the following:
            //li4, li3, li6 visible. Other elements invisible
            assert_true(d.querySelector('#li4').offsetTop > 0,
                'Only the younger tree should take part in the distribution');
            assert_true(d.querySelector('#li3').offsetTop > d.querySelector('#li4').offsetTop,
        		'Point 1: Older tree should take part in the distribution');
            assert_true(d.querySelector('#li6').offsetTop > d.querySelector('#li3').offsetTop,
        		'Point 2: Older tree should take part in the distribution');            
            assert_true(s2.querySelector('#li_flbk').offsetTop > d.querySelector('#li6').offsetTop,
    			'Fallback content of the insertion point in an older tree should be rendered');
            assert_true(d.querySelector('#divid').offsetTop > s2.querySelector('#li_flbk').offsetTop,
            	'Point 3:Document elements that are not in shadow subtrees should be rendered');
            assert_true(d.querySelector('#links-wrapper').offsetTop >= d.querySelector('#divid').offsetTop,
        		'Point 4:Document elements that are not in shadow subtrees should be rendered');
            assert_true(d.querySelector('#inputs-wrapper').offsetTop >= d.querySelector('#links-wrapper').offsetTop,
            	'Point 5:Document elements that are not in shadow subtrees should be rendered');
            
            assert_equals(d.querySelector('#li1').offsetTop, 0,
                'The oldest tree shouldn\'t take part in the distribution');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
                'Point 6: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li5').offsetTop, 0,
                'Point 7: Elements that don\'t mach insertion point criteria participate in distribution');
            
            assert_equals(s1.querySelector('#oldest_tree_span').offsetTop, 0,
            	'Point 8: Oldest tree content shoulddn\'t be rendered');
            assert_equals(s1.querySelector('#li_fallback').offsetTop, 0,
            	'Point 9: Oldest tree fallback content shoulddn\'t be rendered');
                
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_07_01_T1.done();
    });
});