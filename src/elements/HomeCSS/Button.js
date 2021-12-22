import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
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
    className,
    smallBtn,
  } = props;

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    disabled: disabled,
    radius: radius,
    bgColor: bgColor,
    opacity: opacity,
    color: color,
    className: className,
  };
  //FreeBoardWrite 시작
  if (smallBtn) {
    return (
      <SmallBtn {...styles} onClick={_onClick}>
        {text ? text : children}
      </SmallBtn>
    );
  }
  //FreeBoardWrite 끝

  return (
    <ElButton {...styles} onClick={_onClick}>
      {text ? text : children}
    </ElButton>
  );
};

Button.defaultProps = {
  children: null,
  _onClick: () => {},
  width: "100%",
};

const SmallBtn = styled.button`
  color: white;
  background: orange;
  font-weight: 800;
  width: 4em;
  margin-right: 1em;
  border: none;
  border-radius: 5px;
`;

//---- 기본 return Button ----
const ElButton = styled.button`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  position: ${(props) => (props.position ? `${props.position}` : "")};
  background-color: ${(props) => (props.bgColor ? `${props.bgColor}` : "")};
  ${(props) => (props.className ? `className: ${props.className}` : "")};
  cursor: pointer;
`;

export default Button;
