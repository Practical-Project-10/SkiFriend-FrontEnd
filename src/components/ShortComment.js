import React from 'react';

import styled from "styled-components";
import {Grid, Image, Text} from "../elements"

import Board from "../components/Board"

const ShortComment = (props) => {


  return(
    <React.Fragment>
        <Container>
          <CommentBox padding='13px 16px'>
            댓글&nbsp;<Text color='#6195CF'>4</Text>
          </CommentBox>

          <CommentBox>
            <Board commentBoard/>
          </CommentBox>
        </Container>
        
    </React.Fragment>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 80px;
  left: 0;
  width: 100%;
  height: 590px;
  background: #FFF;
  border-radius: 22px 22px 0 0;
`

const CommentBox = styled.div`
  padding: ${props => props.padding? props.padding: '9px 16px'};
  border-bottom: 1px solid #edeeef;
  display: flex;
  align-items: center;
`

export default ShortComment