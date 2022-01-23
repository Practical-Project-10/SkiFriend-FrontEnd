import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { chatCreators as chatActions } from "../redux/modules/chat";
import styled from "styled-components";
import axios from "axios";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import MessageBox from "../components/MessageBox";
import Header from "../components/Header";
import ChatRoomCard from "../components/ChatRoomCard";
//icons
import { Grid, Input, Image } from "../elements/index";
import sendBtn from "../assets/send.svg";

const ChatRoom = () => {
  const dispatch = useDispatch();
  //경로
  const params = useParams();
  const roomId = params.roomId;
  const roomName = params.roomName;
  const scrollRef = useRef();
  //redux 데이터
  // const datas = useSelector((state) => state.chat.chatList);
  const phoneInfo = useSelector((state) => state.chat.phoneInfoList);
  const roomInfoList = useSelector((state) => state.chat.roomInfoList);
  //토큰
  const accessToken = document.cookie.split("=")[1];
  const token = { Authorization: `${accessToken}` };
  // useState관리
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [stomp, setStomp] = useState();
  // 쌓인 대화
  const messageDatas = (recv) => {
    setMessageList((prev) => [...prev, recv]);
  };
  //메세지 내용
  const messageChat = (e) => {
    const content = e.target.value;
    setMessage(content);
  };

  useEffect(() => {
    //소켓
    const sock =
      new SockJS("https://seongeunyang.shop/ws-stomp");
      // new SockJS("http://3.34.19.50:8080/ws-stomp");
    setStomp(Stomp.over(sock));
    dispatch(chatActions.getRoomInfoDB(roomId)); //방정보 가져오기
  }, []);

  useEffect(() => {
    chatConnect(); //채팅룸 연결
    return () => {
      chatDisconnect();
    };
  }, [stomp]);

  // 대화내용 가져오기
  useEffect(() => {
    axios
      // https://seongeunyang.shop/    http://3.34.19.50:8080/
      .get(` https://seongeunyang.shop/chat/message/${roomId}`, {
        headers: token,
      })
      .then((res) => {
        const prevChatData = res.data;
        setMessageList(prevChatData);
      });
    setTimeout(() => {
      scrollMoveBottom(); //스크롤 다운
    }, 100);
    // dispatch(chatActions.getContentChatDB(roomId));
  }, []);

  // stomp연결
  const chatConnect = () => {
    try {
      stomp.debug = null;
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
      // console.log(err);
    }
  };

  // stomp 연결해제
  const chatDisconnect = () => {
    try {
      stomp.debug = null;
      stomp.disconnect(() => {
        stomp.unsubscribe("sub-0");
      }, token);
    } catch (err) {
      // console.log(err);
    }
  };

  //엔터치면 메세지 보내지게하기
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
      stomp.debug = null;
      await stomp.send("/pub/chat/message", token, JSON.stringify(datas));
      scrollMoveBottom(); //스크롤 다운
      // dispatch(chatActions.sendChatDB(roomId, message));
      setMessage("");
    }
  };

  //전화번호 정보받기
  const getPhoneNum = () => {
    dispatch(chatActions.getPhoneNumDB());
    const ask = window.confirm("전화번호를 공개하시겠습니까?");
    if (ask) {
      return showPhoneNum();
    } else {
      return;
    }
  };
  //전화번호 보여주기
  const showPhoneNum = async () => {
    const datas = {
      type: "PHONE_NUM",
      roomId: roomId,
      message: "전화번호 공개" + phoneInfo,
    };
    await stomp.send("/pub/chat/message", token, JSON.stringify(datas));
    scrollMoveBottom(); //스크롤 다운
    // dispatch(chatActions.sendChatDB(roomId, message));
  };

  //메세지 보내면 스크롤 자동내림
  const scrollMoveBottom = () => {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  };

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
          <Grid padding="0 16px" height="642px" overflow="scroll">
            <ChatRoomCard roomInfo={roomInfoList} />
            <div style={{ padding: "0 0 70px 0" }} ref={scrollRef}>
              {/* 채팅말풍선 */}
              {messageList.map((msg, idx) => {
                return <MessageBox key={"message" + idx} chatInfo={msg} />;
              })}
            </div>
          </Grid>
          {/* 하단부 버튼들 */}

          <Grid height="100px" position="relative" bg="#474D56">
            <Grid is_flex padding="35px 16px">
              <Input
                free
                position="absolute"
                width="92%"
                height="40px"
                radius="40px"
                autocomplete="off"
                _value={message}
                _onKeyPress={onKeyPress}
                _onChange={messageChat}
              />
              <Send onClick={sendMessage}>
                <Image
                  src={sendBtn}
                  width="30px"
                  height="30px"
                  position="center"
                  size="19px 20px"
                  cursor="pointer"
                />
              </Send>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Send = styled.div`
  width: 30px;
  height: 30px;
  background: #6195cf;
  border-radius: 50%;
  position: absolute;
  right: 26px;
`;
export default ChatRoom;
