import React from "react";

import { Grid, Input, Button, Image } from "../elements/index";
import logo from "../assets/login/logo.svg"
import bg from "../assets/login/login.png"

import Header from "../components/Header";

import { useDispatch } from "react-redux";
import { userActions } from "../redux/modules/user";

const Login = (props) => {
  const history = props.history;
  const dispatch = useDispatch();
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

  return (
    <React.Fragment>
      <Header>로그인</Header>
      <Grid src={bg} minHeight="calc( 100vh - 55px )" display='flex' direction='column' justify='space-between' padding='46px 16px 16px'>
        <Grid width='100%' height="73px">
          <Image src={logo} width='100%' height='73px'/>
        </Grid>

        <Grid display='flex' direction='column' gap='41px' margin='0 0 200px 0'>
          <Input type="id" placeholder="아이디" ref={ldInput} label="아이디" />
          <Input
            type="password"
            placeholder="비밀번호"
            ref={pwdInput}
            label="비밀번호"
          />
        </Grid>

        <Grid>
          <Button margin="0 0 16px" _onClick={join}>로그인</Button>
          <Button bg="#6195CF" _onClick={() => history.push("/phoneauth")}>회원가입</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};



export default Login;
