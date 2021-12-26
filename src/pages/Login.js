import React from 'react';

import {Grid, Text, Input, Button} from '../elements/LoginCSS';

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

  return (
    <React.Fragment>
        <Grid>
          <Grid className='title'>
            <Text className='pageTitle'>로그인</Text>
          </Grid>
          <Grid className='loginInput'>
            <input type='text' ref={ldInput}/>
            <input type='password' ref={pwdInput}/>
            {/* <Input label='로그인' type='text' ref={ldInput}/>
            <Input label='비밀번호' type='password' ref={pwdInput}/> */}
          </Grid>
          <Grid className='loginButtons'>
            <Button _onClick={join}>로그인</Button>
            <Button>회원가입</Button>
          </Grid>
          <Grid className='socialButtons'>
            <Button className='social'>네이버 로그인</Button>
            <Button className='social'>카카오 로그인</Button>
          </Grid>
        </Grid>
    </React.Fragment>
  )
};

export default Login