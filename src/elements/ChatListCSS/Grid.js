import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    className,
    children,
    _onClick,
    align
  } = props;

  const styles = {
    align,
  };

  if(className === 'chatBox') {
    return (
      <ChatBox>
        {children}
      </ChatBox>
    )
  }

  if(className === 'chatEl') {
    return (
      <ChatEl>
        {children}
      </ChatEl>
    )
  }

  if(className === 'chatTime') {
    return (
      <ChatTime>
        {children}
      </ChatTime>
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

const GridBox = styled.div`
  border: 1px solid #000;
  /* width: 100%; */
  text-align: ${props => props.align? props.align: ''};
`;

const ChatBox = styled.div`
border: 1px solid #000;
  width: 100%;
  padding: 10px;
  box-sizing: border-Box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ChatEl = styled.div`
  border: 1px solid #000;
  display: flex;
  align-items: center;
`

const ChatTime = styled.div`
  height: 42px;
  display: flex;
  align-items: start;
  border: 1px solid #000;
`

export default Grid;
