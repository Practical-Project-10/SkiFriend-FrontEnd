import React from 'react';

import { history } from "../redux/ConfigStore"
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";

import styled from "styled-components";
import { Grid, Image, Text } from "../elements/index";

import notLoginProfile from "../assets/myPage/profile_default_img.png";

const UserProfile = (props) => {
  const {user_profile, is_login} = props;

  const dispatch = useDispatch();
  const is_profile = localStorage.getItem("is_profile");

  const logout = () => {
    dispatch(userActions.logout());
    history.replace("/");
  };

  return(
    <React.Fragment>
          {!is_login ? (
            <Grid>
              <Grid display="flex" justify="space-between" margin="30px 0 22px">
                <Grid width="75px" height="75px">
                  <Image
                    width="75px"
                    height="75px"
                    size="cover"
                    radius="999px"
                    src={notLoginProfile}
                  />
                </Grid>

                <Grid padding="12px 0" margin="0 18px 0 0">
                  <Text bold size="18px" line>
                    로그인이 필요합니다.
                  </Text>
                </Grid>

                <Grid padding="6px 0 0">
                  <SubButton
                    onClick={() => {
                      history.push("/login");
                    }}
                  >
                    <Text size="12px" color="#474D56">
                      로그인
                    </Text>
                  </SubButton>
                </Grid>
              </Grid>

              <div
                style={{ border: "1px solid #adb6c1", margin: "0 0 22px" }}
              ></div>
            </Grid>
          ) : (
            // 로그인 했을 때
            <Grid>
              <Grid display="flex" justify="space-between" margin="30px 0 22px">
                <Grid width="75px" height="75px">
                  <Image
                    width="75px"
                    height="75px"
                    size="cover"
                    radius="999px"
                    src={user_profile.profileImg}
                  />
                </Grid>

                <Grid width="179px" padding="12px 0" margin="0 18px 0 0">
                  <Text bold size="18px" line>
                    환영해요! {user_profile.nickname}님
                  </Text>

                  {is_profile === "true" ? (
                    <Grid
                      margin="10px 0 0"
                      display="flex"
                      justify="space-between"
                    >
                      <Small>
                        <Text bold size="12px" color="#FFF">
                          {user_profile.gender}
                        </Text>
                      </Small>
                      <Small>
                        <Text bold size="12px" color="#FFF">
                          {user_profile.ageRange}
                        </Text>
                      </Small>
                      <Small>
                        <Text bold size="12px" color="#FFF">
                          {user_profile.career}
                        </Text>
                      </Small>
                    </Grid>
                  ) : null}
                </Grid>

                <Grid padding="6px 0 0">
                  {is_profile === "true" ? (
                    <SubButton
                      onClick={() => {
                        history.push(`/profilewrite/${user_profile.username}`);
                      }}
                    >
                      <Text size="12px" color="#474D56">
                        수정하기
                      </Text>
                    </SubButton>
                  ) : (
                    <SubButton
                      onClick={() => {
                        history.push("/profilewrite");
                      }}
                    >
                      <Text size="12px" color="#474D56">
                        등록하기
                      </Text>
                    </SubButton>
                  )}
                  <SubButton onClick={logout}>
                    <Text size="12px" color="#474D56">
                      로그아웃
                    </Text>
                  </SubButton>
                </Grid>
              </Grid>

              <div style={{ border: "1px solid #adb6c1" }}></div>

              <Grid margin="22px 0 31px">
                <Text block margin="0 0 6px 0" bold="800" size="12px">
                  자기소개
                </Text>
                <Text>{user_profile.selfIntro}</Text>
              </Grid>
            </Grid>
          )}
    </React.Fragment>
  );
};

const Small = styled.div`
  width: 50px;
  height: 19px;
  margin-right: 5px;
  background: #6195cf;
  border-radius: 140px;
  text-align: center;
  line-height: 18px;

  &:last-child {
    margin: 0;
  }
`;

const SubButton = styled.div`
  width: 66px;
  padding: 6px;
  margin-bottom: 5px;
  background-color: #fff;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
`;

export default UserProfile;