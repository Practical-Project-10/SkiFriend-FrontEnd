import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    _onClick,
    children,
    className,
  } = props;

  return (
    <React.Fragment>
      <ElButton onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: null,
  _onClick: () => {},
};

const ElButton = styled.button`
  width: 120px;
  padding: 5px 0;
  margin: 5px auto;
`

export default Button;
