
function ajaxAl(name) {
    const init = {
        method: 'post',
        body: JSON.stringify(name),
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json;charset=UTF-8'
        }
    };

    fetch('/alcohol/alcoholList', init)
        .then((res) => {
            return res.json();
        })
        .then((myJson) => {
            document.getElementById('alcoholContent').innerHTML = myJson.content;
            const conetentInnerText = document.getElementById('alcoholContent').innerHTML;
            if (conetentInnerText == null || conetentInnerText == '') {
                alert('검색어가 유효하지 않습니다!');
            }
            addSrc();
        })

}

function addSrc() {
    const container = document.querySelector('#downContent');
    const a = container.getElementsByTagName('a');

    for (var i = 0; i < a.length; i++) {
        var origin = a[i].getAttribute('href');
        var sufix = "https://ko.wikipedia.org/";
        a[i].href = sufix + origin;
    }
}

function searchWhat(name) {
    const what = {
        name: name
    };
    ajaxAl(what)
}

function searchName() {
    let value = document.getElementById('searchWhat');
    let searchWhat = value.value;
    const name = {
        name: searchWhat,
    };
    ajaxAl(name);
}

function enterKey() {
    if (window.event.keyCode == 13) {
        searchName();
    }

}

function hindUselss() {
    document.querySelector('#p-lang-btn').style.display = 'none';
    document.querySelector('.nowraplinks ').style.display = 'none';
}