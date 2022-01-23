import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../redux/modules/profile";
import { carpoolActions } from "../redux/modules/carpool";
import { shortsActions } from "../redux/modules/shorts";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import Card from "../components/Card";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import ShortsCard from "../components/ShortsCard";

import styled from "styled-components";
import { Grid, Image, Text } from "../elements/index";
import banner from "../assets/myPage/mypage_banner.png";

const MyPage = (props) => {
  const dispatch = useDispatch();
  // localStorage 로그인 정보
  const is_login = localStorage.getItem("is_login") === "true" ? true : false;
  const user_profile = useSelector((state) => state.profile.user_profile);
  // redux데이터
  const myCarpool = useSelector((state) => state.carpool.list["myPage"]);
  const myShortsList = useSelector((state) => state.shorts.myShortsList);

  useEffect(() => {
    if (!is_login) {
      return null;
    }
    dispatch(profileActions.getProfileDB());
    if (myCarpool.length === 0) {
      dispatch(carpoolActions.getMyCarpoolDB("myPage"));
    }
  }, []);

  useEffect(() => {
    if (myShortsList.length === 0) {
      dispatch(shortsActions.myShortsDB());
    }
  }, [myShortsList.length]);

  return (
    //로그인 안 했을 때
    <Grid>
      <Header>마이페이지</Header>

      <Grid margin="0 0 70px 0" minHeight="calc( 100vh - 154px )">
        {/* 유저프로필 */}
        <Grid phoneSize>
          <UserProfile {...user_profile} is_login={is_login} />
        </Grid>

        <Menu>
          {/* 구글 폼으로 이동 */}
          <a
            href="https://docs.google.com/forms/d/1kRaC8Zy-8gpKSI2O4kDErjCYiE0l6jP_2dbR8tQGggc/viewform?edit_requested=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Grid cursor="pointer" width="100%" height="143px">
              <Image src={banner} width="100%" height="100%" size="cover" />
            </Grid>
          </a>

          {/* 내가 쓴 카풀 목록 */}
          <Grid>
            <Text bold size="12px">
              내가 작성한 카풀
            </Text>
            {!is_login || myCarpool.length === 0 ? (
              <Card noCard />
            ) : (
              <RowDiv>
                <Swiper
                  className="scroll-container"
                  slidesPerView={1.3}
                  spaceBetween={10}
                  initialSlide={0}
                >
                  {myCarpool.map((l) => {
                    return (
                      <SwiperSlide key={l.createdAt}>
                        <Grid width="100%">
                          <Card page="myPage" {...l} />
                        </Grid>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </RowDiv>
            )}
          </Grid>

          {/* 내가 쓴 숏츠 */}
          <Grid>
            <Text bold size="12px">
              나의 숏츠
            </Text>
            {!is_login || myShortsList.length === 0 ? (
              <Card noCard />
            ) : (
              <RowDiv>
                <Swiper
                  className="scroll-container"
                  slidesPerView={2.5}
                  spaceBetween={10}
                  initialSlide={0}
                >
                  {myShortsList.map((s) => {
                    return (
                      <SwiperSlide key={s.shortsId}>
                        <ShortsCard page='myPage' {...s} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </RowDiv>
            )}
          </Grid>
        </Menu>
      </Grid>
    </Grid>
  );
};

const RowDiv = styled.div`
  .scroll-container {
    height: 100%;
    display: flex;
    padding: 16px 0 0;
    box-sizing: border-box;
  }
`;

const Menu = styled.div`
  height: 706px;
  padding: 16px;
  border-radius: 22px 22px 0 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export default MyPage;
