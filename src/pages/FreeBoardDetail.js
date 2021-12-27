import React, { useState } from "react";
import styled from "styled-components";

import { Grid, Button, Input, Text } from "../elements/index";

//react icons
import { GrFormPrevious } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const FreeBoardDetail = () => {
  //------useState관리-------
  const [showModal, setShowModal] = useState();

  //-------Modal-------
  const CloseModal = () => {
    setShowModal(false);
  };

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
          <Grid
            cursor="pointer"
            _onClick={() => {
              showModal(true);
            }}
          >
            <BiDotsHorizontalRounded />
          </Grid>
          <div showModal={showModal} closeModal={CloseModal}></div>
          {showModal ? (
            <Background onClick={CloseModal}>
              <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Text>프로필 사진 바꾸기</Text>

                <Text color="#ed4956">삭제</Text>
                <Text _onClick={CloseModal} padding="15px 0" cursor="pointer">
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
