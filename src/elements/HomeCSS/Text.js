import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    children,
    _onClick,
    size,
  } = props;

  const style = {
    size,
  }

  return (
    <Span {...style} onClick={_onClick}>
      {children}
    </Span>
  );
};

const Span = styled.span`
  font-size: ${props => props.size? props.size: ''};
`

export default Text;
