import React from "react";

import styled from "styled-components";
import { Grid, Button, Image } from "../elements/index";

import { BiPencil } from "react-icons/bi";

const FloatButton = (props) => {
  const { _onClick } = props;

  return (
    <React.Fragment>
      <Grid
        position="fixed"
        width="55px"
        height="55px"
        radius="50%"
        bg="#474D56"
        align="center"
        color="white"
        cursor="pointer"
        hoverOpacity="0.8"
        padding="5px 0"
        margin="150px 0 0 350px"
        _onClick={_onClick}
      >
        <BiPencil size="43" />
      </Grid>
    </React.Fragment>
  );
};

export default FloatButton;
