import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    color,
    size,
    children,
    margin,
    align,
    radius,
    bg,
    bold,
    link,
    padding,
    _onClick,
    cursor,
    boardlink,
    opacity,
  } = props;

  const styles = {
    color,
    size,
    margin,
    bold,
    radius,
    bg,
    align,
    link,
    padding,
    cursor,
    opacity,
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
  size: '14px',
}

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold? 700: 400};
  margin: ${(props) => props.margin};
  margin-bottom: 0;
  padding: ${(props) => props.padding};
  text-align: ${(props) => props.align};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.radius};
  opacity: ${(props) => props.opacity};
  cursor: ${(props) => props.cursor? 'pointer': ''};
  ${(props) => (props.className ? `className: ${props.className};` : "")};
`;

const List = styled.p`
  border-bottom: 2px solid red;
  color: red;
  &:hover {
    opacity: 0.8;
  }
`;



export default Text;
