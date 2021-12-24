import React, { useState } from "react";
import { history } from "../redux/ConfigStore";
import { useDispatch } from "react-redux";
import { boardCreators as boardActions } from "../redux/modules/freeboard";

import { Grid, Button } from "../elements/SharedCSS";
import { Input, Text } from "../elements/FreeBoardCSS/index";

//react icons
import { GrFormPrevious } from "react-icons/gr";
import { AiOutlineCamera } from "react-icons/ai";

const FreeBoardWrite = () => {
  const dispatch = useDispatch;

  // useState관리
  const [title, setTitle] = useState();
  const [content, setContet] = useState();
  const [profileImg, setProfileImg] = useState();

  // 제목
  const postTitle = (e) => {
    const currentTitle = e.target.value;
    setTitle(currentTitle);
  };
  // 글 내용
  const postContent = (e) => {
    const currentContent = e.target.value;
    setContet(currentContent);
  };
  // 이미지 업로드
  const uploadImg = () => {};
  // 데이터 전송 (완료 버튼)
  const addPostBtn = () => {
    dispatch(boardActions.addBoardDB(title, content));
  };
  return (
    <React.Fragment>
      <Grid header>게시글 작성 페이지</Grid>
      <Grid is_flex justify="space-between">
        <Grid
          cursor="pointer"
          _onClick={() => {
            history.goBack();
          }}
        >
          <GrFormPrevious size="40" />
        </Grid>
        <Button smallBtn _onClick={addPostBtn}>
          완료
        </Button>
      </Grid>
      <Grid align="center">
        <Grid is_flex padding="20px">
          <Text>제목</Text>
          <Input title _onChange={postTitle}></Input>
        </Grid>
        <Input
          textarea
          placeholder="내용을 입력하세요"
          _onChange={postContent}
        />
      </Grid>
      <Grid>
        <label htmlFor="myFile" style={{ cursor: "pointer" }}>
          <AiOutlineCamera size="25" />
        </label>
        <input
          type="file"
          id="myFile"
          style={{ display: "none" }}
          accept="image/*"
          onClick={uploadImg}
        />
      </Grid>
    </React.Fragment>
  );
};
export default FreeBoardWrite;
