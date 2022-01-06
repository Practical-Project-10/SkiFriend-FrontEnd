import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { commentCreators as commentActions } from "../redux/modules/comment";

import { Grid, Input, Text } from "../elements/index";
import sendBtn from "../assets/chat/send.png";

const CommentList = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId;
  const commentArray = useSelector(
    (state) => state.freeboard.detail.commentDtoList
  );
  const postData = useSelector((state) => state.freeboard.detail);
  const nickname = localStorage.getItem("nickname");
  const is_login = nickname ? true : false;
  //------useState관리-------
  const [commentValue, setCommentValue] = useState();
  const [commentEditValue, setCommentEditValue] = useState();
  const [editCommentNo, setEditCommentNo] = useState();

  //------댓글 입력한 내용 가져오기------
  const postComment = (e) => {
    const currentComment = e.target.value;
    setCommentValue(currentComment);
  };

  const postEditComment = (e) => {
    const currentComment = e.target.value;
    setCommentEditValue(currentComment);
  };

  //-------댓글 작성-------
  const addCommentBtn = () => {
    if (is_login) {
      dispatch(commentActions.addCommentDB(postId, commentValue));
      return setCommentValue("");
    } else {
      window.alert("로그인한 회원만 이용가능합니다.");
      return;
    }
  };

  //-------댓글수정-------
  const updateCommentBtn = (commentId) => {
    setEditCommentNo(commentId);
  };

  //-------댓글수정 전송-------
  const updateSubmitCommentBtn = () => {
    setEditCommentNo(0);
    dispatch(
      commentActions.updateCommentDB(postId, editCommentNo, commentEditValue)
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
      <Grid bg="#ffffff" height="40px">
        <Text padding="10px" color="#474D56">
          댓글 {postData.commentCnt}
        </Text>
      </Grid>
      <Grid bg="#ffffff" height="230px" overflow="scroll">
        {/* 댓글 */}
        {commentArray &&
          commentArray.map((comment, idx) => {
            return (
              <Grid
                key={comment.commentId}
                margin="10px 0"
                padding="10px"
                borderT="1px solid #ededed"
                borderB="1px solid #ededed"
              >
                <Grid is_flex justify="space-between" width="100%">
                  <Grid is_flex>
                    <Text bold margin="0 10px 0 0">
                      {comment.nickname}
                    </Text>
                    <Text size="12px" color="#474D56">
                      {comment.createdAt}
                    </Text>
                  </Grid>

                  {/* 댓글 수정,삭제,변경 */}
                  <Grid is_flex justify="flex-end">
                    {nickname === commentArray[idx].nickname ? (
                      <React.Fragment>
                        {commentArray[idx].commentId === editCommentNo ? (
                          <Grid is_flex>
                            <Grid
                              margin="0 10px"
                              color="#474D56"
                              cursor="pointer"
                              _onClick={() => {
                                updateSubmitCommentBtn();
                              }}
                            >
                              변경
                            </Grid>
                            <Grid
                              color="#474D56"
                              _onClick={() => {
                                setEditCommentNo(0);
                              }}
                              cursor="pointer"
                            >
                              취소
                            </Grid>
                          </Grid>
                        ) : (
                          <Grid is_flex>
                            <Grid
                              margin="0 10px"
                              color="#474D56"
                              cursor="pointer"
                              _onClick={() => {
                                updateCommentBtn(commentArray[idx].commentId);
                              }}
                            >
                              수정
                            </Grid>
                            <Grid
                              color="#474D56"
                              cursor="pointer"
                              _onClick={() => {
                                deleteCommentBtn(commentArray[idx].commentId);
                              }}
                            >
                              삭제
                            </Grid>
                          </Grid>
                        )}
                      </React.Fragment>
                    ) : null}
                    {/* 버튼 끝 */}
                  </Grid>
                </Grid>

                {/* 댓글내용 (수정시 인풋 보여주기) */}
                <Grid margin="5px 0">
                  {commentArray[idx].commentId === editCommentNo ? (
                    <Input
                      free
                      width="390px"
                      height="3px"
                      radius="40px"
                      _defaultValue={comment.content}
                      _onChange={postEditComment}
                    />
                  ) : (
                    <Text>{comment.content}</Text>
                  )}
                </Grid>
              </Grid>
            );
          })}
      </Grid>
      {/* 댓글작성창 */}
      <Grid is_flex padding="20px" bg="#ffffff">
        <Input
          free
          width="360px"
          height="40px"
          radius="40px"
          placeholder="댓글작성"
          _value={commentValue}
          _onChange={postComment}
        />
        <Grid
          src={sendBtn}
          width="30px"
          height="30px"
          bg="#6195CF"
          radius="50%"
          margin="0 -40px 0"
          cursor="pointer"
          _onClick={addCommentBtn}
        />
      </Grid>
    </React.Fragment>
  );
};
export default CommentList;
