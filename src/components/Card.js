import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { history } from "../redux/ConfigStore";
import { carpoolActions } from "../redux/modules/carpool";
import { chatCreators as chatActions } from "../redux/modules/chat";

import Modal from "../components/Modal";

import styled from "styled-components";
import { Grid, Text, Image } from "../elements/index";
import arrow from "../assets/carpoolList/arrow_icon.svg";
import calendar from "../assets/carpoolList/calendar_icon.svg";
import clock from "../assets/carpoolList/clock_icon.svg";
import person from "../assets/carpoolList/person_icon.svg";
import price from "../assets/carpoolList/price_icon.svg";
import etc from "../assets/etc_icon.svg";

const Card = (props) => {
  const { noCard, page } = props;
  const dispatch = useDispatch();
  const is_login = localStorage.getItem("is_login") === "true" ? true : false;
  const certification =
    localStorage.getItem("certification") === "true" ? true : false;
  const repuest = props.carpoolType === "카풀 요청";
  const nickname = localStorage.getItem("nickname");
  const is_mine = props.nickname === nickname;
  
  //------useState관리-------
  const [showmodal, setShowModal] = useState(false);

  //-------Modal-------
  const closemodal = () => {
    setShowModal(false);
  };

  //카풀 수정
  const editCard = () => {
    if (page === "myPage") {
      return history.push(`/carpoolwrite/${page}/${props.postId}`);
    }
    history.push(`/carpoolwrite/${props.skiResort}/${props.postId}`);
  };

  //카풀 삭제
  const deleteCard = () => {
    if (page === "myPage") {
      dispatch(
        carpoolActions.deleteCarpoolDB(props.skiResort, props.postId, page)
      );
      return null;
    }
    dispatch(carpoolActions.deleteCarpoolDB(props.skiResort, props.postId));
  };

  //카풀 모집완료
  const completeCard = () => {
    if (page === "myPage") {
      dispatch(
        carpoolActions.completeCarpoolDB(props.skiResort, props.postId, page)
      );
      return null;
    }
    dispatch(carpoolActions.completeCarpoolDB(props.skiResort, props.postId));
  };

  //연락하기 기능
  const connectRoom = (postId) => {
    if (!is_login) {
      const ask = window.confirm(
        "로그인한 회원만 사용 가능합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (ask) {
        return history.push(`/login`);
      } else {
        return;
      }
    }
    if (!certification) {
      const ask = window.confirm(
        "휴대폰 인증한 회원만 사용 가능합니다. 인증하시겠습니까?"
      );
      if (ask) {
        return history.push(`/profilewrite`);
      } else {
        return;
      }
    }
    return dispatch(chatActions.makeRoomChatDB(postId));
  };

  //내가 작성한 카풀카드가 없을 때 --- 마이페이지
  if (noCard) {
    return (
      <Grid height="165px">
        <NotLogin>작성한 내역이 없어요!</NotLogin>
      </Grid>
    );
  }

  //내가 작성한 카풀카드 --- 마이페이지
  if (page === "myPage") {
    return (
      <React.Fragment>
        <CarpoolCard
          width="185px"
          height="165px"
          padding="12px"
          repuest={repuest}
          status={!props.status}
        >
          <Grid>
            <Text bold size="12px" color={repuest ? "#7281D1" : "#6195CF"}>
              {props.carpoolType}
            </Text>
          </Grid>
          <Text block bold width="239px" size="16px">
            {props.title}
          </Text>
          <Posts width="90%" height="30px" margin="7px 0">
            <Text bold size="12px">
              {props.startLocation}
            </Text>
            <Image src={arrow} width="50px" height="10px" />
            <Text bold size="12px" color={repuest ? "#7281D1" : "#6195CF"}>
              {props.endLocation}
            </Text>
          </Posts>
          <Grid>
            <SmallItems repuest={repuest}>
              <Image src={calendar} width="12px" height="15px" />
              <Text size="12px">{props.date}</Text>
            </SmallItems>
            <SmallItems repuest={repuest} width="61px">
              <Image src={clock} width="12px" height="15px" />
              <Text size="12px">{props.time}</Text>
            </SmallItems>
            <SmallItems repuest={repuest} width="61px">
              <Image src={price} width="12px" height="15px" />
              <Text size="12px">{props.price}원</Text>
            </SmallItems>
          </Grid>
          {props.status ? (
            <Grid is_flex>
              {/* 게시글 수정 삭제 modal 시작 */}
              {/* 게시글을 조회한사람이 작성한 사람과 일치할 경우 모달 선택창이 보이게 하기 */}
              <SubMenu
                width="27px"
                height="27px"
                line="41px"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <Image src={etc} width="27px" height="27px" />
              </SubMenu>
            </Grid>
          ) : (
            <Grid>
              {is_mine ? (
                <SubMenu width="27px" height="27px" line="41px">
                  <Grid
                    _onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    <Image src={etc} width="27px" height="27px" />
                  </Grid>
                </SubMenu>
              ) : null}
            </Grid>
          )}
        </CarpoolCard>
        {showmodal ? (
          <Modal
            page={page}
            complete={!props.status ? true : false}
            width="179px"
            height="146px"
            radius="15px"
            padding="5px"
            fontS="14px"
            closeModal={closemodal}
            edit={editCard}
            delete={deleteCard}
            _onClick={completeCard}
          />
        ) : null}
      </React.Fragment>
    );
  }

  // 카풀페이지
  return (
    <React.Fragment>
      <CarpoolCard
        repuest={repuest}
        status={!props.status}
        border={props.border}
      >
        <Grid>
          <Grid margin="0 0 3px">
            <Text bold color={repuest ? "#7281D1" : "#6195CF"}>
              {props.carpoolType}
            </Text>
          </Grid>
          <Text bold size="20px">
            {props.title}
          </Text>

          <Posts width="100%">
            <Text bold>{props.startLocation}</Text>
            <Image src={arrow} width="50px" height="10px" />
            <Text bold color={repuest ? "#7281D1" : "#6195CF"}>
              {props.endLocation}
            </Text>
          </Posts>

          <Grid is_flex width="100%" justify="space-between" margin="0 0 7px">
            <Items repuest={repuest} width="101px">
              <Image src={calendar} width="11px" height="15px" />
              <Text size="12px" color="#FFF">
                {props.date}
              </Text>
            </Items>
            <Items repuest={repuest} width="61px">
              <Image src={clock} width="11px" height="15px" />
              <Text size="12px" color="#FFF">
                {props.time}
              </Text>
            </Items>
            <Items repuest={repuest} width="49px">
              <Image src={person} width="11px" height="15px" />
              <Text size="12px" color="#FFF">
                {props.memberNum}명
              </Text>
            </Items>
            <Items repuest={repuest} width="80px">
              <Image src={price} width="11px" height="15px" />
              <Text size="12px" color="#FFF">
                {props.price}원
              </Text>
            </Items>
          </Grid>

          <Text>
            <span style={{ fontWeight: "700" }}>주의사항</span> : {props.notice}
          </Text>
        </Grid>

        {props.status ? (
          <Grid is_flex>
            {/* 게시글 수정 삭제 modal 시작 */}
            {/* 게시글을 조회한사람이 작성한 사람과 일치할 경우 모달 선택창이 보이게 하기 */}
            {is_mine ? (
              <SubMenu width="27px" height="27px" line="41px">
                <Grid
                  _onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <Image src={etc} width="27px" height="27px" />
                </Grid>
              </SubMenu>
            ) : (
              <SubMenu width="78px" height="27px" line="29px">
                <Text
                  bold
                  color={repuest ? "#7281D1" : "#6195CF"}
                  _onClick={() => {
                    connectRoom(props.postId);
                  }}
                >
                  연락하기&gt;
                </Text>
              </SubMenu>
            )}
          </Grid>
        ) : (
          <Grid>
            {is_mine ? (
              <SubMenu width="27px" height="27px" line="41px">
                <Grid
                  _onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <Image src={etc} width="27px" height="27px" />
                </Grid>
              </SubMenu>
            ) : null}
          </Grid>
        )}
      </CarpoolCard>
      {showmodal ? (
        <Modal
          complete={!props.status ? true : false}
          height={!props.status ? "198px" : "256px"}
          closeModal={closemodal}
          edit={editCard}
          delete={deleteCard}
          _onClick={completeCard}
        />
      ) : null}
    </React.Fragment>
  );
};

const CarpoolCard = styled.div`
  height: ${(props) => (props.height ? props.height : "173px")};
  background: ${(props) => (props.repuest ? "#D3DBEE" : "#D9E4EE")};
  border-radius: 15px;
  padding: ${(props) => (props.padding ? props.padding : "16px")};
  position: relative;

  &::before {
    content: "";
    width: ${(props) => (props.status ? "100%" : "")};
    height: ${(props) => (props.status ? "100%" : "")};
    border-radius: ${(props) => (props.status ? "15px" : "")};
    background: ${(props) => (props.status ? "rgba(0,0,0,0.5)" : "")};
    position: ${(props) => (props.status ? "absolute" : "")};
    top: ${(props) => (props.status ? 0 : "")};
    left: ${(props) => (props.status ? 0 : "")};
  }
`;

const Posts = styled.div`
  width: ${(props) => (props.width ? props.width : "275px")};
  height: 30px;
  margin: ${(props) => (props.margin ? props.margin : "10px 0 12px")};
  background: #fff;
  border: 1px solid #6195cf;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Items = styled.div`
  width: ${(props) => props.width};
  height: 22px;
  padding: 0 4px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: ${(props) => (props.repuest ? "#7281D1" : "#6195CF")};
  color: #fff;
`;

const SmallItems = styled.div`
  height: 22px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;
`;

const SubMenu = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  line-height: ${(props) => props.line};
  text-align: center;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.1);
  }
`;

const NotLogin = styled.div`
  width: 185px;
  height: 160px;
  margin: 12px 0;
  background: #ededee;
  border-radius: 10px;
  color: #474d56;
  font-weight: 700;
  font-size: 13px;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Card;
