import React from "react";

import { Grid, Image, Text, Input, Button } from "../elements/index";

const SignupTwo = (props) => {
  return (
    <React.Fragment>
      <Grid width="70%" margin="auto">
        <Grid width="70%" margin="auto">
          <Image width="170px" height="170px" margin="auto" radius="50%" />
          <input type="file" />
        </Grid>
        <Grid is_flex padding="0 24px" direction="column">
          <Text marginB="5px">
            이름: <Input profile type="text" width="50px" />
          </Text>
          <Text marginB="5px">
            성별: <Input profile type="text" width="50px" />
          </Text>
          <Text marginB="5px">
            나이: <Input profile type="text" width="50px" />
          </Text>
          <Text marginB="5px">
            스키 / 스노우보드 경력: <Input profile type="text" width="50px" />
          </Text>
          <Text marginB="5px">
            가입 인사 한마디{" "}
            <textarea style={{ width: "100%", height: "70px" }} />
          </Text>
        </Grid>
        <Grid align="center">
          <Button width="100px" padding="7px" margin="25px auto">
            가입하기
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SignupTwo;
