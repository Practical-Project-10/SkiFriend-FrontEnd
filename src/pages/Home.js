import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { mainCreators as mainActions } from "../redux/modules/main";
import { userActions } from "../redux/modules/user";
import { chatCreators } from "../redux/modules/chat";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

import styled from "styled-components";
import { Grid, Image, Text } from "../elements/index";
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

const Home = (props) => {
  const dispatch = useDispatch();
  //경로
  const history = props.history;
  //redux 데이터
  const hotPosts = useSelector((state) => state.main.list);
  const alarm = useSelector((state) => state.chat.alarm);
  //토큰
  const accessToken = document.cookie.split("=")[1];
  const token = { Authorization: `${accessToken}` };
  //소켓
  const sock = new SockJS("http://3.34.19.50:8080/ws-alarm");
  const stomp = Stomp.over(sock);
  //localstorage
  const is_login = localStorage.getItem("is_login") === "true" ? true : false;
  const userId = localStorage.getItem("userId");

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
        await fetch("http://3.34.19.50:8080/main")
      ).json();
      dispatch(mainActions.loadPosts(response));
    };
    mainHotPosts();
    // dispatch(mainActions.hotPostsDB());
  }, []);
  //로그아웃
  const logout = () => {
    dispatch(userActions.logout());
    history.replace("/");
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
        <Grid width="100%" height="210px">
          <Image src={Banner} size="100% 207px" width="100%" height="100%" />
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

export default Home;
