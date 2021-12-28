import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boardCreators as boardActions } from "../redux/modules/freeboard";

import { Grid, Button, Input, Text } from "../elements/index";

//react icons
import { GrFormPrevious } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const FreeBoardDetail = ({ history }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId;
  const postData = useSelector((state) => state.freeboard.detail);

  //------useState관리-------
  const [showmodal, setShowModal] = useState();

  //-------Modal-------
  const closemodal = () => {
    setShowModal(false);
  };

  React.useEffect(() => {
    dispatch(boardActions.getOnePostDB(postId));
  }, []);

  return (
    <React.Fragment>
      <Grid header>상세게시글</Grid>
      <Grid
        cursor="pointer"
        _onClick={() => {
          history.goBack();
        }}
      >
        <GrFormPrevious size="40" />
      </Grid>
      <Grid is_flex justify="space-between">
        <Grid is_flex>
          <Text margin="0 10px">{postData.nickname}</Text>
          <Text>{postData.title}</Text>
        </Grid>
        <Grid is_flex>
          <Grid
            cursor="pointer"
            _onClick={() => {
              setShowModal(true);
            }}
          >
            <BiDotsHorizontalRounded />
          </Grid>
          <div showmodal={showmodal} />
          {showmodal ? (
            <Background onClick={closemodal}>
              <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Text>프로필 사진 바꾸기</Text>

                <Text color="#ed4956">삭제</Text>
                <Text _onClick={closemodal} padding="15px 0" cursor="pointer">
                  취소
                </Text>
              </ModalContainer>
            </Background>
          ) : null}
        </Grid>
      </Grid>
      <Grid is_flex justify="flex-end">
        <Grid is_flex margin="0 5px">
          <AiOutlineHeart />
          <Text>{postData.likesDtoList}</Text>
        </Grid>
        <Grid is_flex>
          <BsChat />
          <Text>{postData.commentDtoList}</Text>
        </Grid>
        <Grid margin="0 5px">
          <Text>{postData.createdAt}</Text>
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

//모달창 CSS
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 225px;
  width: 25rem;
  height: 225px;
  background: #ffffff;
  border-radius: 10px;
  text-align: center;
`;
export default FreeBoardDetail;
