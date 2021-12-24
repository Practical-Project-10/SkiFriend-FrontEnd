import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const {
    src,
    size,
    height,
    width,
    margin,
    _onClick,
    radius,
    className,
    photos,
  } = props;

  const styles = {
    src: src,
    size: size,
    width: width,
    height: height,
    margin: margin,
    _onClick: _onClick,
    radius: radius,
    className: className,
  };

  if (photos) {
    return (
      <React.Fragment>
        <Photos {...styles} onClick={_onClick} />
      </React.Fragment>
    );
  }
};

Image.defaultProps = {
  _onClick: () => {},
};

const Photos = styled.div`
  width: 100%;
  height: "200px";
  display: "block";
  background-size: cover;
  background-position: center;
  ${(props) => (props.src ? `background-image: url(${props.src});` : "")}
`;

export default Image;
