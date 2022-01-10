import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likeCreators as likeActions } from "../redux/modules/like";
import { history } from "../redux/ConfigStore";

import { Grid, Text, Image } from "../elements";
import Comment from "../assets/freeBoard/comment.svg";
// react icons
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
const Board = (props) => {
  const dispatch = useDispatch();
  const [heart, setHeart] = useState(true);
  const is_login = localStorage.getItem("nickname");

  //-------heart-------
  const changeHeart = () => {
    if (heart === false) {
      return setHeart(true);
    } else {
      return setHeart(false);
    }
  };

  //-------좋아요 변경---------
  const likeChange = (postId) => {
    if (is_login) {
      // changeHeart();
      return dispatch(likeActions.addListLikeDB(postId, props.skiresort));
    } else {
      const ask = window.confirm(
        "로그인한 회원만 가능합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (ask) {
        return history.push(`/login`);
      }
    }
  };
  return (
    <React.Fragment>
      <Grid>
        <Grid padding="9px" display="flex" direction="column" gap="3px">
          <Text
            bold
            cursor
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
                <Grid
                  cursor
                  _onClick={() => {
                    likeChange(props.postId);
                  }}
                >
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
    </React.Fragment>
  );
};

export default Board;
