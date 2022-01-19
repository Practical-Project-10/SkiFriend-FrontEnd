import React from 'react';

import styled from "styled-components";
import { Grid, Input, Image } from '../elements';
import sendBtn from "../assets/send.svg";

const SendText = (props) => {

  return(
    <React.Fragment>
      <Grid width='100%' is_flex>
        <Input
          send
          placeholder='댓글을 작성하기.'
          // // _value={message}
          // // _onKeyPress={onKeyPress}
          // // _onChange={messageChat}
        />
        <Send src={sendBtn}></Send>
      </Grid>
    </React.Fragment>
  );
};

const Send = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  right: 26px;
  background-color: #6195cf;
  background: #6195cf url(${sendBtn}) no-repeat center;
`;

export default SendText;