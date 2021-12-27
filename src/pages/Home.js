import React from "react";

import { Grid, Image, Text } from "../elements/index";


// 메인 페이지 기능 완성 후 map으로 바꾸기
const Home = (props) => {
  const skiResort = [
    {
      resortNum: 1,
      resort: '하이원',
    },
    {
      resortNum: 2,
      resort: '용평',
    },
    {
      resortNum: 3,
      resort: '비발디',
    },
    {
      resortNum: 4,
      resort: '휘닉스',
    },
    {
      resortNum: 5,
      resort: '웰리힐리',
    },
    {
      resortNum: 6,
      resort: '곤지암',
    },
  ];
  const history = props.history;

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
            return(
              <Grid skiIcon key={r.resortNum} _onClick={() => history.push(`/carpool/${r.resort}`)}>
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
          <Grid height="150px" margin="10px auto" bg="#999" radius="10px" padding='10px'>
            <Grid is_flex>
              <Grid margin='0 10px 0 0'>하이원</Grid>
              <Text>하이원에서 무엇을 하나요?</Text>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
