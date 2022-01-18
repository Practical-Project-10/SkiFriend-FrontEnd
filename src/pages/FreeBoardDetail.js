import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boardCreators as boardActions } from "../redux/modules/freeboard";
import { likeCreators as likeActions } from "../redux/modules/like";

import CommentList from "../components/CommentList";
import Header from "../components/Header";
import Modal from "../components/Modal";

import styled from "styled-components";
import { Grid, Text } from "../elements/index";
//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
//react icons
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const FreeBoardDetail = ({ history }, props) => {
  const dispatch = useDispatch();
  // 경로
  const params = useParams();
  const postId = params.postId;
  const skiresort = params.skiresort;
  const page = params.page;
  // redux데이터
  const postData = useSelector((state) => state.freeboard.detail);
  const likeList = useSelector((state) => state.like.list);
  const likeData = postData.likesDtoList;
  //localstorage 로그인정보
  const nickname = localStorage.getItem("nickname");
  const login_userId = localStorage.getItem("userId");
  const is_login = localStorage.getItem("is_login");
  const loginCheck = is_login === "true" ? true : false;
  // swiper관리
  SwiperCore.use([Navigation, Pagination]);

  //------useState관리-------
  const [showmodal, setShowModal] = useState(false);
  const [heart, setHeart] = useState(false);

  //-------heart-------
  const changeHeart = () => {
    if (likeList === false) {
      return setHeart(true);
    } else {
      return setHeart(false);
    }
  };

  useEffect(() => {
    if (likeData !== undefined) {
      for (let i = 0; i < likeData.length; i++) {
        if (likeData[i].userId === parseInt(login_userId)) {
          return setHeart(true);
        } else {
          continue;
        }
      }
      setHeart(false);
    }
  }, [postData]);

  useEffect(() => {
    dispatch(boardActions.getOneBoardDB(postId));
  }, []);

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
    if (loginCheck) {
      changeHeart();
      return dispatch(likeActions.addLikeDB(postId));
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
      <Header
        goBack
        push
        page={page}
        _onClick={() => {
          history.push(`/freeboardlist/${skiresort}`);
        }}
        heart={heart}
      >
        자유게시글
      </Header>
      {/* body */}
      <Grid bg="#FFF" minHeight="calc( 100vh - 55px )">
        <Grid phoneSize>
          <Grid
            is_flex
            justify="space-between"
            padding="13px 0"
            borderB="1px solid #474D56"
          >
            <Grid is_flex>
              <Text block size="14px">
                {postData.nickname}
              </Text>
              <div
                style={{
                  height: "13px",
                  margin: "0 12px",
                  border: "1px solid #6195CF",
                }}
              ></div>
              <Text size="16px" bold>
                {postData.title}
              </Text>
            </Grid>
            {/* 게시글을 조회한사람이 작성한 사람과 일치할 경우 모달 선택창이 보이게 하기 */}
            <Grid>
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
              {showmodal ? (
                <Modal
                  height="222px"
                  closeModal={closemodal} //닫기
                  edit={editPost} //수정
                  delete={deletePost} //삭제
                />
              ) : null}
              {/* modal 끝 */}
            </Grid>
          </Grid>
          {/* 좋아요 댓글 시간 */}
          <Grid padding="16px 0" is_flex justify="space-between">
            <Grid>
              <Text size="12px">{postData.createdAt}</Text>
            </Grid>
            <Grid is_flex>
              <Grid is_flex margin="0 11px 0 0">
                {!heart ? (
                  <AiOutlineHeart size="16" color="#6195CF" />
                ) : (
                  <AiFillHeart size="16" color="red" />
                )}
                <Text size="14px">{postData.likeCnt}</Text>
              </Grid>
              <Grid is_flex>
                <BsChat size="15" color="#6195CF" />
                <Text size="14px">{postData.commentCnt}</Text>
              </Grid>
            </Grid>
          </Grid>
          {/* 사진 및 게시글 */}
          <Grid>
            <Grid padding="16px 0">
              <Text>
                {/* 줄개행처리 */}
                {postData.content &&
                  postData.content.split("\n").map((line) => {
                    return (
                      <span>
                        {line}
                        <br />
                      </span>
                    );
                  })}
              </Text>
            </Grid>
            <Grid is_flex width="100%" height="250px" padding="0 16px">
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                style={{ width: "100%" }}
              >
                {postData.photoList &&
                  postData.photoList.map((file, index) => {
                    return (
                      <SwiperSlide key={file + index}>
                        <img
                          src={file.photoUrl}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                          }}
                          alt="userUploadImg"
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </Grid>
            <Small onClick={likeChange}>
              {!heart ? (
                <AiOutlineHeart size="16" color="#FFF" />
              ) : (
                <AiFillHeart size="16" color="red" />
              )}
              <Text color="#FFF" size="12px">
                공감
              </Text>
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
  cursor: pointer;
`;

export default FreeBoardDetail;
