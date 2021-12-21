import React from 'react';

import {Grid, Text, Input, Button} from '../elements/LoginCSS';

const Login = (props) => {
  
//test
  return (
    <React.Fragment>
      <Grid>
        <Grid>
          <Grid className='title'>
            <Text className='pageTitle'>로그인</Text>
          </Grid>
          <Grid className='loginInput'>
            <Input label='로그인' type='text'/>
            <Input label='비밀번호' type='password'/>
          </Grid>
          <Grid className='loginButtons'>
            <Button>로그인</Button>
            <Button>회원가입</Button>
          </Grid>
          <Grid className='socialButtons'>
            <Button className='social'>네이버 로그인</Button>
            <Button className='social'>카카오 로그인</Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
};

export default Login