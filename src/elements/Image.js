import React from "react";

import styled from "styled-components";
import defaultIMG from "../assets/myPage/profilePicture.png";

const Image = (props) => {
  const {
    src,
    size,
    height,
    width,
    margin,
    padding,
    maxWidth,
    maxHeight,
    bg,
    border,
    _onClick,
    radius,
    className,
    myIcon,
    cursor,
  } = props;

  const styles = {
    src,
    size,
    width,
    height,
    margin,
    maxWidth,
    maxHeight,
    padding,
    cursor,
    _onClick,
    radius,
    bg,
    className,
    border,
  };

  if (myIcon) {
    return (
      <React.Fragment>
        <MyIcon {...styles} onClick={_onClick} />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ElImage {...styles} onClick={_onClick} />
    </React.Fragment>
  );
};

Image.defaultProps = {
  // shape: "myIcon",
  _onClick: () => {},
  src: defaultIMG,
  width: '3.5em',
  height: '3.5em',
};

const MyIcon = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 50%;
  margin-right: 10px;
  background-size: cover;
  background-position: center;
  background: ${(props) => props.src? `url(${props.src}) no-repeat center`: ''};
`;

const ElImage = styled.div`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.height};
  max-height: ${(props) => props.maxHeight};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  cursor: ${(props) => props.cursor};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.radius};
  background: ${(props) => props.src? `url(${props.src}) no-repeat center`: ''};
  background: ${(props) => props.bg};
  background-size: ${(props) => props.size};
`;

export default Image;
