import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatCreators as chatActions } from "../redux/modules/chat";

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
          {chatInfo.senderImg ? (
            <Grid
              src={chatInfo.senderImg}
              radius="50%"
              cursor="pointer"
              margin="0 5px"
              _onClick={showProfile}
            >
              <Image width="35px" height="35px" />
            </Grid>
          ) : (
            <Grid
              src={defaultIMG}
              radius="50%"
              cursor="pointer"
              margin="0 5px"
              _onClick={showProfile}
            >
              <Image width="35px" height="35px" />
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
        <Grid className="modalBackground" _onClick={closeModal}>
          <Grid
            className="modalContainer"
            _onClick={(e) => e.stopPropagation()}
          >
            {/* 프로필사진정보 */}
            {profileList.profileImg ? (
              <Grid>
                <Image
                  src={profileList.profileImg}
                  margin="0 auto"
                  width="110px"
                  height="110px"
                  radius="50%"
                />
              </Grid>
            ) : (
              <Grid>
                <Image
                  src={defaultIMG}
                  margin="0 auto"
                  width="110px"
                  height="110px"
                  radius="50%"
                />
              </Grid>
            )}
            {/* 닉네임정보 */}
            <Text size="20px" margin="0 10px">
              닉네임: {profileList.nickname}
            </Text>
            <Grid is_flex margin="10px 0" justify="center">
              {/* 성별정보 */}
              {profileList.gender ? (
                <Text size="20px" margin="0 10px">
                  성별: {profileList.gender}
                </Text>
              ) : (
                <Text size="20px" margin="0 10px">
                  성별: 미등록
                </Text>
              )}
              {/* 나이정보 */}
              {profileList.ageRange ? (
                <Text size="20px" margin="0 10px">
                  나이: {profileList.ageRange}
                </Text>
              ) : (
                <Text size="20px" margin="0 10px">
                  나이: 미등록
                </Text>
              )}
              {/* 경력정보 */}
              {profileList.career ? (
                <Text size="20px" margin="0 10px">
                  경력: {profileList.career}
                </Text>
              ) : (
                <Text size="20px" margin="0 10px">
                  경력: 미등록
                </Text>
              )}
            </Grid>
            <Grid is_flex justify="center">
              {/* 자기소개정보 */}
              {profileList.selfIntro ? (
                <Text size="15px">자기소개: {profileList.selfIntro}</Text>
              ) : (
                <Text size="15px">자기소개: 미등록</Text>
              )}
            </Grid>
            <Text
              size="20px"
              padding="30px 0 0 0"
              cursor="pointer"
              _onClick={closeModal}
            >
              닫기
            </Text>
          </Grid>
        </Grid>
      ) : null}
    </React.Fragment>
  );
};
export default MessageBox;
