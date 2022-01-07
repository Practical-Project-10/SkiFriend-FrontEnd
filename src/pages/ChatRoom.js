import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { chatCreators as chatActions } from "../redux/modules/chat";

import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import MessageBox from "../components/MessageBox";
import Header from "../components/Header";
//icons
import { Grid, Input } from "../elements/index";
import sendBtn from "../assets/chat/send.png";

const ChatRoom = () => {
  const dispatch = useDispatch;
  // const datas = useSelector((state) => state.chat.chatList);
  const params = useParams();
  const roomId = params.roomId;
  const roomName = params.roomName;
  const scrollRef = useRef();

  //토큰
  const accessToken = document.cookie.split("=")[1];
  const token = { Authorization: `${accessToken}` };

  //소켓
  const sock = new SockJS("http://3.34.52.2:8080/ws-stomp");
  const stomp = Stomp.over(sock);

  // useState관리
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messageDatas = (recv) => {
    setMessageList((prev) => [...prev, recv]);
  };

  //메세지 내용
  const messageChat = (e) => {
    const content = e.target.value;
    setMessage(content);
  };

  //메세지 보내기
  const sendMessage = async () => {
    const datas = {
      type: "TALK",
      roomId: roomId,
      message: message,
    };
    await stomp.send("/pub/chat/message", token, JSON.stringify(datas));
    //메세지 보내면 스크롤 자동내림
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
    // dispatch(chatActions.sendChatDB(roomId, message));
    setMessage("");
  };
  //채팅룸 연결
  React.useEffect(() => {
    chatConnect();
    // dispatch(chatActions.connectChatDB(roomId));

    return () => {
      chatDisconnect();
    };
  }, []);

  // 대화내용 가져오기
  React.useEffect(() => {
    axios
      .get(`http://3.34.52.2:8080/chat/message/${roomId}`, { headers: token })
      .then((res) => {
        const prevChatData = res.data;
        // console.log("response : ", prevChatData);
        setMessageList(prevChatData);
      });
    // dispatch(chatActions.getContentChatDB(roomId));
  }, []);

  // stomp연결
  const chatConnect = () => {
    try {
      stomp.connect(token, () => {
        stomp.subscribe(
          `/sub/chat/room/${roomId}`,
          (message) => {
            const responseData = JSON.parse(message.body);
            messageDatas(responseData);
            // dispatch(chatActions.addChat(responseData));
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

  const showPhoneNum = () => {
    
    // dispatch(chatActions.getPhoneNumDB());
  };

  return (
    <React.Fragment>
      {/* 상단부  */}
      <Grid>
        <Header goBack phone _onClick={showPhoneNum}>
          {roomName}
        </Header>{" "}
        {/* 리덕스에서 데이터 불러와서 sender 넣으면 됩니다. */}
        <Grid
          margin="0 0 70px 0"
          minHeight="calc( 100vh - 124px )"
          display="flex"
          direction="column"
          justify="space-between"
        >
          {/* 채팅이 들어갈 공간 */}
          <Grid height="518px" overflow="scroll">
            <div ref={scrollRef}>
              {/* 채팅말풍선 */}
              {messageList.map((msg) => {
                return <MessageBox chatInfo={msg} />;
              })}
            </div>
          </Grid>
          {/* 하단부 버튼들 */}
          <Grid height="220px" bg="#474D56">
            {/* <Grid justify="flex-end" borderB="1px solid #fff" padding="5px">
              <Grid
                align="center"
                width="45px"
                height=" 24px"
                radius="33px"
                bg="#ffffff"
                cursor="pointer"
                // _onClick={uploadPhoto}
              >
                <AiOutlineCamera size="20" />
              </Grid>
            </Grid> */}
            <Grid is_flex padding="20px">
              <Input
                free
                width="360px"
                height="40px"
                radius="40px"
                _value={message}
                _onChange={messageChat}
              />
              <Grid
                src={sendBtn}
                width="30px"
                height="30px"
                bg="#6195CF"
                radius="50%"
                margin="0 -40px 0"
                cursor="pointer"
                _onClick={sendMessage}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ChatRoom;
