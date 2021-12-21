import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    children,
    className,
    _onClick,
  } = props;

  if(className === 'pageTitle') {
    return(
      <PageTitle>{children}</PageTitle>
    )
  }

  return (
    <p style={{margin:'0'}} onClick={_onClick}>
      {children}
    </p>
  );
};

Text.defaultProps = {
  children: null,
  _onClick: () => {},
};

const PageTitle = styled.p`
  width:'fit-content';
  text-align: center;
  size: 20px;
  font-weight: bold;
`
export default Text;
