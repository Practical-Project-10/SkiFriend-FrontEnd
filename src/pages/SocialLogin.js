import React from "react";

import { useDispatch } from "react-redux";
import { userActions } from "../redux/modules/user";

import styled from "styled-components";
import { Grid, Input, Button, Image, Text } from "../elements/index";
import logo from "../assets/login/logo.svg";
import bg from "../assets/login/login.png";
import kakao_logo from "../assets/login/kakao.svg";
import naver_logo from "../assets/login/naver.svg";

import {KAKAO_AUTH_URL} from "../shared/kakaoAuth";
import {NAVER_AUTH_URL} from "../shared/naverAuth";

const Login = (props) => {
  const history = props.history;
  const dispatch = useDispatch();
  const ldInput = React.useRef();
  const pwdInput = React.useRef();

  const join = () => {
    // const {name} = e.target;

    const id = ldInput.current.value;
    const pwd = pwdInput.current.value;

    // if (name === 'id' || name === 'password') {
    //   if (e.key === "Enter") {
    //     dispatch(userActions.loginDB(id, pwd));
    //   }
    // } else {
    //   return null;
    // }

    if (id === "") {
      window.alert("아이디를 입력해주세요.");
      return null;
    } else if (pwd === "") {
      window.alert("비밀번호를 입력해주세요.");
      return null;
    }
    
    dispatch(userActions.loginDB(id, pwd));
  };

  // const onClickLogin = () => {
  //   axios.post(LOCAL + '/user/login', {
  //       username: id,
  //       password: pw,
  //   }).then((res) => {
  //       console.log(res.data);
  //       console.log(res.headers.authorization);
  //       localStorage.setItem('token', res.headers.authorization);
  //       window.location.href = "/";
  //   }).catch((err) => { alert(err, " 로그인 실패"); });
  // }

  // const signUp = () => {
  //   axios.post(LOCAL + '/user/signup', {
  //       username: "tjddm12",
  //       password: "diddl123",
  //       phoneNum: "01012343234",
  //       nickname: "tjdkl11",
  //   }).then((res) => {
  //       alert("회원가입 완료");
  //   })
  //   .catch((err) => { alert("이미 회원임..!") });
  // }

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  }

  const naverLogin = () => {
      window.location.href = NAVER_AUTH_URL;
  }

  return (
    <React.Fragment>
      <Grid src={bg} minHeight="calc( 100vh - 55px )" display='flex' direction='column'  padding='114px 16px 16px'>
          <Grid width='100%' height="73px" cursor="pointer" margin="0 0 153px" _onClick={() => history.push('/')}>
            <Image src={logo} width='100%' height='73px' margin='0 auto'/>
          </Grid>

          <Grid display='flex' direction='column' align='center'>
            <Text block margin='0 0 33px'>소셜로그인을 진행해주세요.</Text>
            <Grid display='flex' direction='column' gap='16px'>
              <Grid position='relative' cursor='pointer'>
                <WrapLogo>
                  <img src={kakao_logo} alt='카카오 로그인'/>
                </WrapLogo>
                <Button bg="#FFF" color='#474D56' _onClick={kakaoLogin}>카카오톡</Button>
              </Grid>
              <Grid position='relative' cursor='pointer'>
                <WrapLogo>
                  <img src={naver_logo} alt='네이버 로그인'/>
                </WrapLogo>
                <Button bg="#FFF" color='#474D56' _onClick={naverLogin}>네이버</Button>
              </Grid>
            </Grid>
          </Grid>
      </Grid>
    </React.Fragment>
  );
};

const WrapLogo = styled.div`
  width: 57px;
  height: 43px;
  padding: 9px 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #E0E0E0;
`

export default Login;
