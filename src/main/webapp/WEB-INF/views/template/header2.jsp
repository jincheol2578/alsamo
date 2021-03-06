<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container-fluid">
        <i id="sidebarToggle" class="fas fa-bars"></i>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span
                class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                <li class="nav-item"><a class="nav-link" href="/">홈</a></li>

<%--                <li class="nav-item"><a class="nav-link" href="#!">Link</a></li>--%>

                <c:choose>
                    <c:when test="${empty sessionScope.loginUser}">
                        <li class="nav-item"><a class="nav-link" onclick="openModal();" href="#!">로그인</a></li>
                    </c:when>
                    <c:otherwise>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button"
                               data-bs-toggle="dropdown" aria-haspopup="true"
                               aria-expanded="false">${sessionScope.loginUser.uid}</a>

                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="/user/logout">로그아웃</a>
                                <a class="dropdown-item" href="/user/myPage">마이페이지</a>
                                <c:if test="${sessionScope.loginUser.authno eq 1}">
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="/admin/board">관리자 페이지</a>
                                </c:if>
                            </div>
                        </li>
                    </c:otherwise>
                </c:choose>

            </ul>
        </div>
    </div>
</nav>
<div id="modal" class="displayNone">
    <div class="modal_content">
        <div class="X"><a href="#" onclick="closeModal();"><i class="fas fa-times fa-2x"></i></a></div>
        <form class="loginForm" action="/user/login" method="post">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">아이디</span>
                </div>
                <input type="text" class="form-control" placeholder="Id" name="uid" aria-label="Id"
                       aria-describedby="basic-addon1" required>
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon4">비밀번호</span>
                </div>
                <input type="password" class="form-control" placeholder="Password" name="upw" aria-label="Password"
                       aria-describedby="basic-addon1" required>
            </div>
            <div>
                <i class="fas fa-lock"></i>
                <a href="/user/findId" class="link">아이디</a> ·
                <a href="/user/findPw" class="link">비밀번호찾기</a>
            </div>
            <div class="button_container"><input class="btn btn-secondary" type="submit" value="로그인"></div>
            <div><a href="/user/join">
                <button class="btn btn-secondary" type="button">회원가입</button>
            </a></div>
        </form>
    </div>
</div>

