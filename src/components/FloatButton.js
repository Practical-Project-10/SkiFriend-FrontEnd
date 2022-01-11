import React from "react";

import styled from "styled-components";
import write from "../assets/freeBoard/write_icon.png";

const FloatButton = (props) => {
  const { _onClick } = props;

  return (
    <React.Fragment>
      <Float onClick={_onClick}>
      </Float>
    </React.Fragment>
  );
};

const Float = styled.div`
  position: absolute;
  bottom: 90px;
  right: 16px;
  width: 53px;
  height: 53px;
  border-radius: 50%;
  background: url(${write}) no-repeat center;
  background-color: #474D56;
  background-size: 25px;

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

export default FloatButton;
