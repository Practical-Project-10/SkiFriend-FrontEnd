import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatCreators as chatActions } from "../redux/modules/chat";

import { Grid, Image, Text } from "../elements/index";
import { history } from "../redux/ConfigStore";
import { multiply } from "lodash";

const ChatList = (props) => {
  const dispatch = useDispatch();
  const chatRoomList = useSelector((state) => state.chat.roomList);
  console.log(chatRoomList);
  const is_login = localStorage.getItem("is_login");

  //채팅방 목록으로 나타내기
  React.useEffect(() => {
    if (!is_login) {
      window.alert("로그인한 회원만 이용가능 합니다.");
      return history.push(`/`);
    }
    dispatch(chatActions.getListChatDB());
  }, []);

  //채팅목록에서 클릭한 채팅방 대화내용 가져오기
  const EnterChatRoom = (roomId, longRoomId) => {
    history.push(`/chatroom/${roomId}/${longRoomId}`);
  };

  return (
    <React.Fragment>
      <Grid>
        <Grid header2>채팅목록</Grid>
        <Grid
          bg="#FFF"
          height="675px"
          radius="22px 22px 0 0"
          padding="26px 0 0 0"
          overflow="scroll"
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
                _onClick={() => {
                  EnterChatRoom(list.roomId, list.longRoomId);
                }}
              >
                <Grid is_flex>
                  {/* asd */}
                  <Grid
                    src={list.userProfile}
                    width="40px"
                    height="40px"
                    radius="50%"
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
                    <Text size="16px" padding="2px 0" margin="0" color="#999">
                      {list.lastMsg}
                    </Text>
                  </Grid>
                </Grid>
                <Grid>
                  <Text size="11px" height="15px">
                    {list.lastMsgTime}
                  </Text>
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
