import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { chatCreators as chatActions } from "../redux/modules/chat";

import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import MessageBox from "../components/MessageBox";
import Header from "../components/Header";
import ChatRoomCard from "../components/ChatRoomCard";
//icons
import { Grid, Input } from "../elements/index";
import sendBtn from "../assets/chat/send.png";

const ChatRoom = () => {
  // const dispatch = useDispatch;
  // const datas = useSelector((state) => state.chat.chatList);
  // const phoneInfo = useSelector((state) => state.chat.phoneInfo);
  // const roomInfo = useSelector((state) => state.chat.roomInfo);
  const params = useParams();
  const roomId = params.roomId;
  const roomName = params.roomName;
  const scrollRef = useRef();

  //토큰
  const accessToken = document.cookie.split("=")[1];
  const token = { Authorization: `${accessToken}` };

  //소켓
  const sock = new SockJS("https://seongeunyang.shop/ws-stomp");
  const stomp = Stomp.over(sock);

  // useState관리
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);
  const messageDatas = (recv) => {
    setMessageList((prev) => [...prev, recv]);
  };
  //메세지 내용
  const messageChat = (e) => {
    const content = e.target.value;
    setMessage(content);
  };

  //채팅룸 연결
  React.useEffect(() => {
    chatConnect();
    // dispatch(chatActions.connectChatDB(roomId));
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
            messageDatas(responseData);
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

  // 대화내용 가져오기
  React.useEffect(() => {
    axios
      .get(`https://seongeunyang.shop/chat/message/${roomId}`, {
        headers: token,
      })
      .then((res) => {
        const prevChatData = res.data;
        // console.log("response : ", prevChatData);
        setMessageList(prevChatData);
      });
    // dispatch(chatActions.getContentChatDB(roomId));
  }, []);

  //엔터치면 메세지 보내지게 하기
  const onKeyPress = (e) => {
    if (e.key === "Enter" && message.replace(/\s|/gi, "").length !== 0) {
      sendMessage();
    }
  };

  //메세지 보내기
  const sendMessage = async () => {
    if (message.replace(/\s|/gi, "").length !== 0) {
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
    }
  };

  //전화번호 정보받기
  const getPhoneNum = () => {
    axios
      .get(`https://seongeunyang.shop/user/info/phoneNum`, { headers: token })
      .then((res) => {
        // dispatch(chatActions.getPhoneNumDB());
        // setPhoneInfo(res.data.phoneNumber);
        showPhoneNum(res.data.phoneNumber);
      });
  };
  //전화번호 보여주기
  const showPhoneNum = async (phoneInfo) => {
    const datas = {
      type: "PHONE_NUM",
      roomId: roomId,
      message: "전화번호 공개" + phoneInfo,
    };
    await stomp.send("/pub/chat/message", token, JSON.stringify(datas));
    //메세지 보내면 스크롤 자동내림
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
    // dispatch(chatActions.sendChatDB(roomId, message));
  };

  //방정보 가져오기
  React.useEffect(() => {
    axios
      .get(`https://seongeunyang.shop/chat/room/${roomId}/carpool`, {
        headers: token,
      })
      .then((res) => {
        console.log("불러오기 성공");
        setRoomInfo(res.data);
        // dispatch(chatActions.getRoomInfo(res.data));
      });
    // dispatch(chatActions.getRoomInfoDB(roomId));
  }, []);
  console.log(roomInfo);
  return (
    <React.Fragment>
      {/* 상단부  */}
      <Grid>
        <Header goBack phone fixed _onClick={getPhoneNum}>
          {roomName}
        </Header>
        <Grid
          margin="54px 0 0 0"
          minHeight="calc( 100vh - 124px )"
          display="flex"
          direction="column"
        >
          <ChatRoomCard roomInfo={roomInfo} />
          <Grid phoneSize height="532px" overflow="scroll">
            <div style={{ padding: "0 0 70px 0" }} ref={scrollRef}>
              {/* 채팅말풍선 */}
              {messageList.map((msg, idx) => {
                return <MessageBox key={"message" + idx} chatInfo={msg} />;
              })}
            </div>
          </Grid>
          {/* 하단부 버튼들 */}

          <Grid height="100%" bg="#474D56">
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
            <Grid is_flex padding="20px 16px">
              <Input
                free
                width="100%"
                height="40px"
                radius="40px"
                autocomplete="off"
                _value={message}
                _onKeyPress={onKeyPress}
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
