import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatCreators as chatActions } from "../redux/modules/chat";
import { history } from "../redux/ConfigStore";
import { useParams } from "react-router-dom";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import MessageBox from "../components/MessageBox";
//icons
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Grid, Button, Text, Input } from "../elements/index";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.chat.chatList);
  console.log(datas);
  const params = useParams();
  const roomId = params.roomId;

  //토큰
  const accessToken = document.cookie.split("=")[1];
  const token = { Authorization: `${accessToken}` };

  //소켓
  const sock = new SockJS("http://13.125.35.82/ws-stomp");
  const stomp = Stomp.over(sock);

  // useState관리
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  //메세지 내용
  const messageChat = (e) => {
    const content = e.target.value;
    setMessage(content);
  };

  //응답받을 메세지
  const respondMSG = (content) => {
    setMessageList((prev) => [content, ...prev]);
  };

  //메세지 보내기
  const sendMessage = async () => {
    const datas = { type: "TALK", roomId: roomId, message: message };
    await stomp.send("/pub/chat/message", token, JSON.stringify(datas));
    // dispatch(chatActions.sendChatDB(roomId, message));
    setMessage("");
  };

  //채팅룸 연결, 대화내용 가져오기
  React.useEffect(() => {
    chatConnect();
    // dispatch(chatActions.connectChatDB(roomId));
    dispatch(chatActions.getContentChatDB(roomId));

    return () => {
      chatDisconnect();
    };
  }, []);

  // stomp연결
  const chatConnect = () => {
    try {
      stomp.connect(token, () => {
        stomp.subscribe(
          `/sub/chat/room/${roomId}`,
          (message) => {
            const responseData = JSON.parse(message.body);
            console.log(responseData);
            dispatch(chatActions.addChat(responseData));
          },
          token
        );
      });
    } catch (err) {
      console.log(err);
    }
  };
  // stomp 연결해제
  const chatDisconnect = () => {
    try {
      stomp.disconnect(() => {
        stomp.unsubscribe("sub-0");
      }, token);
    } catch (err) {
      console.log(err);
    }
  };

  //채팅방 나가기
  const exitChatRoom = () => {
    history.push("/chatlist");
    chatDisconnect();
  };
  console.log(message);

  return (
    <React.Fragment>
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
        onClick={() => {
          history.push("/chatlist");
        }}
        style={{ cursor: "pointer" }}
        size="30"
      />
      {/* 채팅이 들어갈 공간 */}
      <Grid height="300px">
        {/* 채팅말풍선 */}
        {datas.map((msg) => {
          return <MessageBox chatInfo={msg} />;
        })}
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
          <Input _onChange={messageChat}></Input>
          <Button width="30%" padding="20px" _onClick={sendMessage}>
            전송
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ChatRoom;
