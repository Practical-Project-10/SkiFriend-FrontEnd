import React, { useEffect } from "react";

import { apis } from "../shared/apis";
import { KAKAO_ADD_PROPERTIES } from "../shared/kakaoAuth";

import { setCookie } from "../shared/cookie";

import styled from "styled-components";
import bg from "../assets/login/login.png";

const KakaoAuthHandle = (props) => {
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    const kakaoLogin = async () => {
      await apis.kakaoLogin1(code)
        .then((res) => {
          console.log(res.data)
          setCookie("token", res.headers.authorization);
          localStorage.setItem("userId", res.data);
          window.location.href = KAKAO_ADD_PROPERTIES;
          // history.push('/user/kakao/callback/properties');
        });
    };
    kakaoLogin();
  }, []);

  return <Container src={bg} alt="로딩 이미지" />;
};

export default KakaoAuthHandle;

const Container = styled.img`
  width: 100%;
  min-height: calc(100vh - 55px);
`;
