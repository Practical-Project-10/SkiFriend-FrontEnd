import React from "react";

import { Grid, Text, Input, Button } from "../elements/index";

const Login = (props) => {
  return (
    <React.Fragment>
      <Grid width="70%" margin="auto" align="center">
        <Grid margin="10px 0">
          <Text size="20px" weight="bold">
            로그인
          </Text>
        </Grid>
        <Grid>
          <Input label="로그인" type="text" />
          <Input label="비밀번호" type="password" />
        </Grid>
        <Grid width="130px" margin="15px auto">
          <Button>로그인</Button>
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
