import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, justify, width, children, _onClick, main, list } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    justify: justify,
  };

  if (main) {
    return (
      <Main {...styles} onClick={_onClick}>
        {children}
      </Main>
    );
  }
  if (list) {
    return (
      <List {...styles} onClick={_onClick}>
        {children}
      </List>
    );
  }

  return (
    <GridBox {...styles} onClick={_onClick}>
      {children}
    </GridBox>
  );
};

Grid.defaultProps = {
  _onClick: () => {},
};

//이미지 들어갈 곳
const Main = styled.div`
  height: 13em;
  background: red;
`;
//전체 목록
const List = styled.div`
  padding: 20px;
  height: 384px;
  overflow: scroll;
`;

const GridBox = styled.div`
  width: ${(props) => props.width};
  box-sizing: border-box;
  ${(props) => (props.justify ? `justify-content: ${props.justify};` : "")}
  ${(props) => (props.is_flex ? "display: flex; align-items: center;" : "")}
`;
export default Grid;
