import React, { useState, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../redux/modules/profile";
import { imageActions } from "../redux/modules/image";
import { userActions } from "../redux/modules/user";

import Header from "../components/Header";

import styled from "styled-components";
import { Grid, Image, Text, Input, Button } from "../elements/index";
import defaultIMG from "../assets/myPage/profilePicture.png";

const ProfileWrite = (props) => {
  const history = props.history;
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.image.preview);
  const user_profile = useSelector((state) => state.profile.user_profile);
  const pfImgFile = useRef();
  const deleteFile = new File(["delete"], "delete");

  const [profile, setProfile] = useState({
    nickname: user_profile.nickname,
    profileImg: user_profile.profileImg,
    gender: user_profile.gender,
    ageRange: user_profile.ageRange,
    career: user_profile.career,
    selfIntro: user_profile.selfIntro,
    phoneNum: user_profile.phoneNum,
  });
  const {
    nickname,
    profileImg,
    // gender,
    // ageRange,
    career,
    selfIntro,
    phoneNum,
  } = profile;
  console.log(profile);

  useEffect(() => {
    dispatch(profileActions.getProfileDB());
    dispatch(imageActions.setPreview(profileImg));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const selectFile = () => {
    const reader = new FileReader();
    const profileImgFile = pfImgFile.current.files[0];

    if (profileImgFile) {
      reader.readAsDataURL(profileImgFile);

      reader.onloadend = () => {
        dispatch(imageActions.setPreview(reader.result));
      };

      setProfile({
        ...profile,
        profileImg: profileImgFile,
      });
    }
  };

  const deleteImg = (e) => {
    const { id } = e.target;
    if (id === "deleteProfile") {
      setProfile({
        ...profile,
        profileImg: deleteFile,
      });

      dispatch(imageActions.deletePreview());
    }
  };

  // const addProfile = async () => {
  //   dispatch(profileActions.addProfileDB(profile));
  // };

  const addProfile = () => {
    dispatch(profileActions.addProfileDB(profile));
  };

  const deleteUser = () => {
    const ask = window.confirm("정말 회원탈퇴 하시겠습니까?");
    if (ask) {
      return dispatch(userActions.deleteUserInfoDB());
    }
  };

  return (
    <React.Fragment>
      <Header
        goBack
        push
        fixed
        _onClick={() => {
          history.push(`/mypage`);
        }}
      >
        내 프로필
      </Header>
      <Grid phoneSize position="relative" margin="70px 0 0">
        <Grid
          width="150px"
          height="182px"
          margin="40px auto 9px"
          position="relative"
        >
          <Image
            width="150px"
            height="150px"
            size="cover"
            radius="50%"
            padding="0 0 9px"
            src={preview ? preview : defaultIMG}
          />
          <ProfileLabel htmlFor="profile">사진 변경하기</ProfileLabel>
          <input
            id="profile"
            type="file"
            onChange={selectFile}
            ref={pfImgFile}
            style={{ display: "none" }}
          />
          <DeletePic id="deleteProfile" onClick={deleteImg}>
            X
          </DeletePic>
        </Grid>
        <Grid margin="70px 0 0">
          <Grid
            width="100%"
            display="flex"
            direction="column"
            gap="40px"
            margin="0 0 63px"
          >
            <Grid width="100%">
              <Text size="12px">전화번호</Text>
              <Input
                type="text"
                _disabled
                _name="phoneNum"
                _value={phoneNum !== "null" ? user_profile.phoneNum : null}
                _onChange={handleChange}
                placeholder="휴대폰 인증을 해주세요."
              />
              {!user_profile.phoneNum && (
                <Button
                  height="47px"
                  padding="14px 0"
                  margin="10px 0 0"
                  color="#474D56"
                  bg="#FFF"
                  _onClick={() => history.push("/phoneauth")}
                >
                  휴대폰 인증하기
                </Button>
              )}
            </Grid>
            <Grid width="100%">
              <Input
                label="닉네임"
                type="text"
                size="12px"
                _name="nickname"
                placeholder="닉네임을 입력해주세요."
                _value={nickname}
                _onChange={handleChange}
              />
            </Grid>

            <Grid width="100%">
              <Text size="12px">스키 / 스노우보드 경력</Text>
              <Select name="career" value={career} onChange={handleChange}>
                <option value="">선택</option>
                <option value="초보">초보</option>
                <option value="1~3년">1~3년</option>
                <option value="3~5년">3~5년</option>
                <option value="5년 이상">5년 이상</option>
              </Select>
            </Grid>

            <Grid width="100%">
              <Text size="12px">자기소개</Text>
              <Textarea
                name="selfIntro"
                value={selfIntro !== "null" ? selfIntro : null}
                placeholder="내용을 입력해주세요(글자제한 60자)"
                maxLength="60"
                onChange={handleChange}
              />
            </Grid>

            <Grid width="100%">
              <Text size="12px">성별</Text>
              <Input
                name="gender"
                _value={user_profile.gender}
                _disabled
              ></Input>
            </Grid>

            <Grid width="100%">
              <Text size="12px">나이</Text>
              <Input
                name="gender"
                _value={user_profile.ageRange}
                _disabled
              ></Input>
            </Grid>
          </Grid>
        </Grid>

        <Grid display="flex" direction="column" gap="16px" padding="0 0 16px">
          <Button height="61px" color="#FFF" bg="#6195CF" _onClick={addProfile}>
            작성완료
          </Button>

          <div style={{ border: "1px solid #9098a2", margin: "31px 0" }}></div>

          <Button
            height="61px"
            color="#474D56"
            bg="#E2B9B9"
            _onClick={deleteUser}
          >
            회원탈퇴
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const ProfileLabel = styled.label`
  width: 125px;
  height: 30px;
  padding: 6px 16px;
  background: #fff;
  border: 2px solid #6195cf;
  box-sizing: border-box;
  border-radius: 80px;
  font-size: 14px;
  color: #474d56;
  text-align: center;
  line-height: 14px;
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: auto;
  cursor: pointer;
`;

const DeletePic = styled.div`
  width: 18px;
  height: 18px;
  color: #fff;
  text-align: center;
  border-radius: 999px;
  background: #a6a9ad;
  position: absolute;
  top: 3px;
  right: 3px;
  cursor: pointer;

  &:hover {
    background: red;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 116px;
  padding: 18px 12px;
  border: 1px solid #6195cf;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
  resize: none;
`;

const Select = styled.select`
  width: 100%;
  padding: 14px 8px;
  border-radius: 6px;
  border: 1px solid #6195cf;
`;

export default ProfileWrite;
