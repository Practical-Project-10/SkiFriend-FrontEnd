import React, { useEffect, useState } from "react";
import { history } from "../redux/ConfigStore";
import { useDispatch } from "react-redux";
import { commentCreators as commentActions } from "../redux/modules/comment";

import { Grid, Text, Image, Input } from "../elements";
import Comment from "../assets/freeBoard/comment.svg";
import { AiOutlineHeart } from "react-icons/ai";

const Board = (props) => {
  const { page, comment, shortsId } = props;
  const dispatch = useDispatch();
  //localstorage
  const userId = localStorage.getItem("userId");
  //------useState관리-------
  const [editCommentNo, setEditCommentNo] = useState();
  const [commentEditValue, setCommentEditValue] = useState();

  useEffect(() => {
    if (page === "commentBoard") {
      dispatch(commentActions.getShortsCommentDB(shortsId));
    }
  }, []);

  //-----댓글 수정 내용 가져오기----------
  const editComment = (e) => {
    const currentComment = e.target.value;
    setCommentEditValue(currentComment);
  };

  //-------댓글수정-------
  const updateCommentBtn = (editCommentId) => {
    setEditCommentNo(editCommentId);
  };

  //-------댓글수정 전송-------
  const updateSubmitCommentBtn = () => {
    dispatch(
      commentActions.updateShortsCommentDB(editCommentNo, commentEditValue)
    );
    setEditCommentNo(0);
  };

  //-------댓글 삭제--------
  const deleteCommentBtn = (editCommentId) => {
    const ask = window.confirm("정말 삭제하시겠습니까?");
    if (ask) {
      dispatch(commentActions.deleteShortsCommentDB(editCommentId));
      return;
    } else {
      return;
    }
  };

  //동영상 댓글 컴포넌트
  if (page === "commentBoard") {
    return (
      <Grid width="100%" padding="9px 16px" borderB="1px solid #edeeef">
        <Grid
          width="100%"
          margin="0 0 9px 0"
          display="flex"
          justify="space-between"
        >
          <Grid is_flex gap="9px">
            <Text bold>{comment.nickname}</Text>
            <Text color="#a3a6ab">{comment.createdAt}</Text>
          </Grid>
          {/* 댓글 수정,삭제,변경 */}
          {comment && userId === String(comment.userId) && (
            <Grid is_flex gap="20px">
              <Grid cursor="pointer">
                {comment && comment.shortsCommentId === editCommentNo ? (
                  <Text
                    color="#a3a6ab"
                    _onClick={() => {
                      updateSubmitCommentBtn();
                    }}
                  >
                    변경
                  </Text>
                ) : (
                  <Text
                    color="#a3a6ab"
                    _onClick={() => {
                      updateCommentBtn(comment.shortsCommentId);
                    }}
                  >
                    수정
                  </Text>
                )}
              </Grid>
              <Grid cursor="pointer">
                {comment && comment.shortsCommentId === editCommentNo ? (
                  <Text
                    color="#a3a6ab"
                    _onClick={() => {
                      setEditCommentNo(0);
                    }}
                  >
                    취소
                  </Text>
                ) : (
                  <Text
                    color="#a3a6ab"
                    _onClick={() => {
                      deleteCommentBtn(comment.shortsCommentId);
                    }}
                  >
                    삭제
                  </Text>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
        {/* 댓글내용 (수정시 인풋 보여주기) */}
        <Grid>
          {comment && comment.shortsCommentId === editCommentNo ? (
            <Input
              free
              width="100%"
              height="3px"
              radius="40px"
              autocomplete="off"
              _defaultValue={comment.content}
              _onChange={editComment}
            />
          ) : (
            <Text width="100%" wordWrap="break-word" wordBreak="break-all">
              {comment.content}
            </Text>
          )}
        </Grid>
      </Grid>
    );
  }

  //자유게시판 목록 페이지
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
            history.push(`/freeboarddetail/${props.skiresort}/${props.postId}`);
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
