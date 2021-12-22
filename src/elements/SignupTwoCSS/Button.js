import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    children,
    _onClick,
  } = props;
  
  return (
    <React.Fragment>
      <ElButton onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};


//---- 기본 return Button ----
const ElButton = styled.button`
  width: 100px;
  padding: 7px;
  margin: 25px auto;
`;

export default Button;
