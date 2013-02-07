/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_08_02_03 = {
    name:'A_08_02_03',
    assert:'HTML Elements in shadow trees: ' +
    	'form should submit elements in shadow tree',
    link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#inert-html-elements',
    highlight: 'the form submission must continue to work as specified.',
    bug: ['https://www.w3.org/Bugs/Public/show_bug.cgi?id=20320']
};



// Test 1.Form contains shadow tree and there are inputs in the shadow tree
var A_08_02_03_T01 = async_test('A_08_02_03_T01', PROPS(A_08_02_03, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));

A_08_02_03_T01.checkIframeContent = A_08_02_03_T01.step_func(function () {
	//remember value to check before cleaning the context (it'll destroy the iframe)
	var valueToCheck = A_08_02_03_T01.iframe.contentWindow.document.URL;		
	cleanContext(A_08_02_03_T01.ctx);
	
	assert_true(valueToCheck.indexOf('inp1=value1') > 0, 
		'html form should submit all of its fields');
	
	// Expected behavior is not quite clear. See https://www.w3.org/Bugs/Public/show_bug.cgi?id=20320
	assert_true(valueToCheck.indexOf('inp2=value2') == -1, 
		'html form should not submit fields in the shadow tree');
	
	A_08_02_03_T01.done();
});


A_08_02_03_T01.step(function () {
	
	A_08_02_03_T01.ctx = newContext(); 
    var d = newRenderedHTMLDocument(A_08_02_03_T01.ctx);
                
    //create iframe
    var iframe = document.createElement('iframe');
    
    iframe.src = 'resources/blank.html';
    iframe.setAttribute('name', 'targetIframe');
    d.body.appendChild(iframe);
    
    A_08_02_03_T01.iframe = iframe;
            
    // create form
    var form = d.createElement('form');
    form.setAttribute('target', 'targetIframe');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', 'resources/blank.html');
    d.body.appendChild(form);
    
    //create Shadow tree in the form
    var root = d.createElement('div');
    form.appendChild(root);    
    var s = createSR(root);
        
    //create input in the form
    var input1 = d.createElement('input');
    input1.setAttribute('type', 'text');
    input1.setAttribute('name', 'inp1');
    input1.setAttribute('value', 'value1');
    form.appendChild(input1);
    
    //create input in the shadow tree
    var input2 = d.createElement('input');
    input2.setAttribute('type', 'text');
    input2.setAttribute('name', 'inp2');
    input2.setAttribute('value', 'value2');
    s.appendChild(input2);
    
    //submit the form
    form.submit();
            	
    // set timeout to give the iframe time to load content
    setTimeout('A_08_02_03_T01.checkIframeContent()', 2000);
});


//Test 2. Form input elements distributed in the shadow tree.
var A_08_02_03_T02 = async_test('A_08_02_03_T02', PROPS(A_08_02_03, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));

A_08_02_03_T02.checkIframeContent = A_08_02_03_T02.step_func(function () {
	//remember value to check before cleaning the context (it'll destroy the iframe)
	var valueToCheck = A_08_02_03_T02.iframe.contentWindow.document.URL;		
	cleanContext(A_08_02_03_T02.ctx);
	
	assert_true(valueToCheck.indexOf('inp1=value1') > 0, 
		'html form should submit all of its fields');
	
	assert_true(valueToCheck.indexOf('inp2=value2') > 0, 
		'html form should submit all of its fields including distributed ones');
	
	// Expected behavior is not quite clear. See https://www.w3.org/Bugs/Public/show_bug.cgi?id=20320
	assert_equals(valueToCheck.indexOf('inp3=value3'), -1, 
		'html form should not submit fields in the shadow tree');
	
	A_08_02_03_T02.done();
});


A_08_02_03_T02.step(function () {
	
	A_08_02_03_T02.ctx = newContext(); 
    var d = newRenderedHTMLDocument(A_08_02_03_T02.ctx);
                
    //create iframe
    var iframe = document.createElement('iframe');
    
    iframe.src = 'resources/blank.html';
    iframe.setAttribute('name', 'targetIframe');
    d.body.appendChild(iframe);
    
    A_08_02_03_T02.iframe = iframe;
            
    // create form
    var form = d.createElement('form');
    form.setAttribute('target', 'targetIframe');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', 'resources/blank.html');
    d.body.appendChild(form);
    
    //create Shadow tree in the form
    var root = d.createElement('div');
    form.appendChild(root);    
    var s = createSR(root);
        
    //create input in the form
    var input1 = d.createElement('input');
    input1.setAttribute('type', 'text');
    input1.setAttribute('name', 'inp1');
    input1.setAttribute('value', 'value1');
    form.appendChild(input1);
    
    //create another input in the form
    var input2 = d.createElement('input');
    input2.setAttribute('type', 'text');
    input2.setAttribute('name', 'inp2');
    input2.setAttribute('value', 'value2');
    input2.setAttribute('class', 'inp');
    form.appendChild(input2);
    
    //create input in the shadow tree
    var input3 = d.createElement('input');
    input3.setAttribute('type', 'text');
    input3.setAttribute('name', 'inp3');
    input3.setAttribute('value', 'value3');
    s.appendChild(input3);
    
    s.innerHTML = '<content select=".inp"></content>'
    
    //submit the form
    form.submit();
            	
    // set timeout to give the iframe time to load content
    setTimeout('A_08_02_03_T02.checkIframeContent()', 2000);
});



// Test 3. Form element in the shadow tree outside of the form
var A_08_02_03_T03 = async_test('A_08_02_03_T03', PROPS(A_08_02_03, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));

A_08_02_03_T03.checkIframeContent = A_08_02_03_T03.step_func(function () {
	//remember value to check before cleaning the context (it'll destroy the iframe)
	var valueToCheck = A_08_02_03_T03.iframe.contentWindow.document.URL;		
	cleanContext(A_08_02_03_T03.ctx);
	
	assert_true(valueToCheck.indexOf('inp1=value1') > 0, 
		'html form should submit all of its fields');
	
	assert_equals(valueToCheck.indexOf('inp2=value2'), -1, 
		'Form associated element in the shadow tree should not be submitted');
	
	A_08_02_03_T03.done();
});


A_08_02_03_T03.step(function () {
	
	A_08_02_03_T03.ctx = newContext(); 
    var d = newRenderedHTMLDocument(A_08_02_03_T03.ctx);
                
    //create iframe
    var iframe = document.createElement('iframe');
    
    iframe.src = 'resources/blank.html';
    iframe.setAttribute('name', 'targetIframe');
    d.body.appendChild(iframe);
    
    A_08_02_03_T03.iframe = iframe;
            
    // create form
    var form = d.createElement('form');
    form.setAttribute('id', 'theForm');
    form.setAttribute('target', 'targetIframe');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', 'resources/blank.html');
    d.body.appendChild(form);
    
    //create Shadow tree outside of the form
    var root = d.createElement('div');
    d.body.appendChild(root);    
    var s = createSR(root);
        
    //create input in the form
    var input1 = d.createElement('input');
    input1.setAttribute('type', 'text');
    input1.setAttribute('name', 'inp1');
    input1.setAttribute('value', 'value1');
    form.appendChild(input1);
    
    //create input in the shadow tree and associate it with the form 
    var input2 = d.createElement('input');
    input2.setAttribute('type', 'text');
    input2.setAttribute('name', 'inp2');
    input2.setAttribute('value', 'value2');
    input2.setAttribute('form', 'theForm');
    s.appendChild(input2);
    
    //submit the form
    form.submit();
            	
    // set timeout to give the iframe time to load content
    setTimeout('A_08_02_03_T03.checkIframeContent()', 2000);
});


//Test 4. Form-associated element distributed in the shadow tree outside of the form
var A_08_02_03_T04 = async_test('A_08_02_03_T04', PROPS(A_08_02_03, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));

A_08_02_03_T04.checkIframeContent = A_08_02_03_T04.step_func(function () {
	//remember value to check before cleaning the context (it'll destroy the iframe)
	var valueToCheck = A_08_02_03_T04.iframe.contentWindow.document.URL;		
	cleanContext(A_08_02_03_T04.ctx);
	
	assert_true(valueToCheck.indexOf('inp1=value1') > 0, 
		'html form should submit all of its fields');
	
	assert_true(valueToCheck.indexOf('inp2=value2') > 0, 
		'Form associated element distributed in the shadow tree should be submitted');
	
	A_08_02_03_T04.done();
});


A_08_02_03_T04.step(function () {
	
	A_08_02_03_T04.ctx = newContext(); 
    var d = newRenderedHTMLDocument(A_08_02_03_T04.ctx);
                
    //create iframe
    var iframe = document.createElement('iframe');
    
    iframe.src = 'resources/blank.html';
    iframe.setAttribute('name', 'targetIframe');
    d.body.appendChild(iframe);
    
    A_08_02_03_T04.iframe = iframe;
            
    // create form
    var form = d.createElement('form');
    form.setAttribute('id', 'theForm');
    form.setAttribute('target', 'targetIframe');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', 'resources/blank.html');
    d.body.appendChild(form);
    
    
    var root = d.createElement('div');
    d.body.appendChild(root);        
        
    //create input in the form
    var input1 = d.createElement('input');
    input1.setAttribute('type', 'text');
    input1.setAttribute('name', 'inp1');
    input1.setAttribute('value', 'value1');
    form.appendChild(input1);
    
    //create input in the shadow tree and associate it with the form 
    var input2 = d.createElement('input');
    input2.setAttribute('type', 'text');
    input2.setAttribute('name', 'inp2');
    input2.setAttribute('value', 'value2');
    input2.setAttribute('form', 'theForm');
    input2.setAttribute('class', 'inp');
    root.appendChild(input2);
    
    //create Shadow tree outside of the form
    var s = createSR(root);
    s.innerHTML = '<content select=".inp"></content>'
    
    //submit the form
    form.submit();
            	
    // set timeout to give the iframe time to load content
    setTimeout('A_08_02_03_T04.checkIframeContent()', 2000);
});
