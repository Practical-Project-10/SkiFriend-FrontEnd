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
    className,
    mainFrame,
    navbar,
    header,
    menubar,
    skiIcon,
    link,
    href,
    target,
    id,
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
  if (className === "modalBackground") {
    return (
      <ModalBackground {...styles} onClick={_onClick}>
        {children}
      </ModalBackground>
    );
  }
  if (className === "modalContainer") {
    return (
      <ModalContainer {...styles} onClick={_onClick}>
        {children}
      </ModalContainer>
    );
  }
  if (link) {
    return (
      <Link {...styles} href={href} target={target}>
        {children}
      </Link>
    );
  }
  if (className === "dropdown") {
    return (
      <Dropdown {...styles} onClick={_onClick}>
        {children}
      </Dropdown>
    );
  }

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick} id={id}>
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
  max-width: 412px;
  min-height: 100vh;
  padding: 42px 16px 48px;
  border: 1px solid #000;
  box-sizing: border-box;
  /* position: relative;
  width: 100%;
  max-width: 412px;
  min-height: 100vh;
  padding: 42px 16px 48px;
  border: 1px solid red;
  height: 100%;
  z-index: 1;
  overflow: scroll;
  background-color: #fff; */
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

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 225px;
  width: 25rem;
  height: 225px;
  background: #ffffff;
  border-radius: 10px;
  text-align: center;
`;

const Link = styled.a`
  font-size: 15px;
`;

const Dropdown = styled.div`
  position: absolute;
  max-height: 150px;
  min-width: 100px;
  top: 175px;
  /* left: 100px; */
  /* transform: translateX(-45%); */
  background-color: var(--bg);
  border: var(--border);
  /* border-radius: var(--border-radius); */
  padding: 1rem;
  overflow-x: scroll;
  transition: height var(--speed) ease;
  z-index: 1;
`;

export default Grid;
