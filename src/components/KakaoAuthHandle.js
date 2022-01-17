import React, { useEffect } from 'react';

import axios from 'axios';
import {KAKAO_ADD_PROPERTIES} from "../shared/kakaoAuth"

import { setCookie } from "../shared/cookie";

import styled from 'styled-components';

const KakaoAuthHandle = (props) => {
  const {history} = props;

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code');
    const kakaoLogin = async () => {
      let userId = localStorage.getItem('userId');
      await axios
        .get(`http://3.34.19.50:8080/user/kakao/callback?code=${code}`)
        .then((res) => {
          setCookie('token', res.headers.authorization);
          localStorage.setItem('userId', res.data);
          window.location.href = KAKAO_ADD_PROPERTIES;
          // history.push('/user/kakao/callback/properties');
        })
    }
    kakaoLogin()
  }, [])

  return (
    <>
      <Container>로딩 중 입니다.</Container>
    </>
  )
}

export default KakaoAuthHandle

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`