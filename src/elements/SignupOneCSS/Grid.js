import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    children,
    _onClick,
    className,
  } = props;

  if(className === 'title') {
    return(
      <Title onClick={_onClick}>
        {children}
      </Title>
    );
  };

  if(className === 'signupBox') {
    return(
      <SignupBox onClick={_onClick}>
        {children}
      </SignupBox>
    );
  };

  if(className === 'buttonGroup') {
    return(
      <ButtonGroup onClick={_onClick}>
        {children}
      </ButtonGroup>
    );
  };

  return (
    <React.Fragment>
      <GridBox onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  _onClick: () => {},
};

const GridBox = styled.div`
  width: 70%;
  margin: auto;
  border: 1px solid #000;
  text-align: center;
`;

const Title = styled.div`
  margin: 10px 0;
`;

const SignupBox = styled.div`
  width: 100%;
`;

const ButtonGroup = styled.div`
  margin: 15px 0;
`;

export default Grid;
