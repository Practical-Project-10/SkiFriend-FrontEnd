import axios from 'axios'
import { useEffect } from 'react'
import styled from 'styled-components'
import { setCookie } from "../shared/cookie";

const NaverAuthHandle = (props) => {
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code')
    const kakaoLogin = async () => {
      await axios
        .get(`http://3.34.19.50:8080/user/naver/callback?code=${code}`)
        .then((res) => {
          setCookie('token', res.headers.authorization)
          localStorage.setItem('userId', res.data.userId)
          localStorage.setItem("nickname", res.data.nickname);
          localStorage.setItem("is_profile", res.data.profile);
          localStorage.setItem("is_login", true);
          window.location.href = "/";
        })
    }
    kakaoLogin()
  }, [props.history])

  return (
    <>
      <Container></Container>
    </>
  )
}

export default NaverAuthHandle

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`