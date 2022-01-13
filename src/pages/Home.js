import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { mainCreators as mainActions } from "../redux/modules/main";
import styled from "styled-components";
import { Grid, Image, Text } from "../elements/index";
import SkiIcon from "../components/SkiIcon";
import HotPost from "../components/HotPost";
import Header from "../components/Header";
import High1 from "../assets/skiInfo/high1_logo.png";
import High1_ from "../assets/skiImage/HighOne/HighOne3.png";
import YongPyong from "../assets/skiInfo/yongpyong_logo.png";
import YongPyong_ from "../assets/skiImage/YongPyong/YongPyong2.png";
import VivaldiPark from "../assets/skiInfo/vivaldi_logo.png";
import VivaldiPark_ from "../assets/skiImage/Vivaldi/Vivaldi1.png";
import Phoenix from "../assets/skiInfo/phoenix_logo.png";
import Phoenix_ from "../assets/skiImage/Phoenix/Phoenix2.png";
import WellihilliPark from "../assets/skiInfo/welli_logo.png";
import WellihilliPark_ from "../assets/skiImage/Wellihilli/Wellihilli1.png";
import Konjiam from "../assets/skiInfo/kongiam_logo.png";
import Konjiam_ from "../assets/skiImage/Konjiam/Konjiam1.png";
import Banner from "../assets/mainPage/Home_banner.png";

const Home = (props) => {
  const dispatch = useDispatch();
  const hotPosts = useSelector((state) => state.main.list);
  // const carpool_list = useSelector((state) => state.carpool.list);
  const history = props.history;
  const skiResort = [
    {
      resortNum: 1,
      resort: "하이원",
      name: "HighOne",
      logo: High1,
      img: High1_,
    },
    {
      resortNum: 2,
      resort: "용평",
      name: "YongPyong",
      logo: YongPyong,
      img: YongPyong_,
    },
    {
      resortNum: 3,
      resort: "비발디",
      name: "VivaldiPark",
      logo: VivaldiPark,
      img: VivaldiPark_,
    },
    {
      resortNum: 4,
      resort: "휘닉스",
      name: "Phoenix",
      logo: Phoenix,
      img: Phoenix_,
    },
    {
      resortNum: 5,
      resort: "웰리힐리",
      name: "WellihilliPark",
      logo: WellihilliPark,
      img: WellihilliPark_,
    },
    {
      resortNum: 6,
      resort: "곤지암",
      name: "Konjiam",
      logo: Konjiam,
      img: Konjiam_,
    },
  ];
  React.useEffect(() => {
    const mainHotPosts = async () => {
      const response = await (
        await fetch("https://seongeunyang.shop/main")
      ).json();
      dispatch(mainActions.loadPosts(response));
    };
    mainHotPosts();
    // dispatch(mainActions.hotPostsDB());
  }, []);
  return (
    <React.Fragment>
      <Header>홈</Header>
      <Grid width="100%" margin="0 0 70px">
        <Grid width="100%" height="210px">
          <Image src={Banner} size="cover" width="100%" height="100%" />
        </Grid>
        <Grid align="center" padding="4px 0" bg="#474D56">
          {/* 가이드 링크 */}
          <a
            href="https://www.notion.so/7991aee19c5f4a419bb71207823d01fe"
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
                cursor
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
          height="415px"
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
