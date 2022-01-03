import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatCreators as chatActions } from "../redux/modules/chat";
import { history } from "../redux/ConfigStore";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { Grid, Button, Text, Input } from "../elements/index";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.chat.list);
  console.log(datas);
  const roomId = localStorage.getItem("roomId");

  //채팅룸
  React.useEffect(() => {
    if (datas.length === 0) {
      dispatch(chatActions.getContentChatDB(roomId));
    }
      dispatch(chatActions.connectChatDB(roomId));
  });

  //채팅방 나가기
  const exitChatRoom = () => {
    localStorage.removeItem("roomId");
    history.push("/chatlist");
  };
  return (
    <>
      {/* 상단부  */}
      <Grid
        borderB="1px solid #CACACA"
        is_flex
        padding="10px"
        margin="0 0 20px 0"
      >
        <Text margin="0 auto">채팅</Text>
      </Grid>
      <AiOutlineArrowLeft
        onClick={exitChatRoom}
        style={{ cursor: "pointer" }}
        size="30"
      />

      {/* 채팅이 들어갈 공간 */}
      <Grid height="300px">
        {/* 채팅말풍선 */}
        <Grid borderB=" 1px solid #d1d1d1" justify="flex-end">
          <Input></Input>
        </Grid>
      </Grid>
      {/* 하단부 버튼들 */}
      <Grid>
        <Grid
          justify="flex-end"
          bg="#414141"
          borderB="1px solid #fff"
          padding="5px"
        >
          <Button width="20%">이미지업로드버튼</Button>
        </Grid>
        <Grid justify="flex-end" bg="#414141" padding="20px" align="right">
          <Button width="30%" padding="20px">
            전송
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ChatRoom;
