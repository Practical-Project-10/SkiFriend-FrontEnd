import React from "react";
import { history } from "../redux/ConfigStore";

import { Grid, Text, Image } from "../elements";
import Comment from "../assets/freeBoard/comment.svg";

// react icons
import { AiOutlineHeart } from "react-icons/ai";

const Board = (props) => {
  console.log(props.commentBoard)
  if(props.commentBoard) {
    return(
      <Grid width='100%'>
        <Grid width='100%' margin='0 0 9px 0' is_flex justify='space-between'>
          <Grid is_flex gap='9px'>
            <Text bold>스키보이</Text>
            <Text color='#a3a6ab'>14:21</Text>
          </Grid>
          <Grid is_flex gap='20px'>
            <Grid>
              <Text color='#a3a6ab'>수정</Text>
            </Grid>
            <Text color='#a3a6ab'>삭제</Text>
          </Grid>
        </Grid>
        <Grid>
          <Text>좀 타시네요? 낫 밷~</Text>
        </Grid>
      </Grid>
    )
  };

  return (
    <Grid>
      <Grid padding="9px" display="flex" direction="column" gap="3px">
        <Text
          bold
          width="100%"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          cursor="pointer"
          size="16px"
          _onClick={() => {
            history.push(
              `/freeboarddetail/${props.skiresort}/${props.postId}`
            );
          }}
        >
          {props.title}
        </Text>

        <Grid is_flex justify="space-between">
          <Grid is_flex justify="space-between">
            <Text size="12px" opacity="0.5" margin="0 18px 0 0">
              {props.createdAt}
            </Text>
            <Text size="12px" opacity="0.5">
              {props.nickname}
            </Text>
          </Grid>
          <Grid is_flex>
            <Grid is_flex margin="0 11px 0 0">
              <Grid>
                <AiOutlineHeart size="16" color="#6195CF" />
              </Grid>

              <Text>{props.likeCnt}</Text>
            </Grid>
            <Grid is_flex>
              <Image
                src={Comment}
                width="15px"
                height="13px"
                margin="0 3px 0 0"
              />
              <Text>{props.commentCnt}</Text>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr />
    </Grid>
  );
};

export default Board;
