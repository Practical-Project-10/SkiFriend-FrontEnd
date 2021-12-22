import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    children,
    _onClick,
    className,
  } = props;

  if(className === 'banner') {
    return(
      <Banner>{children}</Banner>
    )
  }

  if(className === 'notification') {
    return(
      <Notification>
        {children}
      </Notification>
    )
  }

  if(className === 'skiNav') {
    return(
      <SkiNav>
        {children}
      </SkiNav>
    )
  }

  if(className === 'skiIcon') {
    return(
      <SkiIcon>
        {children}
      </SkiIcon>
    )
  }

  if(className === 'hotBoard') {
    return(
      <HotBoard>
        {children}
      </HotBoard>
    )
  }

  return (
    <GridBox onClick={_onClick}>
      {children}
    </GridBox>
  );
};

Grid.defaultProps = {
  _onClick: () => {},
};

const GridBox = styled.div`
  border: 1px solid #000;
  padding: 10px;
`;

const Banner = styled.div`
  width: 100%;
  height: 180px;
`

const Notification = styled.div`
  width: 100%;
  height: 30px;
  background: #999;
`

const SkiNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  border: 1px solid #000;
`

const SkiIcon = styled.div`
  width: 33%;
  height: 70px;
  display: flex;
  flex-direction: column;
  /* align-content: center;
  justify-content: center; */
  background: red;
`

const HotBoard = styled.div`
  width: 100%;
  height: 150px;
  margin: 10px auto;
  background: #999;
  border-radius: 10px;
`

export default Grid;
