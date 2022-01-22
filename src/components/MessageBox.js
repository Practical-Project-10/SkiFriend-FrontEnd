import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatCreators as chatActions } from "../redux/modules/chat";

import Modal from "../components/Modal";

import { Grid, Text, Image } from "../elements/index";
import { useParams } from "react-router-dom";
import defaultIMG from "../assets/myPage/profilePicture.png";
import { BsTelephoneOutbound } from "react-icons/bs";

const MessageBox = (props) => {
  const { chatInfo } = props;
  // const time = chatInfo.createdAt.split(" ");
  // const realTime = time[0] + " " + time[1] + " " + time[2];
  console.log(chatInfo);
  const dispatch = useDispatch();
  //경로
  const params = useParams();
  const roomId = params.roomId;
  //redux 데이터
  const profileList = useSelector((state) => state.chat.profileList);
  //localstorage
  const nickname = localStorage.getItem("nickname");
  //------useState관리-------
  const [showmodal, setShowModal] = useState();

  //-------Modal-------
  const closeModal = () => {
    setShowModal(false);
  };

  //프로필 정보 보기
  const showProfile = () => {
    setShowModal(true);
  };

  //프로필 정보 가져오기
  useEffect(() => {
    dispatch(chatActions.getProfileInfoDB(roomId));
  }, []);

  return (
    <React.Fragment>
      {/* 내가 메세지 보낼때 보이는 위치와 상대방이 나에게 보낼때 위치 */}
      <Grid>
        {nickname === chatInfo.sender ? (
          <Grid display="flex" justify="flex-end" alignItems="end" margin="5px">
            <Text size="10px" margin="0 10px">
              {chatInfo.createdAt}
            </Text>
            {/* 전화번호 공개 할 때와 일반 말풍선일 경우 */}
            {chatInfo.type === "PHONE_NUM" ? (
              <Grid
                bg="#474D56"
                width="180px"
                height="60px"
                radius="10px"
                align="center"
              >
                <Grid color="#C4C4C4" padding="5px" borderB="1px solid #C4C4C4">
                  연락처를 보냈습니다.
                </Grid>
                <Grid is_flex justify="center" color="#C4C4C4">
                  <BsTelephoneOutbound />
                  <Text color="#ffffff" margin="5px 20px" bold>
                    {chatInfo.message}
                  </Text>
                </Grid>
              </Grid>
            ) : (
              <Text
                width={chatInfo.message.length > 20 ? "50%" : undefined}
                wordWrap="break-word"
                wordBreak="break-all"
                height="100%"
                bg="#6195CF"
                color="white"
                radius="10px"
                padding="5px"
              >
                {chatInfo.message}
              </Text>
            )}
          </Grid>
        ) : (
          <Grid display="flex" justify="left" alignItems="start" margin="5px">
            {chatInfo.senderImg === "null" ? (
              <Grid
                cursor="pointer"
                margin="0 5px"
                radius="50%"
                _onClick={showProfile}
              >
                <Image
                  src={defaultIMG}
                  width="35px"
                  height="35px"
                  size="cover"
                  radius="50%"
                />
              </Grid>
            ) : (
              <Grid cursor="pointer" margin="0 5px" _onClick={showProfile}>
                <Image
                  src={chatInfo.senderImg}
                  width="35px"
                  height="35px"
                  size="cover"
                  radius="50%"
                />
              </Grid>
            )}
            <Grid>
              <Text size="10px">{chatInfo.sender}</Text>
              <Grid display="flex" justify="left" alignItems="end">
                {/* 전화번호 공개 할 때와 일반 말풍선일 경우 */}
                {chatInfo.type === "PHONE_NUM" ? (
                  <Grid
                    bg="#474D56"
                    width="180px"
                    height="60px"
                    radius="10px"
                    align="center"
                  >
                    <Grid
                      color="#C4C4C4"
                      padding="5px"
                      borderB="1px solid #C4C4C4"
                    >
                      연락처를 보냈습니다.
                    </Grid>
                    <Grid is_flex justify="center" color="#C4C4C4">
                      <BsTelephoneOutbound />
                      <Text color="#ffffff" margin="5px 20px" bold>
                        {chatInfo.message}
                      </Text>
                    </Grid>
                  </Grid>
                ) : (
                  <Text
                    width={chatInfo.message.length > 20 ? "50%" : undefined}
                    wordWrap="break-word"
                    wordBreak="break-all"
                    bg="#6195CF"
                    color="white"
                    radius="10px"
                    padding="5px"
                  >
                    {chatInfo.message}
                  </Text>
                )}
                <Text size="10px" margin="0 10px">
                  {chatInfo.createdAt}
                </Text>
              </Grid>
            </Grid>
          </Grid>
        )}
        {/* 모달 프로필공개 */}
        {showmodal ? (
          <Modal
            height="256px"
            page="profile"
            closeModal={closeModal}
            profileImg={profileList.profileImg}
            nickname={profileList.nickname}
            gender={profileList.gender}
            ageRange={profileList.ageRange}
            career={profileList.career}
            selfIntro={profileList.selfIntro}
          />
        ) : null}
      </Grid>
    </React.Fragment>
  );
};
export default MessageBox;
