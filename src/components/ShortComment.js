import React from 'react';

import styled, {keyframes} from "styled-components";
import {Grid, Text} from "../elements"

import Board from "../components/Board";
import SendText from "../components/SendText";

const ShortComment = (props) => {


  return(
    <Grid>
      <Background onClick={props.closeModal}></Background>

      <Container>
        <Grid is_flex padding='13px 16px' borderB='1px solid #edeeef'>
          댓글&nbsp;<Text color='#6195CF'>4</Text>
        </Grid>

        <Grid is_flex direction='column'>
          <Board commentBoard/>
        </Grid>
      </Container>

      <CommentInput>
        <SendText/>
      </CommentInput>
    </Grid>
  );
};

// const boxFade = keyframes`
//   0% {
//     opacity: 1;
//     top: 20px;
 
//   }
//   50% {
//     opacity: 0;
//     top: 400px;
//   }
//   100% {
//     opacity: 1;
//     top: 20px;
//   }
// `;
/* animation: ${boxFade} 2s 1s infinite linear alternate; */

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  position: absolute;
  top: 0;
  left: 0;
`

const Container = styled.div`
  position: absolute;
  bottom: 80px;
  left: 0;
  width: 100%;
  height: 66%;
  background: #FFF;
  border-radius: 22px 22px 0 0;
  overflow-y: scroll; 
`

const CommentInput = styled.div`
  width: 100%;
  height: 80px;
  padding: 21px 16px;
  border-top: 2px solid #edeeef;
  background-color: #FFF;
  position: absolute;
  bottom: 0;
  left: 0
`

export default ShortComment