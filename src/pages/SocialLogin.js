import React from "react";

import styled from "styled-components";
import { Grid, Button, Image, Text } from "../elements/index";
import logo from "../assets/login/logo.svg";
import bg from "../assets/login/login.png";
import kakao_logo from "../assets/login/kakao.svg";
import { KAKAO_AUTH_URL } from "../shared/kakaoAuth";

const Login = (props) => {
  const history = props.history;
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <React.Fragment>
      <Grid
        src={bg}
        minHeight="calc( 100vh - 55px )"
        display="flex"
        direction="column"
        padding="114px 16px 16px"
      >
        <Grid
          width="100%"
          height="73px"
          cursor="pointer"
          margin="0 0 153px"
          _onClick={() => history.push("/")}
        >
          <Image src={logo} width="100%" height="73px" margin="0 auto" />
        </Grid>

        <Grid display="flex" direction="column" align="center">
          <Text block margin="0 0 33px">
            소셜로그인을 진행해주세요.
          </Text>
          <Grid display="flex" direction="column" gap="16px">
            <Grid position="relative" cursor="pointer">
              <WrapLogo>
                <img src={kakao_logo} alt="카카오 로그인" />
              </WrapLogo>
              <Button bg="#FFF" color="#474D56" _onClick={kakaoLogin}>
                카카오톡
              </Button>
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
  border-right: 1px solid #e0e0e0;
`;

export default Login;
