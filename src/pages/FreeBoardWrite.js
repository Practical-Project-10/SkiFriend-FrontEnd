import React from "react";
import { Grid } from "../elements/SharedCSS";
import { Button, Input, Text } from "../elements/FreeBoardCSS/index";
import Navbar from "../components/Navbar";

//react icons
import { GrFormPrevious } from "react-icons/gr";

const FreeBoardWrite = () => {
  return (
    <React.Fragment>
      <Grid header>게시글 작성 페이지</Grid>
      <Grid is_flex justify="space-between">
        <GrFormPrevious size="40" />
        <Button smallBtn>완료</Button>
      </Grid>
      <Grid align="center">
        <Grid is_flex padding="20px">
          <Text>제목</Text>
          <Input title></Input>
        </Grid>
        <Input textarea placeholder="내용을 입력하세요" />
      </Grid>
      <Navbar />
    </React.Fragment>
  );
};
export default FreeBoardWrite;