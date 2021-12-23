import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    width,
    maxWidth,
    padding,
    margin,
    bg,
    color,
    children,
    _onClick,
    position,
    justify,
    height,
    minHeight,
    overflow,
    border,
    radius,
    className,
    align,
    borderB,
    wrap,
    cursor,
    mainFrame,
    navbar,
    header,
    menubar,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    maxWidth: maxWidth,
    height: height,
    minHeight: minHeight,
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
    borderB: borderB,
    wrap: wrap,
    cursor: cursor,
    mainFrame: mainFrame,
  };

  if (mainFrame) {
    return <MainFrame>{children}</MainFrame>;
  }
  if (header) {
    return <Header {...styles}>{children}</Header>;
  }
  if (navbar) {
    return <Navbar {...styles}>{children}</Navbar>;
  }
  if (menubar) {
    return <Menubar {...styles}>{children}</Menubar>;
  }

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  _onClick: () => {},
};

const MainFrame = styled.div`
  width: 100%;
  height: 100%;
  max-width: 412px;
  min-height: 100vh;
  padding: 42px 16px 48px;
  border: 1px solid #000;
  box-sizing: border-box;
`;

const Navbar = styled.div`
  width: 100%;
  height: 30px;
  justify-content: space-around;
  ${(props) => (props.is_flex ? "display: flex; align-items: center;" : "")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  text-align: center;
  padding-top: 10px;
  background: orange;
`;

const Menubar = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 2px solid black;
  justify-content: space-around;
  ${(props) => (props.is_flex ? "display: flex; align-items: center;" : "")};
`;

const GridBox = styled.div`
  width: ${(props) => props.width};
  box-sizing: border-box;
  ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth};` : "")}
  ${(props) => (props.color ? `color: ${props.color};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.minHeight ? `min-height: ${props.minHeight};` : "")}
  ${(props) => (props.justify ? `justify-content: ${props.justify};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.is_flex ? "display: flex; align-items: center;" : "")}
  ${(props) => (props.position ? `position: ${props.position};` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.borderB ? `border-bottom: ${props.borderB};` : "")}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
  ${(props) => (props.overflow ? `overflow: ${props.overflow};` : "")}
  ${(props) => (props.className ? `className: ${props.className};` : "")}
  ${(props) => (props.align ? `text-align: ${props.align};` : "")}
  ${(props) => (props.wrap ? `flex-wrap: ${props.wrap};` : "")}
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  &::-webkit-scrollbar {
    display: none;
  }
  border: 1px solid black;
`;
export default Grid;
