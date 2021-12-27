import React from "react";

import { Grid, Text, Input, Button } from "../elements/index";

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/modules/user';

const Login = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  console.log(user);
  const ldInput = React.useRef();
  const pwdInput = React.useRef();

  const join = () => {
    const id = ldInput.current.value;
    const pwd = pwdInput.current.value;

    if (id === '') {
      window.alert('아이디를 입력해주세요.');
      return null;
    } else if (pwd === '') {
      window.alert('비밀번호를 입력해주세요.');
      return null;
    }

    dispatch(userActions.loginDB(id, pwd));
  }

  console.log(localStorage.getItem('user'));

  return (
    <React.Fragment>
      <Grid width="70%" margin="auto" align="center">
        <Grid margin="10px 0">
          <Text size="20px" weight="bold">
            로그인
          </Text>
        </Grid>
        <Grid>
          <input type='text' ref={ldInput}/>
          <input type='password' ref={pwdInput}/>
          {/* <Input label="로그인" type="text"/>
          <Input label="비밀번호" type="password"/> */}
        </Grid>
        <Grid width="130px" margin="15px auto">
          <Button _onClick={join}>로그인</Button>
          <Button>회원가입</Button>
        </Grid>
        <Grid width="160px" margin="15px auto">
          <Button width="160px" margin="5px auto" padding="5px 0">
            네이버 로그인
          </Button>
          <Button width="160px" margin="5px auto" padding="5px 0">
            카카오 로그인
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
