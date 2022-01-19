import React from "react";
import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";
import bg from "../assets/login/login.png";
import { setCookie } from "../shared/cookie";
import { userStorage } from "../shared/userStorage";

const NaverAuthHandle = (props) => {
  const { history } = props;

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    const kakaoLogin = async () => {
      await axios
        .get(`http://3.34.19.50:8080/user/naver/callback?code=${code}`)
        .then((res) => {
          setCookie("token", res.headers.authorization);
          localStorage.setItem("is_login", true);
          localStorage.setItem("userId", res.data.userId);
          userStorage(res.data);
          // window.location.href = "/";
          history.push("/");
        });
    };
    kakaoLogin();
  }, []);

  return (
    <React.Fragment>
      <Container src={bg} alt="로딩 이미지" />
    </React.Fragment>
  );
};

export default NaverAuthHandle;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
