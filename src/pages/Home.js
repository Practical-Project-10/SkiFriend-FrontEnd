import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { mainCreators as mainActions } from "../redux/modules/main";

import { Grid, Image, Text } from "../elements/index";
import SkiIcon from "../components/SkiIcon"
import HotPost from "../components/HotPost";

import High1 from "../assets/skiInfo/high1_logo.png";
import YongPyong from "../assets/skiInfo/yongpyong_logo.png";
import VivaldiPark from "../assets/skiInfo/vivaldi_logo.png";
import Phoenix from "../assets/skiInfo/phoenix_logo.png";
import WellihilliPark from "../assets/skiInfo/welli_logo.png";
import Konjiam from "../assets/skiInfo/kongiam_logo.png";

//react icons
import { AiOutlineHeart } from "react-icons/ai";

// 메인 페이지 기능 완성 후 map으로 바꾸기
const Home = (props) => {
  const dispatch = useDispatch();
  const hotPosts = useSelector((state) => state.main.list);
  console.log(hotPosts);

  const skiResort = [
    {
      resortNum: 1,
      resort: "하이원",
      name: "HighOne",
      img: High1,
    },
    {
      resortNum: 2,
      resort: "용평",
      name: "YongPyong",
      img: YongPyong,
    },
    {
      resortNum: 3,
      resort: "비발디",
      name: "VivaldiPark",
      img: VivaldiPark,
    },
    {
      resortNum: 4,
      resort: "휘닉스",
      name: "Phoenix",
      img: Phoenix,
    },
    {
      resortNum: 5,
      resort: "웰리힐리",
      name: "WellihilliPark",
      img: WellihilliPark,
    },
    {
      resortNum: 6,
      resort: "곤지암",
      name: "Konjiam",
      img: Konjiam,
    },
  ];
  const history = props.history;

  React.useEffect(() => {
    const mainHotPosts = async () => {
      const response = await (await fetch("http://13.125.249.172/main")).json();
      dispatch(mainActions.loadPosts(response));
    };
    mainHotPosts();
    // dispatch(mainActions.hotPostsDB());
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <Grid height="216px">
          <Image height="100%" bg="#000" />
        </Grid>

        <Grid is_flex padding='4px 0' bg="#474D56">
          <Text bold color="#fff">카풀과 스키장이 처음이라면? 가이드 읽어보기</Text>
        </Grid>

        <Grid is_flex wrap padding='26px 33px' gap='38px 50px'> {/* padding='26px' 적용이 안 됨*/}
          {skiResort.map((r) => {
            return (
              <Grid
                skiIcon
                key={r.resortNum}
                _onClick={() => history.push(`/carpool/${r.name}`)}
                align='center'
              >
                <SkiIcon url={r.img}/>
                <Text>{r.resort}</Text>
              </Grid>
            );
          })}
        </Grid>

        <Grid phoneSize>
          <HotPost/>
          {/* {hotPosts.map(p => {
            return(
              <Grid>
                <HotPost {...p}/>
              </Grid>
            )
          })} */}
        </Grid>

        {/* <Grid padding="10px">
          <Text size="14px">&lt;인기게시글&gt;</Text>
          <Grid
            height="150px"
            margin="10px auto"
            bg="#999"
            radius="10px"
            padding="10px"
          >
            {hotPosts.map((post) => {
              return (
                <Grid is_flex justify="space-between" key="a">
                  <Grid is_flex>
                    <Text>{post.skiResort}</Text>
                    <Text
                      margin="0 10px"
                      cursor="pointer"
                      _onClick={() => {
                        history.push(
                          `freeboarddetail/${post.skiResort}/${post.postId}`
                        );
                      }}
                    >
                      {post.title}
                    </Text>
                  </Grid>
                  <Grid is_flex>
                    <AiOutlineHeart />
                    <Text margin="0 10px 0 0">{post.likeCnt}</Text>
                    <Text>{post.createdAt}</Text>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
};

export default Home;
