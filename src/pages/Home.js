import React from "react";

import { Grid, Image, Text } from "../elements/index";

const Home = (props) => {
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
          <Grid skiIcon>
            <div
              style={{ width: "30px", height: "30px", background: "#000" }}
            ></div>
            <Text>하이원</Text>
          </Grid>
          <Grid skiIcon>
            <div
              style={{ width: "30px", height: "30px", background: "#000" }}
            ></div>
            <Text>용평</Text>
          </Grid>
          <Grid skiIcon>
            <div
              style={{ width: "30px", height: "30px", background: "#000" }}
            ></div>
            <Text>비발디</Text>
          </Grid>
          <Grid skiIcon>
            <div
              style={{ width: "30px", height: "30px", background: "#000" }}
            ></div>
            <Text>휘닉스</Text>
          </Grid>
          <Grid skiIcon>
            <div
              style={{ width: "30px", height: "30px", background: "#000" }}
            ></div>
            <Text>웰리힐리</Text>
          </Grid>
          <Grid skiIcon>
            <div
              style={{ width: "30px", height: "30px", background: "#000" }}
            ></div>
            <Text>곤지암</Text>
          </Grid>
        </Grid>

        <Grid padding="10px">
          <Text size="14px">&lt;인기게시글&gt;</Text>
          <Grid height="150px" margin="10px auto" bg="#999" radius="10px"></Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
