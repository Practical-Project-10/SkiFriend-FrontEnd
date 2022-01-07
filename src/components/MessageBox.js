import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatCreators as chatActions } from "../redux/modules/chat";

import Modal from "../components/Modal"

import { Grid, Text, Image } from "../elements/index";
import { useParams } from "react-router-dom";
import defaultIMG from "../assets/myPage/profilePicture.png";

const MessageBox = (props) => {
  const { chatInfo } = props;
  const dispatch = useDispatch();
  const params = useParams();
  const longRoomId = params.longRoomId;

  const nickname = localStorage.getItem("nickname");
  const profileList = useSelector((state) => state.chat.profileList);

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
  React.useEffect(() => {
    dispatch(chatActions.getProfileInfoDB(longRoomId));
  }, []);

  return (
    <React.Fragment>
      {/* 내가 메세지 보낼때 보이는 위치와 상대방이 나에게 보낼때 위치 */}
      {nickname === chatInfo.sender ? (
        <Grid is_flex justify="flex-end" margin="5px">
          <Text size="10px" margin="0 10px">
            {chatInfo.createdAt}
          </Text>
          <Text bg="#6195CF" color="white" radius="10px" padding="2px 10px">
            {chatInfo.message}
          </Text>
        </Grid>
      ) : (
        <Grid is_flex justify="left" margin="5px">
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
            <Grid is_flex justify="left">
              <Text bg="#ffffff" radius="10px" padding="2px 10px">
                {chatInfo.message}
              </Text>
              <Text size="10px" margin="0 10px">
                {chatInfo.createdAt}
              </Text>
            </Grid>
          </Grid>
        </Grid>
      )}
      {/* 모달 프로필공개 */}
      <div showmodal={showmodal} />
      {showmodal ? (
        <Modal
        height='500px'
          profile
          closeModal={closeModal}
          profileImg={profileList.profileImg}
          nickname={profileList.nickname}
          gender={profileList.gender}
          ageRange={profileList.ageRange}
          career={profileList.career}
          selfIntro={profileList.selfIntro}
        />
      ) : null}
    </React.Fragment>
  );
};
export default MessageBox;
