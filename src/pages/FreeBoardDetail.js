import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boardCreators as boardActions } from "../redux/modules/freeboard";
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

  React.useEffect(() => {
    dispatch(boardActions.getOneBoardDB(postId));
  }, []);

  return (
    <React.Fragment>
      <Grid header>상세게시글</Grid>
      <Grid
        width="50px"
        cursor="pointer"
        _onClick={() => {
          history.goBack();
        }}
      >
        <GrFormPrevious size="40" />
      </Grid>
      <Grid is_flex justify="space-between">
        <Grid is_flex>
          <Text margin="0 10px">{postData.nickname}</Text>
          <Text>{postData.title}</Text>
        </Grid>
        <Grid is_flex>
          {/* 게시글 수정 삭제 modal 시작 */}
          {/* 게시글을 조회한사람이 작성한 사람과 일치할 경우 모달 선택창이 보이게 하기 */}
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

      <Grid is_flex justify="flex-end">
        <Grid is_flex margin="0 5px">
          <AiOutlineHeart />
          <Text>{postData.likeCnt}</Text>
        </Grid>
        <Grid is_flex>
          <BsChat />
          <Text>{postData.commentCnt}</Text>
        </Grid>
        <Grid margin="0 5px">
          <Text>{postData.createdAt}</Text>
        </Grid>
      </Grid>
      <Grid>
        <Grid>
          <Image height="200px" src={postData.image} />
        </Grid>
        <Grid margin="10px 5px">
          <Text>{postData.content}</Text>
        </Grid>
        <Grid>
          <Button smallBtn>공감</Button>
        </Grid>
      </Grid>

      <CommentList />
      {/* <Grid>
        <Text>댓글</Text>
      </Grid>
      <Grid is_flex justify="space-between">
        <Text>닉네임</Text>
        <Grid>
          <Button smallBtn>수정</Button>
          <Button smallBtn>삭제</Button>
        </Grid>
      </Grid>
      <Grid is_flex justify="space-around">
        <Input width="80%" placeholder="댓글작성" />
        <Button smallBtn>작성</Button>
      </Grid> */}
    </React.Fragment>
  );
};

export default FreeBoardDetail;