import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { mainCreators as mainActions } from "../redux/modules/main";
import { userActions } from "../redux/modules/user";
import { chatCreators } from "../redux/modules/chat";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styled from "styled-components";
import { Grid, Text } from "../elements/index";
import SkiIcon from "../components/SkiIcon";
import HotPost from "../components/HotPost";
import Header from "../components/Header";
import High1 from "../assets/high1_logo.svg";
import YongPyong from "../assets/yongpyong_logo.svg";
import Vivaldi from "../assets/vivaldi_logo.svg";
import Phoenix from "../assets/phoenix_logo.svg";
import Wellihilli from "../assets/welli_logo.svg";
import Konjiam from "../assets/konjiam_logo.svg";
import Banner from "../assets/mainPage/Home_banner.png";
import Banner2 from "../assets/mainPage/Home_banner2.png";
import Banner3 from "../assets/mainPage/Home_banner3.png";

const Home = (props) => {
  const dispatch = useDispatch();
  //경로
  const history = props.history;
  //redux 데이터
  const hotPosts = useSelector((state) => state.main.list);
  // const alarm = useSelector((state) => state.chat.alarm);
  //토큰
  const accessToken = document.cookie.split("=")[1];
  const token = { Authorization: `${accessToken}` };
  //소켓
  const sock =
    // new SockJS("https://seongeunyang.shop/ws-alarm");
    new SockJS("http://3.34.19.50:8080/ws-alarm");
  const stomp = Stomp.over(sock);
  //localstorage
  const is_login = localStorage.getItem("is_login") === "true" ? true : false;
  const userId = localStorage.getItem("userId");
  //캐러셀 배너이미지
  const Carousel = [
    { id: 1, url: Banner },
    { id: 2, url: Banner2 },
    { id: 3, url: Banner3 },
  ];
  //캐러셀 속성
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const skiResort = [
    {
      resortNum: 1,
      resort: "하이원",
      name: "HighOne",
      logo: High1,
    },
    {
      resortNum: 2,
      resort: "용평",
      name: "YongPyong",
      logo: YongPyong,
    },
    {
      resortNum: 3,
      resort: "비발디",
      name: "VivaldiPark",
      logo: Vivaldi,
    },
    {
      resortNum: 4,
      resort: "휘닉스",
      name: "Phoenix",
      logo: Phoenix,
    },
    {
      resortNum: 5,
      resort: "웰리힐리",
      name: "WellihilliPark",
      logo: Wellihilli,
    },
    {
      resortNum: 6,
      resort: "곤지암",
      name: "Konjiam",
      logo: Konjiam,
    },
  ];

  useEffect(() => {
    try {
      stomp.debug = null;
      stomp.connect(token, () => {
        stomp.subscribe(
          `/sub/alarm/${userId}`,
          (data) => {
            const newData = JSON.parse(data.body);
            dispatch(chatCreators.getAlarm(newData));
          },
          token
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const mainHotPosts = async () => {
      const response = await (
        // await fetch("https://seongeunyang.shop/main")
        await fetch("http://3.34.19.50:8080/main")
      )
        .json();
      dispatch(mainActions.loadPosts(response));
    };
    mainHotPosts();
    // dispatch(mainActions.hotPostsDB());
  }, []);

  //로그아웃
  const logout = () => {
    const ask = window.confirm("로그아웃 하시겠습니까?");
    if (ask) {
      dispatch(userActions.logout());
      return history.replace("/");
    }
  };

  //설문지 조사 이동
  const connectUrl = (id) => {
    if (id === 2) {
      return (window.location.href =
        "https://docs.google.com/forms/d/1kRaC8Zy-8gpKSI2O4kDErjCYiE0l6jP_2dbR8tQGggc/edit?usp=forms_home&ths=true");
    }
    if (id === 3) {
      return (window.location.href =
        "https://docs.google.com/forms/d/e/1FAIpQLSdndra7y-jIH_gL8pJ1cU-H4XMwOYLYv9wHJINxX8WDbJnpJA/viewform");
    }
  };

  return (
    <React.Fragment>
      {is_login ? (
        <Header logout _onClick={logout}>
          홈
        </Header>
      ) : (
        <Header
          login
          _onClick={() => {
            history.push(`/login`);
          }}
        >
          홈
        </Header>
      )}
      <Grid width="100%" margin="0 0 70px">
        <Grid width="100%" height="189px">
          {/* 캐러셀 배너 */}
          <Slider {...settings}>
            {Carousel.map((item) => {
              return (
                <BannerImage
                  key={item.id}
                  src={item.url}
                  style={{ cursor: item.id === 1 ? "" : "pointer" }}
                  onClick={() => connectUrl(item.id)}
                  target="_blank"
                  alt="배너"
                />
              );
            })}
          </Slider>
        </Grid>

        <Grid align="center" padding="4px 0" bg="#474D56">
          {/* 가이드 링크 */}
          <a
            href="https://beomin-sd.tistory.com/365"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: "700", color: "#FFF" }}
          >
            카풀과 스키장이 처음이라면? 가이드 읽어보기
          </a>
        </Grid>
        <IconWrap>
          {/* padding='26px' 적용이 안 됨*/}
          {skiResort.map((r) => {
            return (
              <Grid
                width="calc((100% - 100px) / 3)"
                cursor="pointer"
                hoverOpacity="0.8"
                key={r.resortNum}
                _onClick={() => history.push(`/carpool/${r.name}`)}
                align="center"
              >
                <SkiIcon src={r.logo} />
                <Text>{r.resort}</Text>
              </Grid>
            );
          })}
        </IconWrap>
        <Grid
          bg="#FFF"
          height="413px"
          radius="22px"
          padding="26px 0"
          margin="0 0 20px"
        >
          <Grid phoneSize>
            <Text bold size="18px">
              인기게시글
            </Text>
          </Grid>
          <Grid phoneSize>
            {hotPosts.map((p) => {
              return (
                <Grid key={p.postId}>
                  <HotPost {...p} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
const IconWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 26px 42px;
  gap: 30px 50px;
`;

const BannerImage = styled.img`
  max-width: 100%;
  max-height: 189px;
`;
export default Home;
