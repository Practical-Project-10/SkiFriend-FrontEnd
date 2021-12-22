import React from "react";

import {Grid, Image, Text, Input, Button} from '../elements/SignupTwoCSS';

const SignupTwo = (props) => {


  return (
    <React.Fragment>
        <Grid>
          <Grid>
            <Image src=''/>
            <input type='file'/>
          </Grid>
          <Grid className='profileForm'>
            <Text>이름: <Input type='text' width='50px'/></Text>
            <Text>성별: <Input type='text' width='50px' /></Text>
            <Text>나이: <Input type='text' width='50px'/></Text>
            <Text>스키 / 스노우보드 경력: <Input type='text' width='50px'/></Text>
            <Text>가입 인사 한마디 <textarea style={{width: '100%', height:'70px'}}/></Text>
          </Grid>
          <Grid align='center'>
            <Button>가입하기</Button>
          </Grid>
        </Grid>
    </React.Fragment>
  )
};

export default SignupTwo;