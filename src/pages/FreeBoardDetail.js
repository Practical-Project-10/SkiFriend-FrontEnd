import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boardCreators as boardActions } from "../redux/modules/freeboard";
import { likeCreators as likeActions } from "../redux/modules/like";

import CommentList from "../components/CommentList";
import Header from "../components/Header";
import Modal from "../components/Modal";

import styled from 'styled-components';
import { Grid, Button, Text, Image } from "../elements/index";
import heart from "../assets/freeBoard/heart.svg";
import whiteHeart from "../assets/freeBoard/whiteHeart.svg";
import fillHeart from "../assets/freeBoard/white_heart_fill.svg"

//react icons
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
  const is_login = nickname ? true : false;
  //------useState관리-------
  const [showmodal, setShowModal] = useState();
  //-------Modal-------
  const closemodal = () => {
    setShowModal(false);
  };

  //-------게시글 수정-------
  const editPost = () => {
    history.push(`/freeboardedit/${skiresort}/${postId}`);
  };

  //-------게시글 삭제--------
  const deletePost = () => {
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
    if (is_login) {
      return dispatch(likeActions.addLikeDB(postId));
    } else {
      window.alert("로그인한 회원만 가능합니다.");
      return;
    }
  };

  React.useEffect(() => {
    dispatch(boardActions.getOneBoardDB(postId));
  }, []);

  return (
    <React.Fragment>
      <Header goBack push _onClick={()=>{history.push(`/freeboardlist/${skiresort}`)}}>자유게시글</Header>
      <Grid bg="#FFF" minHeight="calc( 100vh - 55px )">
        <Grid phoneSize >
          <Grid is_flex justify="space-between" padding='13px 0' borderB="1px solid #474D56">
            <Grid is_flex >
              <Text block size="14px">{postData.nickname}</Text>
              <div style={{height: '13px',  margin: '0 12px', border: '1px solid #6195CF'}}></div>
              <Text size="16px" bold margin="">
                {postData.title}
              </Text>
            </Grid>

            <Grid>
              {/* 게시글을 조회한사람이 작성한 사람과 일치할 경우 모달 선택창이 보이게 하기 */}
              {nickname === postData.nickname ? (
                <Grid
                  cursor="pointer"
                  _onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <BiDotsHorizontalRounded size="25" />
                </Grid>
              ) : null}
              {/* 게시글 수정 삭제 modal 시작 */}
              <div showmodal={showmodal} />
              {showmodal
              ? <Modal 
                height='222px'
                closeModal={closemodal}
                edit={editPost}
                delete={deletePost}
              />
              : null}
              {/* modal 끝 */}
            </Grid>
          </Grid>

          {/* 좋아요 댓글 시간 */}
          <Grid padding='16px 0' is_flex justify="space-between">
            <Grid>
              <Text size='12px'>{postData.createdAt}</Text>
            </Grid>
            <Grid is_flex>
              <Grid is_flex margin="0 11px 0 0">
                <AiOutlineHeart size="15" color="#6195CF"/>
                <Text size="14px">{postData.likeCnt}</Text>
              </Grid>
              <Grid is_flex>
                <BsChat size="15" color="#6195CF"/>
                <Text size="14px">{postData.commentCnt}</Text>
              </Grid>
            </Grid>
          </Grid>

          {/* 사진 및 게시글 */}
          <Grid>
            <Grid padding='16px 0'>
              <Text>{postData.content}</Text>
            </Grid>
            <Grid width='100%' height='380px'>
              <Image width="100%" height="100%" size='contain' src={postData.image} />
            </Grid>
            <Small onClick={likeChange}>
              <Image src={whiteHeart} width='17px' height='20px'/>
              <Text color='#FFF' size='12px'>공감</Text>
            </Small>
          </Grid>
        </Grid>

        <div style={{ border: "5px solid #edeeef" }}></div>

        <CommentList />
      </Grid>
    </React.Fragment>
  );
};

const Small = styled.div`
  width: 55px;
  height: 19px;
  margin: 16px 0;
  background: #6195cf;
  border-radius: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
`;

export default FreeBoardDetail;

