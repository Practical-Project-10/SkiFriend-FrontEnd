import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    bold,
    color,
    size,
    children,
    margin,
    className,
    align,
    link,
    padding,
    _onClick,
    cursor,
    boardlink,
  } = props;

  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin: margin,
    className: className,
    align: align,
    link: link,
    padding: padding,
    cursor: cursor,
  };

  if (boardlink) {
    return (
      <List {...styles} onClick={_onClick}>
        {children}
      </List>
    );
  }
  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  _onClick: () => {},
};

const List = styled.p`
  border-bottom: 1px solid black;
  color: red;
`;

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
  ${(props) => (props.className ? `className: ${props.className};` : "")}
  ${(props) => (props.align ? `text-align: ${props.align};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
`;

export default Text;
