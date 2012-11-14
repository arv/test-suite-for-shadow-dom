// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_00_01 = {
    name:'A_05_00_01',
    assert:'Events:' +
		'The mutation event types must never be dispatched in a shadow DOM subtree.',
    link:'http://www.w3.org/TR/shadow-dom/#events',
    highlight: 'The mutation event types must never be dispatched in a shadow tree'
};



var A_05_00_01_T1 = async_test('A_05_00_01_T1', PROPS(A_05_00_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_05_00_01_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/blank.html';
    document.body.appendChild(iframe);
    
    iframe.onload = A_05_00_01_T1.step_func(function () {
    
    try {
    	var d = iframe.contentDocument;
    	
    	var div = d.createElement('div');
    	d.body.appendChild(div);
    	
    	var s = new SR(div);
	  
    	var div2 = d.createElement('div');
    	s.appendChild(div2);
    	
    	var inp = d.createElement('input');
    	inp.setAttribute('type', 'text');
    	inp.setAttribute('id', 'inpid');	  
    	div2.appendChild(inp);	  	  
	  
    	div2.addEventListener('DOMAttrModified', A_05_00_01_T1.step_func(function (event) {
            assert_true(false, 'The mutation event types must never be dispatched in a shadow DOM subtree');      		
        }), false);
    	/*
		var attr = inp.getAttributeNode ("value");
        var event = d.createEvent('MutationEvent');
        event.initMutationEvent ("DOMAttrModified", true, true, attr, null, 'new value', "value", MutationEvent.MODIFICATION);
        inp.dispatchEvent(event);
        	*/
    	inp.value = 'new value';
    	inp.setAttribute ("newAttr" , "firstValue");
    	inp.setAttribute ("newAttr" , "secondValue");
    	inp.removeAttribute ("newAttr");
    } finally {
        iframe.parentNode.removeChild(iframe);
    }
    A_05_00_01_T1.done();
    });
});





