import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import { Grid, Button } from "../elements/index";
import CarpoolRequire from "../components/CarpoolRequire";
import Header from "../components/Header";

const CarpoolFilter = (props) => {

  return (
    <React.Fragment>
      <Header goBack>검색필터</Header>
      <CarpoolRequire is_filter height='calc( 100vh - 55px )'/>
    </React.Fragment>
  );
};

export default CarpoolFilter;
