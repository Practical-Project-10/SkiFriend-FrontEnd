import React from "react";
import { Grid, Button } from "../elements/SharedCSS/index";
import { Text, Input } from "../elements/FreeBoardCSS/index";

//react icons
import { GrFormPrevious } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";

const FreeBoardDetail = () => {
  return (
    <React.Fragment>
      <Grid header>상세게시글</Grid>
      <GrFormPrevious size="40" />
      <Grid is_flex justify="space-between">
        <Grid is_flex>
          <Text margin="0 10px">닉네임</Text>
          <Text>게시글 제목</Text>
        </Grid>
        <Grid is_flex>
          <Button smallBtn>수정</Button>
          <Button smallBtn>삭제</Button>
        </Grid>
      </Grid>
      <Grid is_flex justify="flex-end">
        <Grid is_flex margin="0 5px">
          <AiOutlineHeart />
          <Text>2</Text>
        </Grid>
        <Grid is_flex>
          <BsChat />
          <Text>3</Text>
        </Grid>
        <Grid margin="0 5px">
          <Text>12:00</Text>
        </Grid>
      </Grid>
      <Grid>
        <Text>Sample</Text>
      </Grid>
      <Grid is_flex justify="space-around">
        <Input width="80%" placeholder="댓글작성" />
        <Button smallBtn>작성</Button>
      </Grid>
      <Grid>
        <Text>Comment</Text>
      </Grid>
      <Grid is_flex justify="space-between">
        <Text>닉네임</Text>
        <Grid>
          <Button smallBtn>수정</Button>
          <Button smallBtn>삭제</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default FreeBoardDetail;
