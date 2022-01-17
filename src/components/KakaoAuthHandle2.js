import axios from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components';
import { userStorage } from '../shared/userStorage';

const KakaoAuthHandle2 = (props) => {
  const {history} = props;

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code')
    let userId = localStorage.getItem('userId')
    const kakaoLogin = async () => {
      await axios
        .get(`https://seongeunyang.shop/user/kakao/callback/${userId}?code=${code}`)
        .then((res) => {
          // console.log("window.location.href = / 실행")
          // console.log(res)
          localStorage.setItem("is_login", true);
          userStorage(res.data);
          // window.location.href = "/";
          history.push('/');
        })
    }
    kakaoLogin()
  }, [])

  return (
    <>
      <Container></Container>
    </>
  )
}


export default KakaoAuthHandle2

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`