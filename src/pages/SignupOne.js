import React from "react";

import {Grid, Text, Input, Button} from '../elements/SignupOneCSS';

const SignupOne = (props) => {


  return (
    <React.Fragment>
      <Grid>
        <Grid>
          <Grid className='title'>
            <Text className='pageTitle'>회원가입</Text>
          </Grid>
          <Grid className='signupBox'>
            <Input label='로그인' type='text'/>
            <Input label='닉네임' type='text'/>
            <Input label='비밀번호' type='password'/>
            <Input label='비밀번호 확인' type='password'/>
          </Grid>
          <Grid className='buttonGroup'>
            <Button>핸드폰번호 인증</Button>
            <Button>다음</Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
};

export default SignupOne;