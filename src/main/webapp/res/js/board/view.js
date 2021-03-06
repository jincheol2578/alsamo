const params = new URLSearchParams(location.search);
const bnoVal = params.get('bno');
const regBtn = document.getElementById('insBtn');
let replyListElem = document.getElementById('replyList');
const loginUserPk = replyListElem.dataset.userPk;
regBtn.addEventListener('click', regReply);

// 댓글등록
function regReply() {
    const repFrmElem = document.getElementById("repFrm");
    const repnmElem = document.getElementById('repnm');
    const reppwElem = document.getElementById('reppw');
    const repctntElem = document.getElementById('repctnt');

    let repnmVal = null;
    let reppwVal = null;
    if (repnmElem != null) {
        repnmVal = repnmElem.value;
        reppwVal = reppwElem.value;
    }
    const param = {
        bno: bnoVal,
        repnm: repnmVal,
        reppw: reppwVal,
        repctnt: repctntElem.value
    };
    regAjax(param, 0);
    repFrmElem.reset();
}

function regAjax(param, idx) {
    if (isNaN(parseInt(loginUserPk)) && param.reppw === '') {
        alert('비밀번호를 입력해주세요.');
        return;
    } else if (isNaN(parseInt(loginUserPk)) && param.repnm === '') {
        alert('아이디를 입력해주세요.');
        return;
    } else if (param.repctnt === '') {
        alert('내용을 입력해주세요.');
        return;
    }

    const init = {
        method: 'POST',
        body: JSON.stringify(param),
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json;charset=UTF-8'
        }
    };

    fetch('reply/' + idx, init)
        .then((res) => {
            return res.json();
        })
        .then((myJson) => {
            if (myJson.result == 1) {
                getListAjax();
            } else {
                //등록실패
                alert('등록 실패.');
            }
        });
}

// 댓글리스트
function getListAjax() {
    fetch('reply/' + bnoVal)
        .then((res) => {
            return res.json();
        })
        .then((myJson) => {
            makeReplyList(myJson);
        });
}

//리스트 만들기
function makeReplyList(data) {
    replyListElem.innerHTML = '';
    const ulElem = document.createElement('ul');

    replyListElem.append(ulElem);


    data.forEach((item) => {
        const liElem = document.createElement('li');
        const repBoxElem = document.createElement('div');
        const repElem1 = document.createElement('div');
        const repElem2 = document.createElement('div');
        const repElem3 = document.createElement('div');
        const repElem4 = document.createElement('div');

        if(item.repdept > 0) {
            repBoxElem.classList.add('re-reply-item');
        }
        repBoxElem.classList.add('rep-box');
        repElem1.setAttribute('class', 'child1');
        repElem2.setAttribute('class', 'child2');
        repElem3.setAttribute('class', 'child3');
        repElem4.setAttribute('class', 'child4');
        const writerProfile = document.createElement('a');
        writerProfile.innerText = item.repnm;
        writerProfile.href = '/user/info?uno=' + item.uno;
        repElem1.append(writerProfile);
        repElem2.append(item.repctnt);
        repElem3.append(item.reprdt);

        liElem.setAttribute('class', 'repConOnBott');
        // 자기 댓글이거나 익명댓글인 경우 삭제 버튼 만들어주기
        if (parseInt(loginUserPk) === item.uno || item.uno === 0) {
            const delBtn = document.createElement('input');
            delBtn.type = 'button';
            delBtn.value = '삭제';
            delBtn.setAttribute('class', 'btn btn-secondary  btn-sm');
            let promptPw = null;

            //삭제버튼 클릭시
            delBtn.addEventListener('click', () => {
                if (confirm('삭제하시겠습니까?')) {
                    if (item.uno === 0) {
                        promptPw = parseInt(prompt("비밀번호를 입력하세요"));
                    }
                    const param = {
                        repno: item.repno,
                        reppw: promptPw
                    };
                    delAjax(param);
                } else {
                    return;
                }
            });
            delBtn.innerText = '삭제';
            repElem4.append(delBtn);
        }
        // 답글버튼 - 댓글 내용 클릭 시 댓글밑에 생성
        repElem2.addEventListener('click', () => {
            liElem.classList.toggle("reReply");

            const formElem = document.createElement('form');
            const reReplyChild1 = document.createElement('div');
            const reReplyChild2 = document.createElement('div');
            const reReplyChild3 = document.createElement('div');
            const inputRepnm = document.createElement('input');
            const inputReppw = document.createElement('input');
            const txtRepctnt = document.createElement('textarea');
            const inputReBtn = document.createElement('input');

            formElem.onsubmit = 'return false;';
            formElem.id = 'reReplyFrm' + item.repno;
            formElem.setAttribute('class', 'reReplyFrm');
            reReplyChild1.classList.add('re-rep-box1');
            reReplyChild2.classList.add('re-rep-box2');
            reReplyChild3.classList.add('re-rep-box3');
            inputRepnm.type = 'text';
            inputRepnm.setAttribute('class', 'reRepName form-control');
            inputRepnm.setAttribute('placeholder', '아이디');
            inputReppw.type = 'password';
            inputReppw.setAttribute('class', 'reRepPwd form-control');
            inputReppw.setAttribute('placeholder', '비밀번호');
            txtRepctnt.setAttribute('class', 'reRepCtnt form-control');
            txtRepctnt.setAttribute('placeholder', '내용');
            inputReBtn.type = 'button';
            inputReBtn.setAttribute('class', 'btn btn-secondary btn-sm');
            inputReBtn.value = '작성';

            /*
            댓글 클릭했을때 liElem에 'reReply'클래스 추가해줌
            'reReply' 클래스가 있으면 대댓글창 생성 없으면 삭제
            */
            if (liElem.classList.contains('reReply')) {
                if (isNaN(parseInt(loginUserPk))) {
                    reReplyChild1.append(inputRepnm);
                    reReplyChild1.append(inputReppw);
                    formElem.append(reReplyChild1);
                }
                reReplyChild2.append(txtRepctnt);
                reReplyChild3.append(inputReBtn);
                formElem.append(reReplyChild2);
                formElem.append(reReplyChild3);

                liElem.append(formElem);
            } else {
                document.getElementById('reReplyFrm' + item.repno).remove();
            }

            // 답글 전송버튼 눌렀을떄
            inputReBtn.addEventListener('click', () => {
                let reRepFrm = document.getElementById('reReplyFrm' + item.repno);
                let reRepName = null;
                let reRepPwd = null;
                if (isNaN(parseInt(loginUserPk))) {
                    reRepName = reRepFrm.querySelector('.reRepName').value;
                    reRepPwd = reRepFrm.querySelector('.reRepPwd').value;
                }

                reRepCtnt = reRepFrm.querySelector('.reRepCtnt').value;
                const param = {
                    bno: bnoVal,
                    repnm: reRepName,
                    reppw: reRepPwd,
                    repctnt: reRepCtnt,
                    repidx: item.repidx,
                    repord: item.repord,
                    repdept: item.repdept
                }
                regAjax(param, 1);

            })
        });


        ulElem.append(liElem);
        repBoxElem.append(repElem1);
        repBoxElem.append(repElem2);
        repBoxElem.append(repElem3);
        repBoxElem.append(repElem4);
        liElem.append(repBoxElem);
    });
}

// 댓글 삭제
function delAjax(param) {
    const init = {
        method: 'DELETE',
        body: JSON.stringify(param),
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json;charset=UTF-8'
        }
    };

    fetch('reply', init)
        .then((res) => {
            return res.json();
        })
        .then((myJson) => {
            switch (myJson.result) {
                case 0:
                    alert('잘못된 비밀번호입니다.');
                    break;
                case 1:
                    getListAjax();
                    break;
            }
        });
}

getListAjax();
getRec(bnoVal);

//게시글 추천
const upRecBtn = document.getElementById('upRecBtn');
const downRecBtn = document.getElementById('downRecBtn');

upRecBtn.addEventListener('click', () => {
    recClicked(1, upRecBtn.classList);
});
downRecBtn.addEventListener('click', () => {
    recClicked(0, downRecBtn.classList);
});

function recClicked(recVal, btnClassName) {
    if (!upRecBtn.classList.contains('clicked') && !downRecBtn.classList.contains('clicked')) {
        regRec(recVal);
    } else if (btnClassName.contains('clicked')) {
        delRec();
    } else {
        alert('이미 추천한 게시글입니다.')
    }
}


// 추천수
function getRec(bno) {
    const upCntElem = document.getElementById('cntUp');
    const downCntElem = document.getElementById('cntDown');
    fetch('/board/rec/' + bno)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            upCntElem.innerText = '';
            downCntElem.innerText = '';
            for (var i = 0; i < data.result.length; i++) {
                if (data.result[i].rec === 1) {
                    upCntElem.innerText = data.result[i].cnt;
                } else if (data.result[i].rec === 0) {
                    downCntElem.innerText = data.result[i].cnt;
                }
            }

            if (data.recCheck !== null && data.recCheck.recChk === 1) {
                toggleRec(data.recCheck.rec);
            } else {
                toggleRec(2);
            }
        });
}

function toggleRec(toggle) {
    switch (toggle) {
        case 0:
            downRecBtn.classList.add('clicked');
            break;
        case 1:
            upRecBtn.classList.add('clicked');
            break;
        case 2:
            downRecBtn.classList.remove('clicked');
            upRecBtn.classList.remove('clicked');
    }
}

// 추천, 비추천
function regRec(recVal) {
    fetch('/board/rec', {
        method: 'POST',
        body: JSON.stringify({
            bno: bnoVal,
            rec: recVal
        }),
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json;charset=UTF-8'
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.result === 0) {
                alert('로그인을 해주세요');  //로그인 필요
            }
            getRec(bnoVal);
        });
}

// 추천,비추천 해제
function delRec() {
    fetch('/board/rec/' + bnoVal, {
        method: 'DELETE'
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.result === 0) {
                alert('잘못된 접근입니다.');
            }
            getRec(bnoVal);
        })
}

// 공지사항 등록, 해제
const noticeBtnElem = document.getElementById('regNotice');
if (noticeBtnElem !== null) {
    checkNotice();
}
function checkNotice() {
    fetch('/board/notice/check/' + bnoVal)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.notice === 0) {
                noticeBtnElem.innerText = '공지 등록';
                noticeBtnElem.addEventListener('click', () => {
                    if(confirm('등록하시겠습니까?')) {
                        regNotice();
                    }
                });
            } else {
                noticeBtnElem.innerText = '공지 해제';
                noticeBtnElem.addEventListener('click', () => {
                    if(confirm('해제하시겠습니까?')) {
                        delNotice();
                    }
                });
            }
        });
}

// 공지사항 등록
function regNotice() {
    fetch('/board/notice/' + bnoVal, {
        method: 'POST'
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data.notice === 1){
                checkNotice();
            } else {
                alert('권한이 없습니다');
            }
        });
}

// 공지사항 삭제
function delNotice() {
    fetch('/board/notice/' + bnoVal, {
        method: 'DELETE'
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data.notice === 1){
                checkNotice();
            } else {
                alert('권한이 없습니다');
            }
        });
}