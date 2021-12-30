import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { mainCreators as mainActions } from "../redux/modules/main";

import { Grid, Image, Text } from "../elements/index";

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
    },
    {
      resortNum: 2,
      resort: "용평",
      name: "YongPyong",
    },
    {
      resortNum: 3,
      resort: "비발디",
      name: "VivaldiPark",
    },
    {
      resortNum: 4,
      resort: "휘닉스",
      name: "Phoenix",
    },
    {
      resortNum: 5,
      resort: "웰리힐리",
      name: "WellihilliPark",
    },
    {
      resortNum: 6,
      resort: "곤지암",
      name: "Konjiam",
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
      <Grid padding="10px">
        <Grid height="180px">
          <Image height="100%" bg="#000" />
        </Grid>

        <Grid height="30px" bg="#999">
          <Text size="12px">카풀과 스키장이 처음이라면? 가이드 읽어보기</Text>
        </Grid>

        <Grid is_flex wrap="wrap" padding="20px" border="1px solid #000">
          {skiResort.map((r) => {
            return (
              <Grid
                skiIcon
                key={r.resortNum}
                _onClick={() => history.push(`/carpool/${r.name}`)}
              >
                <div
                  style={{ width: "30px", height: "30px", background: "#000" }}
                ></div>
                <Text>{r.resort}</Text>
              </Grid>
            );
          })}
        </Grid>

        <Grid padding="10px">
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
                    <Text margin="0 10px">{post.title}</Text>
                  </Grid>
                  <Text>{post.createdAt}</Text>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
