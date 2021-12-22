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

  if(className === 'loginInput') {
    return(
      <LoginBox onClick={_onClick}>
        {children}
      </LoginBox>
    );
  };

  if(className === 'loginButtons') {
    return(
      <LoginButtons onClick={_onClick}>
        {children}
      </LoginButtons>
    );
  };

  if(className === 'socialButtons') {
    return(
      <SocialButtons onClick={_onClick}>
        {children}
      </SocialButtons>
    );
  };

  return (
    <React.Fragment>
      <GridBox  onClick={_onClick}>
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
`

const LoginBox = styled.div`
  width: 100%;
`

const LoginButtons = styled.div`
  width: 130px;
  margin: 15px auto;
`

const SocialButtons = styled.div`
  width: 160px;
  margin: 15px auto;
`

export default Grid;
