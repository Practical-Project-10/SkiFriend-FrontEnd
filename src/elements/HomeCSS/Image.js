import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const {
    src,
    _onClick,
  } = props;

  return (
    <React.Fragment>
      <MyProfile src={src} onClick={_onClick} />
    </React.Fragment>
  );
};

Image.defaultProps = {
  _onClick: () => {},
};

const MyProfile = styled.div`
  width: 100%;
  height: 100%;
  background-color:#000;
  background-size: cover;

`;


export default Image;
