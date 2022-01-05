import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const {
    src,
    size,
    height,
    width,
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
  shape: "myIcon",
  _onClick: () => {},
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
  border-radius: ${(props) => props.radius};
  background: ${(props) =>
    props.src ? `url(${props.src}) no-repeat center` : ""};
  background-size: ${(props) => props.size};
`;

export default Image;
