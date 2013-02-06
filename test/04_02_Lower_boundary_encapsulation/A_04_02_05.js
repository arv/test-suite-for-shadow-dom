/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_04_02_05 = {
    name:'A_04_02_05',
    assert:'Lower-boundary encapsulation: ' +
        'An insertion point may be active or inactive. An active insertion point ' +
        'participates in the distribution process, whereas the inactive insertion does not',
    link:'http://www.w3.org/TR/shadow-dom/#lower-boundary-encapsulation',
    highlight: 'An insertion point may be active or inactive. An active insertion point ' +
    	'participates in the distribution process, whereas the inactive insertion does not.',
    bug: ['https://www.w3.org/Bugs/Public/show_bug.cgi?id=20729']
};

var A_04_02_05_T1 = async_test('A_04_02_05_T01', PROPS(A_04_02_05, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));

A_04_02_05_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_02_05_T1.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector("ul.stories");
            var s = createSR(ul);

            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = "<ul><content select='.nobody'><span id='shadowspan'>Inactive insertion point</span></content></ul>";
            s.appendChild(subdiv1);

            assert_true(isVisible(s.querySelector('#shadowspan')),
                'Inactive insertion point should be in a fallback content');

            // All li1-li6 should be invisible, shadowspan visible
            assert_equals(d.querySelector('#li1').offsetTop, 0,
                'Point 1: Elements that don\'t match insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
                'Point 2: Elements that don\'t match insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li3').offsetTop, 0,
                'Point 3: Elements that don\'t match insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li4').offsetTop, 0,
                'Point 4: Elements that don\'t match insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li5').offsetTop, 0,
                'Point 5: Elements that don\'t match insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li6').offsetTop, 0,
                'Point 6: Elements that don\'t match insertion point criteria participate in distribution');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_02_05_T1.done();
    });
});


// nested <content> inside <content> in shadow tree
var A_04_02_05_T2 = async_test('A_04_02_05_T02', PROPS(A_04_02_05, {
    author:'Aleksei Yu. Semenov <a.semenov@unipro.ru>',
    reviewer:''
}));

A_04_02_05_T2.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_02_05_T2.step_func(function () {
        try {
            var d = iframe.contentDocument;

            var standaloneContent = d.createElement('content');
            standaloneContent.setAttribute('select', 'a');
            d.body.appendChild(standaloneContent);

            var linksWrapper = d.querySelector('#links-wrapper');
            var s = createSR(linksWrapper);

            assert_false(isVisible(d.querySelector('#link10')), 'Children of shadow host should be hidden');
            assert_false(isVisible(d.querySelector('#link11')), 'Children of shadow host should be hidden');

            assert_equals(standaloneContent.childNodes.length, 0, '<content> outside shadow tree should not partisipate in distribution');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_02_05_T2.done();
    });
});

//<content> outside shadow tree
var A_04_02_05_T3 = async_test('A_04_02_05_T03', PROPS(A_04_02_05, {
    author:'Aleksei Yu. Semenov <a.semenov@unipro.ru>',
    reviewer:''
}));

A_04_02_05_T3.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_02_05_T3.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var linksWrapper = d.querySelector('#links-wrapper');
            var s = createSR(linksWrapper);
            var content1 = d.createElement('content');
            content1.setAttribute('select', '#link10');
            var content2 = d.createElement('content');
            content2.setAttribute('select', '#link11');
            content1.appendChild(content2);
            s.appendChild(content1);


            assert_true(isVisible(d.querySelector('#link10')), 'First <content> should participate in distribution');
            assert_false(isVisible(d.querySelector('#link11')), 'Nested <content> should not participate in distribution');

        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_02_05_T3.done();
    });
});

