// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_01_02 = {
    name:'A_05_01_02',
    assert:'Event Retargeting:' +
		'Event retargeting is a process of computing relative targets for each ancestor of the node ' +
    	'at which the event is dispatched. A relative target is a DOM node that most accurately ' +
    	'represents the target of a dispatched event at a given ancestor while maintaining ' +
    	'the upper boundary encapsulation',
    link:'http://www.w3.org/TR/shadow-dom/#event-retargeting',
    highlight:'A relative target is a node that most accurately represents the target of ' +
    	'a dispatched event at a given ancestor while maintaining the upper boundary encapsulation'
};


var A_05_01_02_T1 = async_test('A_05_01_02_T1', PROPS(A_05_01_02, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_05_01_02_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);
    
    iframe.onload = A_05_01_02_T1.step_func(function () {
    
    try {    	
    	var d = iframe.contentDocument;
    	
        var ul = d.querySelector('ul.stories');
        var s = new SR(ul);
	  
        //make shadow subtree
        var div = document.createElement('div');
        div.innerHTML = '<ul id="ip_wrapper"><content select=".shadow"></content></ul>';
        s.appendChild(div);
    	  
    	ul.addEventListener('click', A_05_01_02_T1.step_func(function (event) {
            assert_equals(event.target.tagName, 'LI', 'Information about event target crossing ' +
            		'the shadow boundaries should not be adjusted for documrnt nodes distributed' +
            		'among insertion points');
        }), false);
    	
        var event = d.createEvent('HTMLEvents');
        event.initEvent ("click", true, false);
        d.querySelector('#li3').dispatchEvent(event);		  
    } finally {
        iframe.parentNode.removeChild(iframe);
    }
    A_05_01_02_T1.done();
    });
});
