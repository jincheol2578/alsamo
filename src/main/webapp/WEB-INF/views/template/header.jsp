<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<header>
    <ul>
        <c:choose>
            <c:when test="${not empty sessionScope.loginUser}">
                <li id="mark">
                    <div id="markBox">
                        <span id="loginName"><a href="/user/myPage">${sessionScope.loginUser.uid}</a></span>
                        <c:if test="${sessionScope.loginUser.authno != 3 or sessionScope.loginUser.authno != 4}">
                            <img id="markImg"
                                 src="/img/${sessionScope.loginUser.authno}/${sessionScope.loginUser.profileImg}">
                        </c:if>
                    </div>
                </li>

                <li><a href="/user/logout">로그아웃</a></li>
            </c:when>
            <c:otherwise>
                <li><a id="modalBtn" onclick="openModal();" href="#">로그인</a></li>
                <li><a href="/user/join">회원가입</a></li>

            </c:otherwise>
        </c:choose>
        <li><a href="">게시판</a></li>
        <li><a href="/board/write">글쓰기</a></li>
        <li><a href="/alcohol/alcoholList">술과사전</a></li>
    </ul>
    <div id="modal" class="displayNone">
        <div class="modal_content">
            <a href="#" onclick="closeModal();"><img id="modalBtnClose" clase="X" src="/img/close.png"></a>
            <div><h3>${errMsg}</h3></div>
            <idv><h3>${requestScope.msg}</h3></idv>
            <div><h3>${authkeyErr}</h3></div>
            <form class="loginForm" action="/user/login" method="post">
                <div><input class="loginProperty" type="text" name="uid" placeholder="아이디"></div>
                <div><input class="loginProperty" type="text" name="upw" placeholder="비밀번호"></div>
                <div><input class="loginBtn" type="submit" value="로그인"></div>
                <div><a href="/user/join">
                    <button class="loginBtn" type="button">회원가입</button>
                </a></div>
            </form>
            <div class="or">------------------ or -----------------</div>

            <%-- 구글 로그인 버튼--%>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>

            <%-- 구글 로그 아웃--%>
            <%-- <a href="#" onclick="signOut();">Sign out</a> --%>
        </div>
    </div>
</header>