var A_05_06_01 = {
    name:'A_05_06_01',
    assert:'Nested Shadow Subtrees:' +
    	'Any element in a shadow DOM subtree can be a shadow host', 
    link:'http://www.w3.org/TR/shadow-dom/#nested-shadow-subtrees'
};


var A_05_06_01_T1 = async_test('A_05_06_01_T01', PROPS(A_05_06_01, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));

A_05_06_01_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_06_01_T1.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
                                    
            //make a shadow subtree
            var s1 = new SR(ul);
            var subdiv1 = d.createElement('div');
            subdiv1.innerHTML = '<ul><content select=".shadow"></content></ul>' +
            	'<div id="host_div">' + 
            		'<span id="sh_span">This span should be visible</span>' +
            		'<ul id="host">' +
            		'<li id="sh_li1">Shadow li 1</li>' +
            		'<li id="sh_li2">Shadow li 2</li>' +
            		'<li id="sh_li3" class="shadow2">Shadow li 3</li>' +
            		'<li id="sh_li4">Shadow li 4</li>' +
            		'<li id="sh_li5">Shadow li 5</li>' +
            		'</ul>' +
            	'</div>';
            s1.appendChild(subdiv1);
                        
            //make nested shadow subtree
            var sh_ul = s1.querySelector('#host');
            var s2 = new SR(sh_ul);
            var subdiv2 = d.createElement('div');
            subdiv2.innerHTML = '<ul><content select=".shadow2"></content></ul>';
            s2.appendChild(subdiv2);
                        
            //The order of DOM elements should be the following:
            //li4, li3 and sh_li3 visible. Other elements invisible
            assert_true(d.querySelector('#li3').offsetTop > 0,
            	'Point 1: Shadow tree should take part in the distribution');
            assert_true(d.querySelector('#li6').offsetTop > d.querySelector('#li3').offsetTop,
            	'Point 2: Shadow tree should take part in the distribution');
            assert_true(s1.querySelector('#sh_li3').offsetTop > 0,
            	'Nested shadow subtree should take part in the distribution');

            assert_equals(d.querySelector('#li1').offsetTop, 0,
                'Point 3: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
                'Point 4: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li4').offsetTop, 0,
                'Point 5: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li5').offsetTop, 0,
            	'Point 6: Elements that don\'t mach insertion point criteria participate in distribution');
            
            assert_equals(s1.querySelector('#sh_li1').offsetTop, 0,
            	'Point 7: Elements of the nested shadow subtree that don\'t mach insertion point criteria participate in distribution');
            assert_equals(s1.querySelector('#sh_li2').offsetTop, 0,
            	'Point 8: Elements of the nested shadow subtree that don\'t mach insertion point criteria participate in distribution');
            assert_equals(s1.querySelector('#sh_li4').offsetTop, 0,
        		'Point 9: Elements of the nested shadow subtree that don\'t mach insertion point criteria participate in distribution');
            assert_equals(s1.querySelector('#sh_li5').offsetTop, 0,
        		'Point 10: Elements of the nested shadow subtree that don\'t mach insertion point criteria participate in distribution');
            
            assert_true(s1.querySelector('#sh_span').offsetTop > 0,
            	'Shadow subtree elements that are not shadow host should take part in the distribution');
            
            
        } finally {
        	iframe.parentNode.removeChild(iframe);
        }
        A_05_06_01_T1.done();
    });
});
