import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    _name,
    _onClick,
    children,
    padding,
    bg,
    width,
    height,
    color,
    margin,
    smallBtn,
  } = props;

  const styles = {
    bg,
    padding,
    width,
    height,
    color,
    margin,
  };
  if (smallBtn)
    return (
      <React.Fragment>
        <SmallBtn onClick={_onClick} name={_name}>
          {children}
        </SmallBtn>
      </React.Fragment>
    );
  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick} name={_name}>
        {children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: null,
  _onClick: () => {},
  width: "100%",
  padding: "21px 0",
  color: "#FFF",
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  background-color: ${(props) => (props.bg ? props.bg : "#474D56")};
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
`;

const SmallBtn = styled.button`
  color: white;
  background: #6195cf;
  font-weight: 800;
  /* width: 50px; */
  height: 21px;
  border: none;
  border-radius: 40px;
  margin: ${(props) => props.margin};
  font-size: ${(props) => props.size};
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
export default Button;
