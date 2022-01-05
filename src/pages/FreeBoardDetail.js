import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boardCreators as boardActions } from "../redux/modules/freeboard";
import { likeCreators as likeActions } from "../redux/modules/like";
import CommentList from "../components/CommentList";

import { Grid, Button, Text, Image } from "../elements/index";

//react icons
import { GrFormPrevious } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const FreeBoardDetail = ({ history }, props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId;
  const skiresort = params.skiresort;
  const postData = useSelector((state) => state.freeboard.detail);
  const nickname = localStorage.getItem("nickname");
  console.log(postData);
  //------useState관리-------
  const [showmodal, setShowModal] = useState();

  //-------Modal-------
  const closemodal = () => {
    setShowModal(false);
  };

  //-------게시글 수정-------
  const updatePostBtn = () => {
    history.push(`/freeboardedit/${skiresort}/${postId}`);
  };

  //-------게시글 삭제--------
  const deletePostBtn = () => {
    const ask = window.confirm("정말 삭제하시겠습니까?");
    if (ask) {
      return dispatch(boardActions.deleteBoardDB(postId, skiresort));
    } else {
      setShowModal(false);
      return;
    }
  };

  //-------좋아요 변경---------
  const likeChange = () => {
    dispatch(likeActions.addLikeDB(postId));
  };

  React.useEffect(() => {
    dispatch(boardActions.getOneBoardDB(postId));
  }, []);

  return (
    <React.Fragment>
      <Grid is_flex height="87px" bg="#d9e3ee" padding="30px 0 0 0">
        <Grid
          cursor="pointer"
          _onClick={() => {
            history.push(`/freeboardlist/${skiresort}`);
          }}
        >
          <GrFormPrevious size="40" />
        </Grid>
        <Text
          size="18px"
          bold
          color="#474D56"
          margin="0 auto"
          padding="0 20px 0 0"
        >
          자유게시글
        </Text>
      </Grid>

      <Grid bg="#ffffff" borderB="10px solid #d9e3ee">
        <Grid is_flex justify="space-between" borderB="1px solid #474D56">
          <Grid is_flex margin="15px">
            <Text size="14px">{postData.nickname} |</Text>
            <Text size="16px" bold margin="0 15px">
              {postData.title}
            </Text>
          </Grid>
          <Grid>
            {/* 게시글을 조회한사람이 작성한 사람과 일치할 경우 모달 선택창이 보이게 하기 */}
            {nickname === postData.nickname ? (
              <Grid
                margin="0 15px"
                cursor="pointer"
                _onClick={() => {
                  setShowModal(true);
                }}
              >
                <BiDotsHorizontalRounded size="30" />
              </Grid>
            ) : null}
            {/* 게시글 수정 삭제 modal 시작 */}
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
                    <Text size="20px" cursor="pointer" _onClick={updatePostBtn}>
                      게시글 수정하기
                    </Text>
                  </Grid>
                  <Grid margin="10px 0">
                    <Text size="20px" cursor="pointer" _onClick={deletePostBtn}>
                      게시글 삭제하기
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
            {/* modal 끝 */}
          </Grid>
        </Grid>
        {/* 좋아요 댓글 시간 */}
        <Grid is_flex justify="space-between">
          <Grid margin="10px">
            <Text>{postData.createdAt}</Text>
          </Grid>
          <Grid is_flex justify="flex-end">
            <Grid is_flex>
              <AiOutlineHeart size="18" color="#6195CF" />
              <Text size="14px">{postData.likeCnt}</Text>
            </Grid>
            <Grid is_flex margin="10px">
              <BsChat size="16" color="#6195CF" />
              <Text size="14px">{postData.commentCnt}</Text>
            </Grid>
          </Grid>
        </Grid>
        {/* 사진 및 게시글 */}
        <Grid height="230px">
          <Grid>
            <Image src={postData.image} />
          </Grid>
          <Grid margin="10px 5px">
            <Text margin="10px">{postData.content}</Text>
          </Grid>
        </Grid>
        <Grid padding="16px 10px">
          <Button smallBtn _onClick={likeChange}>
            ♡공감
          </Button>
        </Grid>
      </Grid>

      <CommentList />
    </React.Fragment>
  );
};

export default FreeBoardDetail;
