import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { commentCreators as commentActions } from "../redux/modules/comment";
import { history } from "../redux/ConfigStore";

import styled from "styled-components";
import { Grid, Input, Text, Image } from "../elements/index";
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

  //-----댓글 수정 내용 가져오기----------
  const postEditComment = (e) => {
    const currentComment = e.target.value;
    setCommentEditValue(currentComment);
  };

  //엔터치면 메세지 보내지게 하기
  const onKeyPress = (e) => {
    if (e.key === "Enter" && commentValue.replace(/\s|/gi, "").length !== 0) {
      addCommentBtn();
    }
  };
  //hi
  //-------댓글 작성-------
  const addCommentBtn = () => {
    if (is_login) {
      if (commentValue.replace(/\s|/gi, "").length !== 0) {
        dispatch(commentActions.addCommentDB(postId, commentValue));
        return setCommentValue("");
      }
      return;
    } else {
      const ask = window.confirm(
        "로그인한 회원만 이용가능합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (ask) {
        return history.push(`/login`);
      }
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
      <Grid bg="#FFF" margin="0 0 80px 0">
        <Grid phoneSize height="40px" borderB="1px solid #ededed">
          <Text padding="10px 0" color="#474D56">
            댓글 {postData.commentCnt}
          </Text>
        </Grid>
        <Grid height="100%">
          {/* 댓글 */}
          {commentArray &&
            commentArray.map((comment, idx) => {
              return (
                <Grid
                  key={comment.commentId}
                  padding="10px 16px"
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
                        autocomplete="off"
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
        <CommentWrite>
          <CommentInput
            placeholder="댓글작성"
            value={commentValue}
            autoComplete="off"
            onKeyPress={onKeyPress}
            onChange={postComment}
          />
          <Send onClick={addCommentBtn}>
            <Image
              src={sendBtn}
              width="30px"
              height="30px"
              position="center"
              size="19px 20px"
              cursor="pointer"
            />
          </Send>
        </CommentWrite>
      </Grid>
    </React.Fragment>
  );
};

const CommentWrite = styled.div`
  width: 100%;
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #fff;
  /* text-align: center; */
`;

const CommentInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 0 auto;
  padding: 16px;
  border: 2px solid #edeeef;
  border-radius: 40px;
  outline: none;
`;

const Send = styled.div`
  width: 30px;
  height: 30px;
  background: #6195cf;
  border-radius: 50%;
  position: absolute;
  top: 25px;
  right: 27px;
`;

export default CommentList;
