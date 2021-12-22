import React from "react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import CarpoolMenuBar from "../components/CarpoolMenuBar";
import { Grid, Text } from "../elements/FreeBoardCSS/index";

//react icon
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";

const FreeBoardList = () => {
  return (
    <React.Fragment>
      <Header />
      <Grid main>하이원</Grid>
      <CarpoolMenuBar />
      <Grid list>
        <Text>전체</Text>
        <Grid is_flex justify="space-between">
          <Grid is_flex>
            <Text margin="0 10px 0 0">닉네임</Text>
            <Text margin="0 10px 0 0">글제목</Text>
          </Grid>
          <Grid is_flex>
            <AiOutlineHeart size="17" />
            <Text margin="0 5px 0 0">3</Text>
            <BsChat size="15" />
            <Text margin="0 5px 0 0">4</Text>
            <Text>날짜</Text>
          </Grid>
        </Grid>
      </Grid>
      <Navbar />
    </React.Fragment>
  );
};
export default FreeBoardList;
