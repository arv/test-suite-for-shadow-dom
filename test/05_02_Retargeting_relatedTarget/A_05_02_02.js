// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_02_02 = {
    name:'A_05_02_02',
    assert:'Retargeting relatedTarget:' +
		'For a given node, the relatedTarget must be changed to its ancestor (or self) that is ' +
		'in the same shadow tree as the node',
    highlight:'For a given node, the relatedTarget must be changed to its ancestor (or self) that ' +
    	'is in the same shadow tree as the node'
};


var A_05_02_02_T01 = async_test('A_05_02_02_T01', PROPS(A_05_02_02, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_05_02_02_T01.step(unit(function (ctx) {	
	
    var d = newRenderedHTMLDocument(ctx);
    
    var host = d.createElement('div');
    host.setAttribute('style', 'height:50%; width:100%');
    host.setAttribute('id', 'host');
    d.body.appendChild(host);
    
    //Shadow root to play with
    var s = new SR(host);
    
    var div1 = d.createElement('div');
    div1.setAttribute('style', 'height:100%; width:100%');
    div1.setAttribute('id', 'div1');
    s.appendChild(div1);
    
    var div2 = d.createElement('div');
    div2.setAttribute('style', 'height:100%; width:100%');
    div2.setAttribute('id', 'div2');
    d.body.appendChild(div2);
    
    d.body.addEventListener('mouseover', A_05_02_02_T01.step_func(function(event) {
    	assert_equals(event.relatedTarget.getAttribute('id'), 'host', 'Wrong related target');  	
    }), false);
    
    
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("mouseover", true, false, window,
      0, 10, 10, 10, 10, false, false, false, false, 0, div1);
    
    div2.dispatchEvent(evt);
    
    A_05_02_02_T01.done();
}));
