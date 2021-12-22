import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    width,
    padding,
    margin,
    bg,
    color,
    children,
    _onClick,
    position,
    justify,
    height,
    overflow,
    border,
    radius,
    className,
    align,
    cursor,
    main,
    list,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    height: height,
    margin: margin,
    padding: padding,
    bg: bg,
    color: color,
    position: position,
    justify: justify,
    overflow: overflow,
    border: border,
    radius: radius,
    className: className,
    align: align,
    cursor: cursor,
  };
  //FreeBoardList 시작
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
  //FreeBoardList 끝

  //FreeBoardWrite 시작

  //FreeBoardWrite 끝

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
  ${(props) => (props.color ? `color: ${props.color};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.justify ? `justify-content: ${props.justify};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.is_flex ? "display: flex; align-items: center;" : "")}
  ${(props) => (props.position ? `position: ${props.position};` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
  ${(props) => (props.overflow ? `overflow: ${props.overflow};` : "")}
  ${(props) => (props.className ? `className: ${props.className};` : "")}
  ${(props) => (props.align ? `text-align: ${props.align};` : "")}
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  &::-webkit-scrollbar {
    display: none;
  }
`;
export default Grid;
