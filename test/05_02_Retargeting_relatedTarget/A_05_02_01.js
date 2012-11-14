// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_02_01 = {
    name:'A_05_02_01',
    assert:'Retargeting relatedTarget:' +
		'Event retargeting is a process of computing relative targets for each ancestor of the node at which ' +
		'the event is dispatched. A relative target is a DOM node that most accurately represents the target of ' +
		'a dispatched event at a given ancestor while maintaining the upper boundary encapsulation.',
    link:'http://www.w3.org/TR/shadow-dom/#event-retargeting',
    highlight:' In cases where both relatedTarget and target are part of the same shadow tree, ' +
    	'the conforming UAs must stop events at the shadow boundary to avoid the appearance of ' +
    	'spurious mouseover and mouseout events firing from the same node.'
};


var A_05_02_01_T1 = async_test('A_05_02_01_T1', PROPS(A_05_02_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_05_02_01_T1.step(unit(function (ctx) {	
	
    var d = newRenderedHTMLDocument(ctx);
    
    var host = d.createElement('div');
    host.setAttribute('style', 'height:100%; width:100%');
    host.setAttribute('id', 'host');
    d.body.appendChild(host);
    
    //Shadow root to play with
    var s = new SR(host);
    
    var div1 = d.createElement('div');
    div1.setAttribute('style', 'height:40px; width:100%');
    div1.setAttribute('id', 'div1');
    s.appendChild(div1);
    
    var div2 = d.createElement('div');
    div2.setAttribute('style', 'height:40px; width:100%');
    div2.setAttribute('id', 'div2');
    s.appendChild(div2);
    
    s.addEventListener('mouseover', A_05_02_01_T1.step_func(function(event) {
    	assert_equals(event.relatedTarget.getAttribute('id'), 'div1', 'relatedTarget retargeting ' +
    			'should not occur for nodes in the same tree');  	
    }), false);
    
    d.body.addEventListener('mouseover', A_05_02_01_T1.step_func(function(event) {
    	assert_true(false, 'Event must be stopped at Shadow boundary');  	
    }), false);
    
    
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("mouseover", true, false, window,
      0, 10, 10, 10, 10, false, false, false, false, 0, div1);
    
    div2.dispatchEvent(evt);
    
    
    A_05_02_01_T1.done();
}));
