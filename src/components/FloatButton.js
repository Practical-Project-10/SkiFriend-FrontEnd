import React from "react";

import styled from "styled-components";
import { Grid, Button } from "../elements/index";
import write from "../assets/freeBoard/write_icon.png"

const FloatButton = (props) => {
  const {
    _onClick,
  } = props;

  return (
    <React.Fragment>
      <Float>
        <Button floatBtn _onClick={_onClick}>+</Button>
      </Float>
    </React.Fragment>
  );
};

const Float = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 53px;
  height: 53px;
  border-radius: 999px;
  background: url(${write}) no-repeat center;
  border: 1px solid red;
`

export default FloatButton;
