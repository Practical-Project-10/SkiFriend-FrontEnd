import React from "react";

import styled from "styled-components";
import { Grid, Text, Image } from "../elements/index";

import modal from "../assets/modal.svg";
import defaultIMG from "../assets/myPage/profilePicture.png";

const Modal = (props) => {
  const { page, complete } = props;

  if (page === 'board' || page === 'shorts') {
    return (
      <ModalBackground onClick={props.closeModal} radius={props.radius}>
        <ModalContainer width={props.width} height={props.height}>
          <Menu>
            <Image src={modal} width="25px" height="25px" margin="0 auto" />
          </Menu>
          <Menu
            fontS={props.fontS}
            padding={props.padding}
            onClick={props.edit}
          >
            수정하기
          </Menu>
          <Menu
            fontS={props.fontS}
            padding={props.padding}
            onClick={props.delete}
          >
            삭제하기
          </Menu>
          <Menu
            fontS={props.fontS}
            padding={props.padding}
            opacity="0.5"
            onClick={props.closemodal}
          >
            취소
          </Menu>
        </ModalContainer>
      </ModalBackground>
    )
  }

  if (page === 'profile') {
    return (
      <ModalBackground onClick={props.closeModal}>
        <ModalContainer
          height={props.height}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 프로필사진정보 */}
          <Grid>
            <Image
              src={props.profileImg ? props.profileImg : defaultIMG}
              margin="0 auto"
              width="95px"
              height="95px"
              radius="50%"
              size="cover"
              border="1px solid #000"
            />
          </Grid>

          {/* 닉네임정보 */}
          <Text block bold size="20px" color="#6195cf" margin="8px 0">
            {props.nickname}
          </Text>

          {/* 성별정보 */}
          <Grid is_flex margin="5px 0" justify="center">
            <Small>
              <Text bold size="16px" color="#FFF" margin="0 10px">
                {props.gender ? props.gender : "미등록"}
              </Text>
            </Small>
            {/* 나이정보 */}
            <Small>
              <Text bold size="16px" color="#FFF" margin="0 10px">
                {props.ageRange ? props.ageRange : "미등록"}
              </Text>
            </Small>
            {/* 경력정보 */}
            <Small>
              <Text bold size="16px" color="#FFF" margin="0 10px">
                {props.career ? props.career : "미등록"}
              </Text>
            </Small>
          </Grid>
          {/* 자기소개정보 */}
          <Text block margin="5px 0" size="16px">
            {props.selfIntro ? props.selfIntro : "미등록"}
          </Text>
          <Menu>
            <Text
              _onClick={props.closeModal}
              size="16px"
              opacity="0.5"
              cursor="pointer"
            >
              닫기
            </Text>
          </Menu>
        </ModalContainer>
      </ModalBackground>
    );
  }

  return (
    <React.Fragment>
      <ModalBackground onClick={props.closeModal} radius={props.radius}>
        {/* 모집완료 후 뜨는 모달 */}
        {complete ? (
          <ModalContainer width={props.width} height={props.height}>
            <Menu>
              <Image src={modal} width="25px" height="25px" margin="0 auto" />
            </Menu>
            <Menu
              fontS={props.fontS}
              padding={props.padding}
              onClick={props._onClick}
            >
              모집 해제
            </Menu>
            <Menu
              fontS={props.fontS}
              padding={props.padding}
              onClick={props.delete}
            >
              삭제하기
            </Menu>
            <Menu
              fontS={props.fontS}
              padding={props.padding}
              opacity="0.5"
              onClick={props.closemodal}
            >
              취소
            </Menu>
          </ModalContainer>
        ) : (
          // 모집완료 전 뜨는 모달
          <ModalContainer width={props.width} height={props.height}>
            <Menu padding={props.padding}>
              <Image src={modal} width="25px" height="25px" margin="0 auto" />
            </Menu>
            <Menu
              fontS={props.fontS}
              padding={props.padding}
              onClick={props.edit}
            >
              수정하기
            </Menu>

            <Menu
              fontS={props.fontS}
              padding={props.padding}
              onClick={props.delete}
            >
              삭제하기
            </Menu>
            {/* {_onClick ? ( */}
            <Menu
              fontS={props.fontS}
              padding={props.padding}
              onClick={props._onClick}
            >
              모집 완료
            </Menu>
            {/* ) : null} */}
            <Menu
              fontS={props.fontS}
              padding={props.padding}
              opacity="0.5"
              onClick={props.closemodal}
            >
              취소
            </Menu>
          </ModalContainer>
        )}
      </ModalBackground>
    </React.Fragment>
  );
};

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  border-radius: ${(props) => (props.radius ? props.radius : "")};
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
`;

const ModalContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "372px")};
  height: ${(props) => (props.height ? props.height : "256px")};
  padding: 0 17px;
  background: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const Menu = styled.div`
  padding: ${(props) => (props.padding ? props.padding : "5px")};
  border-bottom: 1px solid #edeeef;
  font-size: ${(props) => (props.fontS ? props.fontS : "16px")};
  font-weight: 700;
  cursor: pointer;
  opacity: ${(props) => props.opacity};

  &:first-child {
    border-bottom: none;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Small = styled.div`
  height: 22px;
  margin-right: 5px;
  background: #6195cf;
  border-radius: 140px;
  text-align: center;
  line-height: 21px;

  &:last-child {
    margin: 0;
  }
`;

export default Modal;
