import React from "react";

import styled from "styled-components";
import writeBtn from "../assets/write_btn.svg";

const FloatButton = (props) => {
  const { 
    _onClick, 
    bottom, 
    right, 
    top, 
    left, 
    src, 
  } = props;
  const styles = { 
    bottom, 
    right, 
    top, 
    left, 
    src, 
  };

  return (
    <React.Fragment>
      <Float {...styles} onClick={_onClick}>
      </Float>
    </React.Fragment>
  );
};

FloatButton.defaultProps = {
  src: writeBtn,
}

const Float = styled.div`
  position: absolute;
  bottom: ${props => props.bottom};
  right: ${props => props.right};
  top: ${props => props.top};
  left: ${props => props.left};
  width: 53px;
  height: 53px;
  background-image: ${props => props.src && `url(${props.src})`};

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

export default FloatButton;
