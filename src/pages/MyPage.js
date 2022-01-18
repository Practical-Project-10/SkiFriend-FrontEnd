import React, {useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../redux/modules/profile";
import { carpoolActions } from "../redux/modules/carpool";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import Card from "../components/Card";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";

import styled from "styled-components";
import { Grid, Image, Text } from "../elements/index";
import banner from "../assets/myPage/mypage_banner.png";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const is_login = localStorage.getItem("is_login") === 'true'? true: false;
  const user_profile = useSelector((state) => state.profile.user_profile);
  const myCarpool = useSelector((state) => state.carpool.list['myPage']);


  useEffect(() => {
    if (!is_login) {
      return null;
    }
    dispatch(profileActions.getProfileDB());
    // if(myCarpool.length === 0) {
      dispatch(carpoolActions.getMyCarpoolDB('myPage'));
    // }
  }, []);

  return (
    //로그인 안 했을 때
    <Grid>
      <Header>마이페이지</Header>

      <Grid margin="0 0 70px 0" minHeight="calc( 100vh - 154px )">
        <Grid phoneSize>
          <UserProfile {...user_profile} is_login={is_login}/>
        </Grid>

        <Grid
          height="645px"
          bg="#FFF"
          radius="22px 22px 0 0"
          padding="16px 16px 0"
        >
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

          <Grid margin="25px 0 0">
            {is_login ? (
              <RowDiv>
                <Text bold size="12px">
                  내가 쓴 카풀
                </Text>
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
            ) : (
              <Card notLogin />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const RowDiv = styled.div`
  .scroll-container {
    height: 100%;
    display: flex;
    padding: 16px 0;
    box-sizing: border-box;
  }
`;

export default MyPage;
