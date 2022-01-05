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
    _onClick,
    radius,
    className,
    myIcon,
  } = props;

  const styles = {
    src,
    size,
    width,
    height,
    margin,
    padding,
    _onClick,
    radius,
    className,
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
};

const MyIcon = styled.div`
  width: 3.5em;
  height: 3.5em;
  border-radius: 50%;
  margin-right: 10px;
  background-size: cover;
  background-position: center;
  background: ${(props) => `url(${props.src}) no-repeat center`};
`;

const ElImage = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.radius};
  background: ${(props) =>
    props.src ? `url(${props.src}) no-repeat center` : ""};
  background-size: ${(props) => props.size};
`;

export default Image;
