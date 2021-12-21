import React from "react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import CarpoolMenuBar from "../components/CarpoolMenuBar";
import { Grid } from "../elements/FreeBoardCSS/index";

const FreeBoard = () => {
  return (
    <React.Fragment>
      <Header />
      <Grid main>하이원</Grid>
      <CarpoolMenuBar />
      <Navbar />
    </React.Fragment>
  );
};
export default FreeBoard;
