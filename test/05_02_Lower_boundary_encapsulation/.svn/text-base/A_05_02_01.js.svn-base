// Copyright 2012 Google Inc. All Rights Reserved.
var A_05_02_01 = {
    name:'A_05_02_01',
    assert:'Lower-boundary encapsulation: ' +
        'The distribution does not affect the state of the document DOM tree or shadow DOM subtrees',
    link:'http://www.w3.org/TR/shadow-dom/#lower-boundary-encapsulation'
};

var A_05_02_01_T1 = async_test('A_05_02_01_T01', PROPS(A_05_02_01, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));

A_05_02_01_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_02_01_T1.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');

            var s = new SR(ul);

            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.setAttribute('class', 'breaking');
            subdiv1.innerHTML = '<ul><content select=".shadow"></content></ul>';
            s.appendChild(subdiv1);

            var subdiv2 = document.createElement('div');
            subdiv2.setAttribute('class', 'other');
            subdiv2.innerHTML = '<ul><content select=""></content></ul>';
            s.appendChild(subdiv2);

            var div = d.querySelector('#divid');

            //check DOM tree state
            assert_equals(div.className, 'breaking', 'Distribution should\'t change document ' +
                'DOM elements class name');
            assert_equals(div.children.length, 2, 'Distribution shouldn\'t change document ' +
                'DOM elements children');
            assert_equals(div.children[0].tagName, 'SPAN', 'Distribution shouldn\'t change document ' +
                'DOM elements children tag names');
            assert_equals(div.children[1].tagName, 'UL', 'Distribution shouldn\'t change document ' +
            	'DOM elements children tag names');

            //check shadow subtree
            assert_equals(s.querySelector('div.breaking').children.length, 1,
                'Point 1: Distribution shouldn\'t change shadow DOM subtree elements children');
            assert_equals(s.querySelector('div.other').children.length, 1,
                'Point 2:Distribution shouldn\'t change shadow DOM subtree elements children');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_02_01_T1.done();
    });
});