import React from "react";

import styled from "styled-components";
import { Grid, Text, Image } from "../elements/index";

import modal from "../assets/modal.svg"
import defaultIMG from "../assets/myPage/profilePicture.png";

const Modal = (props) => {
  const {profile} = props;

  if(profile) {
    return(
      <Grid className="modalBackground" _onClick={props.closeModal}>
        <Grid
          className="modalContainer"
          _onClick={(e) => e.stopPropagation()}
        >
          {/* 프로필사진정보 */}
          <Grid>
            <Image
              src={props.profileImg? props.profileImg: defaultIMG}
              margin="0 auto"
              width="95px"
              height="95px"
              radius="50%"
              size="cover"
              border='1px solid #000'
            />
          </Grid>

          {/* 닉네임정보 */}
          <Text size="20px" margin="0 10px">
            닉네임: {props.nickname}
          </Text>

            {/* 성별정보 */}
          <Menu is_flex margin="10px 0" justify="center">
            <Text size="20px" margin="0 10px">
              성별: {props.gender? props.gender: '미등록'}
            </Text>
            {/* 나이정보 */}
            <Text size="20px" margin="0 10px">
              나이: {props.ageRange? props.ageRange: '미등록'}
            </Text>
            {/* 경력정보 */}
              <Text size="20px" margin="0 10px">
                경력: {props.career? props.career: '미등록'}
              </Text>
          </Menu>
          <Grid is_flex justify="center">
            {/* 자기소개정보 */}
            <Text size="15px">자기소개: {props.selfIntro? props.selfIntro: '미등록'}</Text>
          </Grid>
          <Menu>
            <Text
              // _onClick={props.closemodal}
              // size="16px"
              // opacity='0.5'
              // cursor="pointer"
              size="20px"
              padding="30px 0 0 0"
              cursor="pointer"
              _onClick={props.closeModal}
            >
              닫기
            </Text>
          </Menu>
        </Grid>
      </Grid>
    )
  }

  return (
    <React.Fragment>
      <ModalBackground onClick={props.closeModal}>
        <ModalContainer height={props.height}>
          <Menu>
            <Image src={modal} width="25px" height="25px" margin='0 auto' />
          </Menu>
          <Menu>
            <Text
              bold
              size="16px"
              cursor="pointer"
              _onClick={props.edit}
            >
              수정하기
            </Text>
          </Menu>
          <Menu>
            <Text
              bold
              size="16px"
              cursor="pointer"
              _onClick={props.delete}
            >
              삭제하기
            </Text>
          </Menu>
          {props._onClick
          ? <Menu>
              <Text
                bold
                size="16px"
                cursor="pointer"
                _onClick={props._onClick}
              >
                모집 완료
              </Text>
            </Menu>
          : null
          }
          <Menu>
            <Text
              _onClick={props.closemodal}
              size="16px"
              opacity='0.5'
              cursor="pointer"
            >
              취소
            </Text>
          </Menu>
        </ModalContainer>
      </ModalBackground>
    </React.Fragment>
  )
}

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
`;

const ModalContainer = styled.div`
  width: 372px;
  height: ${props => props.height};
  padding: 0 17px;
  background: #FFF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const Menu = styled.div`
  padding: 15px;
  border-bottom: 1px solid #edeeef;

  &:first-child {
    border-bottom: none;
  }

  &:last-child {
    border-bottom: none;
  }
`

// const

export default Modal