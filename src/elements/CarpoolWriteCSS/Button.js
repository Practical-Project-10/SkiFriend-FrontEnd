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
  
  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: null,
  _onClick: () => {},
  width: "100%",
};



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
