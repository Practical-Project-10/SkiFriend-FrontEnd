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
    display,
    height,
    minHeight,
    overflow,
    border,
    radius,
    align,
    borderB,
    wrap,
    direction,
    cursor,
    mainFrame,
    navbar,
    header,
    menubar,
    skiIcon,
  } = props;

  const styles = {
    is_flex,
    width,
    maxWidth,
    height,
    minHeight,
    margin,
    padding,
    bg,
    color,
    direction,
    position,
    justify,
    display,
    overflow,
    border,
    radius,
    align,
    borderB,
    wrap,
    cursor,
    mainFrame,
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
  if (skiIcon) {
    return (
      <SkiIcon {...styles} onClick={_onClick}>
        {children}
      </SkiIcon>
    );
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

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  max-width: ${(props) => props.maxWidth};
  min-height: ${(props) => props.minHeight};
  justify-content: ${(props) => props.justify};
  display: ${(props) => props.display};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  position: ${(props) => props.position};
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderB};
  border-radius: ${(props) => props.radius};
  overflow: ${(props) => props.overflow};
  text-align: ${(props) => props.align};
  flex-wrap: ${(props) => props.wrap};
  flex-direction: ${(props) => props.direction};
  cursor: ${(props) => props.cursor};
  box-sizing: border-box;
  ${(props) => (props.is_flex ? "display: flex; align-items: center;" : "")}
  ${(props) => (props.className ? `className: ${props.className};` : "")}
  &::-webkit-scrollbar {
    display: none;
  }
  border: 1px solid black;
`;

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
  margin: ${(props) => props.margin};
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

const SkiIcon = styled.div`
  width: 33%;
  height: 70px;
  display: flex;
  flex-direction: column;
  background: red;
`;

export default Grid;
