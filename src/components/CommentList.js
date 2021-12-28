import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { commentCreators as commentActions } from "../redux/modules/comment";

import { Grid, Button, Input, Text } from "../elements/index";

//react icons
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const CommentList = ({ history }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId;
  const postData = useSelector((state) => state.freeboard.detail);
  const commentArray = useSelector(
    (state) => state.freeboard.detail.commentDtoList
  );

  const nickname = localStorage.getItem("nickname");

  //------useState관리-------
  const [showmodal, setShowModal] = useState();
  const [commentValue, setCommentValue] = useState();

  //-------Modal-------
  const closemodal = () => {
    setShowModal(false);
  };

  //------댓글내용 가져오기------
  const postComment = (e) => {
    const currentComment = e.target.value;
    setCommentValue(currentComment);
  };

  //-------댓글 작성-------
  const addCommentBtn = () => {
    dispatch(commentActions.addCommentDB(postId, commentValue));
  };

  //-------댓글 수정-------
  // const updateCommentBtn = () => {
  //   history.push(`/freeboardedit/${skiresort}/${postId}`);
  // };

  //-------댓글 삭제--------
  // const deleteCommentBtn = () => {
  //   const ask = window.confirm("정말 삭제하시겠습니까?");
  //   if (ask) {
  //     return dispatch(commentActions.deleteBoardDB(postId, skiresort));
  //   } else {
  //     setShowModal(false);
  //     return;
  //   }
  // };
  return (
    <React.Fragment>
      <Grid>
        <Text>댓글</Text>
      </Grid>

      {commentArray &&
        commentArray.map((comment, idx) => {
          return (
            <Grid is_flex justify="space-between" key={idx}>
              <Grid is_flex justify="space-between" width="100%">
                <Grid is_flex>
                  <Text margin="0 10px 0 0">{comment.nickname}</Text>
                  <Text>{comment.content}</Text>
                </Grid>
                <Grid>
                  <Text>{comment.createdAt}</Text>
                </Grid>
              </Grid>

              {/* 채팅글 수정 삭제 modal 시작 */}
              {/* 게시글을 조회한사람이 작성한 사람과 일치할 경우 모달 선택창이 보이게 하기 */}
              <Grid is_flex>
                {nickname === postData.nickname ? (
                  <Grid
                    cursor="pointer"
                    _onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    <BiDotsHorizontalRounded size="20" />
                  </Grid>
                ) : null}
                <div showmodal={showmodal} />
                {showmodal ? (
                  <Grid className="modalBackground" _onClick={closemodal}>
                    <Grid
                      className="modalContainer"
                      _onClick={(e) => e.stopPropagation()}
                    >
                      <Grid margin="25px 0">
                        <BsFillExclamationCircleFill size="30" />
                      </Grid>
                      <Grid margin="10px 0">
                        <Text
                          size="20px"
                          cursor="pointer"
                          // _onClick={updateCommentBtn}
                        >
                          댓글 수정하기
                        </Text>
                      </Grid>
                      <Grid margin="10px 0">
                        <Text
                          size="20px"
                          cursor="pointer"
                          // _onClick={deleteCommentBtn}
                        >
                          댓글 삭제하기
                        </Text>
                      </Grid>
                      <Text
                        _onClick={closemodal}
                        size="18px"
                        margin="20px 0"
                        cursor="pointer"
                      >
                        취소
                      </Text>
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
              {/* modal 끝 */}
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
