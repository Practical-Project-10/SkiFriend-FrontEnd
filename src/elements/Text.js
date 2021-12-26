import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    color,
    size,
    children,
    margin,
    marginB,
    align,
    weight,
    link,
    padding,
    _onClick,
    cursor,
    boardlink,
  } = props;

  const styles = {
    color,
    size,
    margin,
    marginB,
    weight,
    align,
    link,
    padding,
    cursor,
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

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginB};
  padding: ${(props) => props.padding};
  text-align: ${(props) => props.align};
  cursor: ${(props) => props.cursor};
  ${(props) => (props.className ? `className: ${props.className};` : "")}
`;

Text.defaultProps = {
  children: null,
  _onClick: () => {},
};

const List = styled.p`
  border-bottom: 2px solid red;
  color: red;
  &:hover {
    opacity: 0.8;
  }
`;

export default Text;
