<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="myPageontainer">
    <div id="myPageontainer">
        <H3>${requestScope.Msg}</H3>
        <form action="/user/myPage" method="post" onsubmit="return  chckPw();">
            <div class="myPageContent" action="/user/modUser">
                <div><h3>${sessionScope.loginUser.uid} 님</h3></div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">이메일</span>
                    </div>
                    <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                           aria-describedby="basic-addon1" value="${sessionScope.loginUser.uemail}" readonly>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon2">이름</span>
                    </div>
                    <input type="text" class="form-control" placeholder="Email" aria-label="Username" readonly
                           aria-describedby="basic-addon1" value="${sessionScope.loginUser.unm}">
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">비밀번호</span>
                    </div>
                    <input type="password" id="inputPassword" class="form-control inputPassword" name="upw"
                           placeholder="Password" aria-label="Password"
                           aria-describedby="basic-addon1" minlength="6" maxlength="12" required>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon4">비밀번호 확인</span>
                    </div>
                    <input type="password" id="inputPasswordChck" class="form-control inputPasswordChck" name="upwChck"
                           placeholder="Password Check"
                           aria-label="Username"
                           aria-describedby="basic-addon1" minlength="6" maxlength="12" required>
                    <input type="hidden" name="uid" value="${sessionScope.loginUser.uid}">
                </div>
                <div id="checkPwMsg"></div>
                <div class="button_container"><input class="btn btn-secondary" type="submit" value="적용">
                    <a href="/board/list">
                        <button class="btn btn-secondary" type="button">취소</button>
                    </a></div>
            </div>
        </form>
    </div>
</div>

<script src="/res/js/user/join.js/"></script>