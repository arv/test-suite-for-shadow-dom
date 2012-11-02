// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_01_05 = {
    name:'A_05_01_05',
    assert:'Upper-boundary encapsulation:' +
    			   'The nodes with a unique id and named elements are not addressable ' +
    			   'from any attributes of elements in shadow host\'s document',
    link:'http://www.w3.org/TR/shadow-dom/#upper-boundary-encapsulation'
};

test(function () {
	  var d = document.implementation.createHTMLDocument('test doc');	  
	  
	  var div = d.createElement('div');
	  d.body.appendChild(div);
	  
	  var s = new SR(div);
	  
	  var inp = d.createElement('input');
	  inp.setAttribute('type', 'text');
	  inp.setAttribute('id', 'inpid');
	  d.body.appendChild(inp);
	  
	  var lbl = d.createElement('label');
	  lbl.setAttribute('for', 'inpid');
	  s.appendChild(lbl);
	  
	  assert_equals(lbl.control, null, 'Elements in shadow DOM musn\'t be accessible from ' +
			  'owner\'s document label.for attribute');
	  
	  
	  var formAssociatedElements = ['button','fieldset','input','keygen','label','object',
	                                'output','select','textarea'];
	  
	  formAssociatedElements.forEach(function (tagName) {
		  d = document.implementation.createHTMLDocument('test doc');
		  
		  var form = d.createElement('form');
		  var el = d.createElement(tagName);	  
		  
		  d.body.appendChild(form);
		  d.body.appendChild(el);
		  
		  form.setAttribute('id', 'formid');
		  el.setAttribute('form', 'formid');
		  
		  div = d.createElement('div');
		  d.body.appendChild(div);
		  
		  s = new SR(div);
		  s.appendChild(form);
		  	  
		  assert_equals(el.form, null, 'Elements in shadow DOM musn\'t be accessible from ' +
				  'owner\'s document ' + tagName + '.form attribute');
		});
}, 'A_05_01_05_T01', PROPS(A_05_01_05, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));
