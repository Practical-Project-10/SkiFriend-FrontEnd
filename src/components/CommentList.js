import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { commentCreators as commentActions } from "../redux/modules/comment";

import { Grid, Button, Input, Text } from "../elements/index";

const CommentList = ({ history }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId;
  const commentArray = useSelector(
    (state) => state.freeboard.detail.commentDtoList
  );
  const nickname = localStorage.getItem("nickname");
  //------useState관리-------
  const [commentValue, setCommentValue] = useState();
  const [editCommentNo, setEditCommentNo] = useState();

  //------댓글 입력한 내용 가져오기------
  const postComment = (e) => {
    const currentComment = e.target.value;
    setCommentValue(currentComment);
  };

  //-------댓글 작성-------
  const addCommentBtn = () => {
    dispatch(commentActions.addCommentDB(postId, commentValue));
  };

  //-------댓글수정-------
  const updateCommentBtn = (commentId) => {
    setEditCommentNo(commentId);
  };

  //-------댓글수정 전송-------
  const updateSubmitCommentBtn = () => {
    setEditCommentNo(0);
    dispatch(
      commentActions.updateCommentDB(postId, editCommentNo, commentValue)
    );
  };

  //-------댓글 삭제--------
  const deleteCommentBtn = (commentId) => {
    const ask = window.confirm("정말 삭제하시겠습니까?");
    if (ask) {
      dispatch(commentActions.deleteCommentDB(postId, commentId));
      return;
    } else {
      return;
    }
  };

  return (
    <React.Fragment>
      <Grid>
        <Text>댓글</Text>
      </Grid>
      {commentArray &&
        commentArray.map((comment, idx) => {
          return (
            <Grid key={comment.commentId}>
              <Grid is_flex justify="space-between" width="100%">
                <Grid is_flex>
                  <Text margin="0 10px 0 0">{comment.nickname}</Text>
                  {/* 댓글수정시 인풋 보여주기 */}
                  {commentArray[idx].commentId === editCommentNo ? (
                    <Input
                      defaultValue={comment.content}
                      _onChange={postComment}
                    >
                      {" "}
                    </Input>
                  ) : (
                    <Text>{comment.content}</Text>
                  )}
                </Grid>
                <Grid>
                  <Text>{comment.createdAt}</Text>
                </Grid>
              </Grid>

              {/* 댓글 수정,삭제,변경 */}
              <Grid is_flex justify="flex-end">
                {nickname === commentArray[idx].nickname ? (
                  <React.Fragment>
                    {commentArray[idx].commentId === editCommentNo ? (
                      <Grid is_flex>
                        <Button
                          smallBtn
                          cursor="pointer"
                          _onClick={() => {
                            updateSubmitCommentBtn();
                          }}
                        >
                          변경
                        </Button>
                        <Button
                          smallBtn
                          _onClick={() => {
                            setEditCommentNo(0);
                          }}
                          cursor="pointer"
                        >
                          취소
                        </Button>
                      </Grid>
                    ) : (
                      <Grid is_flex>
                        <Button
                          smallBtn
                          cursor="pointer"
                          _onClick={() => {
                            updateCommentBtn(commentArray[idx].commentId);
                          }}
                        >
                          수정
                        </Button>
                        <Button
                          smallBtn
                          cursor="pointer"
                          _onClick={() => {
                            deleteCommentBtn(commentArray[idx].commentId);
                          }}
                        >
                          삭제
                        </Button>
                      </Grid>
                    )}
                  </React.Fragment>
                ) : null}
              </Grid>
              {/* 버튼 끝 */}
            </Grid>
          );
        })}

      <Grid is_flex margin="10px 0" justify="space-around">
        <Input width="80%" placeholder="댓글작성" _onChange={postComment} />
        <Button smallBtn _onClick={addCommentBtn}>
          작성
        </Button>
      </Grid>
    </React.Fragment>
  );
};
export default CommentList;
