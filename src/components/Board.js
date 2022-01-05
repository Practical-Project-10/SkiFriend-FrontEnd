import React from 'react';

import { Grid, Text, Image } from '../elements';
import Heart from "../assets/freeBoard/heart.svg";
import Comment from "../assets/freeBoard/comment.svg";

const Board = (props) => {
  console.log(props)


  return(
    <React.Fragment>
      <Grid>
        <Grid padding='9px' display='flex' direction='column' gap='3px'>
          <Text bold size='16px'>{props.title}</Text>

          <Grid is_flex justify='space-between'>
            <Grid is_flex justify='space-between'>
              <Text size='12px' opacity='0.5' margin='0 18px 0 0'>{props.createdAt}</Text>
              <Text size='12px' opacity='0.5' >{props.nickname}</Text>
            </Grid>
            <Grid is_flex >
              <Grid is_flex margin='0 11px 0 0'>
                <Image src={Heart} width='15px' height='13px' margin='0 3px 0 0'/>
                <Text>{props.likeCnt}</Text>
              </Grid>
              <Grid is_flex>
                <Image src={Comment} width='15px' height='13px' margin='0 3px 0 0'/>
                <Text>{props.commentCnt}</Text>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr/>
      </Grid>
    </React.Fragment>
  )
}

export default Board;