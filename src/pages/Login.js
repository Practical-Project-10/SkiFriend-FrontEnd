import React from "react";

import { Grid, Text, Input, Button } from "../elements/index";
import background from '../assets/login/login.png';

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/modules/user';

const Login = (props) => {
  const history = props.history;
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
    <Grid phoneSize>
      <Grid height='73px' margin='89px 0 108px'>
        로고
      </Grid>

      <Grid>
        <Input type='text' ref={ldInput} label='아이디'/>
        <Input type='password' ref={pwdInput} label='비밀번호'/>
      </Grid>

      <Grid margin="127px 0 0">
        <Button _onClick={join} bg='#6195CF'>회원가입</Button>
        <Button _onClick={() => history.push('/phoneauth')} text='회원가입'>로그인</Button>
      </Grid>
    </Grid>
  );
};

export default Login;
