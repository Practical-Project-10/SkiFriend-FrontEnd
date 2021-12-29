import React, { useState, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ProfilieActions } from "../redux/modules/profile";

import { Grid, Image, Text, Input, Button } from "../elements/index";

const SignupTwo = (props) => {
  const history = props.history;
  const dispatch = useDispatch();
  const user_profile = useSelector((state) => state.profile.user_profile);
  const pfImgFile = useRef("");
  const vImgFile = useRef("");

  const username = props.match.params.username;
  console.log(username);
  const is_edit = username ? true : false;
  console.log(is_edit);

  const [profile, setProfile] = useState({
    nickname: `${is_edit ? user_profile.nickname : ""}`,
    profileImg: `${is_edit ? user_profile.profileImg : ""}`,
    gender: `${is_edit ? user_profile.gender : ""}`,
    ageRange: `${is_edit ? user_profile.ageRange : ""}`,
    career: `${is_edit ? user_profile.career : ""}`,
    selfIntro: `${is_edit ? user_profile.selfIntro : ""}`,
    vacImg: `${is_edit ? user_profile.vacImg : ""}`,
  });
  const { nickname, profileImg, gender, ageRange, career, selfIntro, vacImg } =
    profile;

  useEffect(() => {
    if (!is_edit) {
      window.alert("프로필 정보가 없어요!");
      history.goback();

      return null;
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const selectFile = () => {
    const profileImgFile = pfImgFile.current.files[0];
    const vacImgFile = vImgFile.current.files[0];
    console.log(profileImgFile);
    console.log(vacImgFile);

    if (profileImgFile) {
      setProfile({
        ...profile,
        profileImg: profileImgFile,
      });
    }

    if (vacImgFile) {
      setProfile({
        ...profile,
        vacImg: vacImgFile,
      });
    }
  };
  console.log(profile);

  const addProfile = () => {
    dispatch(ProfilieActions.addProfileDB(profile));
  };

  return (
    <React.Fragment>
      <Grid width="70%" margin="auto">
        <Grid width="70%" margin="auto">
          <Image width="170px" height="170px" margin="auto" radius="50%" />
          <input type="file" onChange={selectFile} ref={pfImgFile} />
        </Grid>
        <Grid is_flex padding="0 24px" direction="column">
          <Text marginB="5px">
            닉네임:{" "}
            <Input
              profile
              type="text"
              width="50px"
              _name="nickname"
              _value={nickname}
              _onChange={handleChange}
            />
          </Text>
          <Text marginB="5px">
            성별:{" "}
            <Input
              profile
              type="text"
              width="50px"
              _name="gender"
              _value={gender}
              _onChange={handleChange}
            />
          </Text>
          <Text marginB="5px">
            나이:{" "}
            <Input
              profile
              type="text"
              width="50px"
              _name="ageRange"
              _value={ageRange}
              _onChange={handleChange}
            />
          </Text>
          <Text marginB="5px">
            스키 / 스노우보드 경력:{" "}
            <Input
              profile
              type="text"
              width="50px"
              _name="career"
              _value={career}
              _onChange={handleChange}
            />
          </Text>
          <Text marginB="5px">
            가입 인사 한마디
            <textarea
              style={{ width: "100%", height: "70px" }}
              name="selfIntro"
              value={selfIntro}
              onChange={handleChange}
            />
          </Text>
          백신인증: <input type="file" onChange={selectFile} ref={vImgFile} />
        </Grid>
        <Grid align="center">
          <Button
            width="100px"
            padding="7px"
            margin="25px auto"
            _onClick={addProfile}
          >
            작성 완료
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SignupTwo;
