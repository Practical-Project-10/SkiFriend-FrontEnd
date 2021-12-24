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
    selectBox,
    wraps,
    navbar,
    head,
    cards
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
    mainFrame: mainFrame
  };

  
  
if(mainFrame) {
    return(
      <MainFrame>{children}</MainFrame>
    )
  }
  
if(wraps) {
    return(
      <Wraps>{children}</Wraps>
    )
  }

  if(selectBox) {
    return(
      <SelectBox>{children}</SelectBox>
    )
  }
  if(navbar) {
    return(
      <Navbar>{children}</Navbar>
    )
  }
  if(head) {
    return(
      <Head>{children}</Head>
    )
  }
if(cards) {
  return(
    <Cards>{children}</Cards>
  )
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
  border: 1px solid #000;
`
const Wraps = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const SelectBox = styled.div`
  margin: 0 auto;
  width: 170px;
  height: 100%;
  display:flex;
  align-items: center;
  padding: 20px;
`;
const Navbar = styled.div`
  background-color: rgb(250, 250, 250);
  border-top: 1px solid rgb(237, 237, 237);
  border-bottom: 1px solid rgb(237, 237, 237);
  display: flex;
  margin-bottom: 20px;
`;
const Head = styled.div`
align-items: center;
margin: 0px auto;
flex-direction: column;
background-color: #C4C4C4;
width: 100%
`;

const Cards = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    border: 1px solid transparent;
    background-color: #EAEAEA;
    height: 220px;
    margin: 10px auto;
    padding: 15px 20px;
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
`;
export default Grid;
