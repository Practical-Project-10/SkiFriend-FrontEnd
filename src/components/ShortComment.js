import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentCreators as commentActions } from "../redux/modules/comment";

import styled, { keyframes } from "styled-components";
import { Grid, Text } from "../elements";

import Board from "../components/Board";
import SendText from "../components/SendText";

const ShortComment = (props) => {
  const dispatch = useDispatch();
  const shortsId = props.shortsData;
  //redux data
  const commentList = useSelector((state) => state.comment.shortsList);

  useEffect(() => {
    dispatch(commentActions.getShortsCommentDB(shortsId));
  }, []);

  //동영상 댓글 페이지
  return (
    <React.Fragment>
      <Background onClick={props.closeModal}></Background>

      <Container>
        <Grid is_flex padding="13px 16px" borderB="1px solid #edeeef">
          댓글&nbsp;
          {commentList && <Text color="#6195CF">{commentList.length}</Text>}
        </Grid>

        <Grid display="flex" direction="column">
          {commentList &&
            commentList.map((item, idx) => {
              return (
                <Grid key={item.shortsCommentId + idx}>
                  <Board
                    page="commentBoard"
                    comment={item}
                    shortsId={shortsId}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Container>
      {/* 댓글 입력창 */}
      <CommentInput>
        <SendText shortsId={shortsId} />
      </CommentInput>
    </React.Fragment>
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
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 19;
`;

const Container = styled.div`
  position: absolute;
  bottom: 80px;
  left: 0;
  width: 100%;
  height: 66%;
  background: #fff;
  border-radius: 22px 22px 0 0;
  overflow-y: scroll;
  z-index: 19;
`;

const CommentInput = styled.div`
  width: 100%;
  height: 80px;
  padding: 21px 16px;
  border-top: 2px solid #edeeef;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 19;
`;

export default ShortComment;
