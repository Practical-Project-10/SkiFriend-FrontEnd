import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { chatCreators as chatActions } from "../redux/modules/chat";

import Header from "../components/Header";

import { Grid, Text, Button } from "../elements/index";
import { history } from "../redux/ConfigStore";

const ChatList = (props) => {
  const dispatch = useDispatch();
  const chatRoomList = useSelector((state) => state.chat.roomList);
  const is_login = localStorage.getItem("is_login") === "true" ? true : false;
  const certification =
    localStorage.getItem("certification") === "true" ? true : false;
  //채팅방 목록으로 나타내기
  useEffect(() => {
    if (!is_login) {
      const ask = window.confirm(
        "로그인 후 이용 가능한 서비스 입니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (ask) {
        return history.push("/login");
      } else {
        return history.goBack();
      }
    }

    if (!certification) {
      const ask = window.confirm(
        "휴대폰 인증 후 이용 가능한 서비스 입니다. 인증하시겠습니까?"
      );
      if (ask) {
        return history.push("/profilewrite");
      } else {
        return history.goBack();
      }
    }

    dispatch(chatActions.getListChatDB());
  }, []);

  //채팅목록에서 클릭한 채팅방 대화내용 가져오기
  const EnterChatRoom = (roomId, roomName) => {
    history.push(`/chatroom/${roomId}/${roomName}`);
  };
  //채팅방 나가기(삭제하기)
  const chatRoomExit = (roomId) => {
    const ask = window.confirm(
      "해당 채팅방을 나가면 이전 대화 내용이 모두 사라집니다. 정말 나가시겠습니까?"
    );
    if (ask) {
      return dispatch(chatActions.chatRoomDeleteDB(roomId));
    }
  };

  return (
    <React.Fragment>
      <Grid>
        <Header>채팅목록</Header>
        <Grid
          bg="#FFF"
          height="675px"
          radius="22px 22px 0 0"
          padding="26px 0 0 0"
          overflow="scroll"
          minHeight="calc( 100vh - 124px )"
        >
          {chatRoomList.map((list) => {
            return (
              <Grid
                is_flex
                justify="space-between"
                padding="10px"
                cursor="pointer"
                hoverOpacity="0.8"
                hoverBg="aliceblue"
                key={list.roomId}
              >
                <Grid
                  is_flex
                  _onClick={() => {
                    EnterChatRoom(list.roomId, list.roomName);
                  }}
                >
                  <Grid
                    src={list.userProfile}
                    width="50px"
                    height="50px"
                    radius="50%"
                    border="2px solid #6195CF"
                    margin="0 10px 0 0"
                  ></Grid>
                  <Grid>
                    <Text
                      color="black"
                      size="14px"
                      bold
                      padding="2px 0"
                      margin="0"
                    >
                      {list.roomName}
                    </Text>
                    <Text
                      width="200px"
                      size="16px"
                      padding="2px 0"
                      margin="0"
                      color="#999"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {list.lastMsg}
                    </Text>
                  </Grid>
                </Grid>
                {/* 안읽은 메세지 표시 */}
                <Grid align="end">
                  <Button smallBtn _onClick={() => chatRoomExit(list.roomId)}>
                    채팅방 나가기
                  </Button>
                  <Grid is_flex align="center">
                    {list.notVerifiedMsgCnt > 0 && (
                      <Text
                        width="25px"
                        height="25px"
                        bold
                        bg="red"
                        color="white"
                        size="13px"
                        radius="50%"
                      >
                        {list.notVerifiedMsgCnt}
                      </Text>
                    )}
                    <Text size="11px" height="15px" margin="0 5px">
                      {list.lastMsgTime}
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ChatList;
