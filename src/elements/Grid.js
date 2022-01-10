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
    alignItems,
    borderT,
    line,
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
    hoverOpacity,
    hoverBg,
    className,
    menubar,
    link,
    href,
    target,
    id,
    src,
    gap,
    phoneSize,
    header2,
  } = props;

  const styles = {
    is_flex,
    width,
    maxWidth,
    line,
    height,
    minHeight,
    margin,
    padding,
    alignItems,
    borderT,
    bg,
    color,
    direction,
    position,
    justify,
    display,
    hoverOpacity,
    hoverBg,
    overflow,
    border,
    radius,
    align,
    borderB,
    wrap,
    cursor,
    src,
    gap,
    phoneSize,
  };

  if (header2) {
    return <Header2 {...styles}>{children}</Header2>;
  }

  if (menubar) {
    return <Menubar {...styles}>{children}</Menubar>;
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
  line-height: ${(props) => props.line};
  color: ${(props) => props.color};
  max-width: ${(props) => props.maxWidth};
  min-height: ${(props) => props.minHeight};
  justify-content: ${(props) => props.justify};
  display: ${(props) => props.display};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  position: ${(props) => props.position};
  background: ${(props) => `url(${props.src})`} no-repeat;
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.bg};
  /* background-position: ${(props) => props.position}; */
  border: ${(props) => props.border};
  border-top: ${(props) => props.borderT};
  border-bottom: ${(props) => props.borderB};
  border-radius: ${(props) => props.radius};
  box-sizing: border-box;
  overflow: ${(props) => props.overflow};
  text-align: ${(props) => props.align};
  align-items: ${(props) => props.alignItems};
  flex-wrap: ${(props) => props.wrap};
  flex-direction: ${(props) => props.direction};
  cursor: ${(props) => (props.cursor ? "pointer" : "")};
  &:hover {
    opacity: ${(props) => props.hoverOpacity};
    background: ${(props) => props.hoverBg};
  }
  ${(props) => (props.is_flex ? "display: flex; align-items: center;" : "")}
  ${(props) => (props.className ? `className: ${props.className};` : "")}
  &::-webkit-scrollbar {
    display: none;
  }
  /* border: 1px solid black; */
  gap: ${(props) => props.gap};
  ${(props) =>
    props.phoneSize ? "padding: 0 16px 0;" : ""}/* border: 1px solid black; */
`;

const Menubar = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 2px solid black;
  justify-content: space-around;
  ${(props) => (props.is_flex ? "display: flex; align-items: center;" : "")};
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
  max-height: 250px;
  width: 25rem;
  height: 250px;
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

const Header2 = styled.div`
  width: 100%;
  height: 87px;
  font-size: 22px;
  line-height: 5;
  font-weight: 700;
  background: #d9e3ee;
  padding: 0 16px;
  text-align: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  ${(props) => (props.is_flex ? "display: flex; align-items: center;" : "")}
`;
export default Grid;
