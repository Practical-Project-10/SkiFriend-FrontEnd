import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    children,
    _onClick,
    className,
  } = props;

  if(className === 'chatName') {
    return(
      <ChatName>
        {children}
      </ChatName>
    )
  }

  if(className === 'chatContent') {
    return(
      <ChatContent>
        {children}
      </ChatContent>
    )
  }
  
  return (
    <P  onClick={_onClick}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  _onClick: () => {},
};

const P = styled.p`
  margin: 0;
  font-size: 10px;
  color: #666;
`;

const ChatName = styled.p`
  font-size: 12px;
  padding: 2px 0;
  margin: 0;
`

const ChatContent = styled.p`
  font-size: 12px;
  color: #999;
  padding: 2px 0;
  margin: 0;
`

export default Text;
