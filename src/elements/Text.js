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
    line,
    block,
    width,
    sort,
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
    line,
    block,
    width,
    sort,
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
  color: '#474D56',
}

const P = styled.p`
  width: ${(props) => props.width};
  color: ${(props) => props.color};
  text-decoration: ${(props) => props.deco? 'underline': ''};
  font-size: ${(props) => props.size};
  line-height: ${(props) => props.line};
  font-weight: ${(props) => props.bold? 700: 400};
  text-align: ${(props) => props.sort? props.sort: ''};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.radius};
  opacity: ${(props) => props.opacity};
  display: ${(props) => props.block? 'block': ''};
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
