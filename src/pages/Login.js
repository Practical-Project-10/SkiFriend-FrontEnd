import React from "react";

import styled from "styled-components";
import { Grid, Text, Input, Button, Image } from "../elements/index";
import background from "../assets/login/login.png";

import Header from "../components/Header";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";

const Login = (props) => {
  const history = props.history;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const ldInput = React.useRef();
  const pwdInput = React.useRef();

  const join = () => {
    const id = ldInput.current.value;
    const pwd = pwdInput.current.value;

    if (id === "") {
      window.alert("아이디를 입력해주세요.");
      return null;
    } else if (pwd === "") {
      window.alert("비밀번호를 입력해주세요.");
      return null;
    }

    dispatch(userActions.loginDB(id, pwd));
  };

  console.log(localStorage.getItem("user"));

  return (
    <React.Fragment>
      <Header>로그인</Header>
      <Grid phoneSize minHeight='calc( 100vh - 55px )'>
        <Grid height="73px" margin="69px 0 119px">
          로고
        </Grid>

        <Grid>
          <Grid margin='0 0 41px'>
            <Input type="text" ref={ldInput} label="아이디"/>
          </Grid>
          <Grid>
            <Input type="password" ref={pwdInput} label="비밀번호" />
          </Grid>
        </Grid>

        <Grid margin="319px 0 16px">
          <Button 
            bg="#6195CF"
            margin='0 0 16px'
            _onClick={() => history.push("/phoneauth")}
          >회원가입</Button>
          <Button _onClick={join}>로그인</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Frame = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc( 100vh - 55px );
  padding: 0 16px;
  background: url(${background});
`

export default Login;
