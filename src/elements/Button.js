import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    _name,
    text,
    _onClick,
    children,
    margin,
    width,
    padding,
    disabled,
    radius,
    bgColor,
    opacity,
    color,
    smallBtn,
    floatBtn,
    placeBtn,
    normalBtn,
  } = props;

  const styles = {
    margin,
    width,
    padding,
    disabled,
    radius,
    bgColor,
    opacity,
    color,
  };

  if (smallBtn) {
    return (
      <SmallBtn {...styles} onClick={_onClick}>
        {text ? text : children}
      </SmallBtn>
    );
  }
  if (floatBtn) {
    return (
      <FloatButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </FloatButton>
    );
  }
  if (placeBtn) {
    return (
      <PlaceBtn {...styles} onClick={_onClick}>
        {text ? text : children}
      </PlaceBtn>
    );
  }
  if (normalBtn) {
    return (
      <React.Fragment>
        <NormalButton onClick={_onClick}>{text ? text : children}</NormalButton>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick} name={_name}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: null,
  _onClick: () => {},
};

//---- 기본 return Button ----
const ElButton = styled.button`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  position: ${(props) => props.position};
  background-color: ${(props) => props.bgColor};
  border: ${(props) => props.border};
  box-sizing: border-box;
  ${(props) => (props.className ? `className: ${props.className}` : "")};
  cursor: pointer;
`;

const SmallBtn = styled.button`
  color: white;
  background: orange;
  font-weight: 800;
  width: 4.5em;
  margin-right: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FloatButton = styled.button`
  font-size: 30px;
  width: 50px;
  height: 50px;
  background: orange;
  border: none;
  border-radius: 50%;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

const PlaceBtn = styled.button`
  width: 90%;
  margin: 10px auto;
  padding: 10px;
`;

const NormalButton = styled.button`
  width: 120px;
  padding: 5px 0;
  margin: 5px auto;
`;

export default Button;
