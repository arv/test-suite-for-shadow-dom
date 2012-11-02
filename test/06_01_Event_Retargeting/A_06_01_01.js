// Copyright 2012 Google Inc. All Rights Reserved.

var A_06_01_01 = {
    name:'A_06_01_01',
    assert:'Event Retargeting:' +
		'In the cases where events cross the shadow boundaries, the event\'s information ' +
		'about the target of the event is adjusted in order to maintain upper boundary encapsulation',
    link:'http://www.w3.org/TR/shadow-dom/#events'
};



var A_06_01_01_T1 = async_test('A_06_01_01_T1', PROPS(A_06_01_01, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));

A_06_01_01_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/blank.html';
    document.body.appendChild(iframe);
    
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
	  
    	div2.addEventListener('HTMLEvents', A_06_01_01_T1.step_func(function (event) {
            assert_equals(event.target.tagName, 'INPUT', 'Information about target of the event that ' +
            		'doen\'t cross the shadow boundaries should not be adjusted');      		
        }), false);    	
        var event = d.createEvent('HTMLEvents');
        event.initEvent ("click", true, false);
        inp.dispatchEvent(event);		  
    } finally {
        iframe.parentNode.removeChild(iframe);
    }
    A_06_01_01_T1.done();
});



var A_06_01_01_T2 = async_test('A_06_01_01_T2', PROPS(A_06_01_01, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));

A_06_01_01_T2.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/blank.html';
    document.body.appendChild(iframe);
    
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
	  
    	div.addEventListener('HTMLEvents', A_06_01_01_T2.step_func(function (event) {
            assert_equals(event.target.tagName, 'DIV', 'Information about event target crossing ' +
            		'the shadow boundaries should be adjusted');      		
        }), false);    	
        var event = d.createEvent('HTMLEvents');
        event.initEvent ("click", true, false);
        inp.dispatchEvent(event);		  
    } finally {
        iframe.parentNode.removeChild(iframe);
    }
    A_06_01_01_T2.done();
});


