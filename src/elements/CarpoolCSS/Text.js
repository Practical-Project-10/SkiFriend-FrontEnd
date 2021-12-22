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
    carpoolInfo,
    width,
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
    width,
  };
  if (carpoolInfo) {
    return <CarpoolInfo>{children}</CarpoolInfo>;
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
const CarpoolInfo = styled.text`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 5px;
`;
const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
  ${(props) => (props.className ? `className: ${props.className};` : "")}
  ${(props) => (props.align ? `text-align: ${props.align};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  ${(props) => (props.width ? `width: ${props.width};` : "")}
`;

export default Text;
