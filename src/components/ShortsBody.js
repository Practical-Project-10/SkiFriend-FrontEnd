import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/ConfigStore";
import { likeCreators as likeActions } from "../redux/modules/like";
import { shortsActions } from "../redux/modules/shorts";

import styled from "styled-components";
import { Grid, Image, Text } from "../elements";

import FloatButton from "../components/FloatButton";
import shortsBtn from "../assets/shorts/shorts_btn.svg";
import comment from "../assets/shorts/comment.png";

import ShortComment from "./ShortComment";

import high1 from "../assets/high1_logo.svg"; //임시
//react icons
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Short = (props) => {
  const dispatch = useDispatch();
  //redux data
  const shortsData = useSelector((state) => state.shorts.shortsList);
  const likeList = useSelector((state) => state.like.shortsLikeList);
  const likeData = shortsData.likesDtoList;
  //localstorage 로그인정보
  const login_userId = localStorage.getItem("userId");
  const is_login = localStorage.getItem("is_login");
  // useState
  const [showModal, setShowModal] = useState(false);
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    dispatch(shortsActions.getShortsDB());
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
  }, [shortsData]);

  //-------heart-------
  const changeHeart = () => {
    if (likeList === false) {
      return setHeart(true);
    } else {
      return setHeart(false);
    }
  };

  //-------좋아요 변경---------
  const likeChange = () => {
    if (is_login) {
      changeHeart();
      return dispatch(likeActions.addShortsLikeDB());
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
      <Grid height="calc( 100vh - 70px )" bg="#669900" position="relative">
        {/* 아이콘 */}
        <Grid height="calc( 100vh - 70px )" position="relative">
          {/* 프로필 */}
          <Position top="44px" left="16px">
            <Grid is_flex>
              <Image myIcon src={high1} width="44px" height="44px" />
              <Grid padding="0 0 0 13px">
                <Grid padding="0 0 5px">
                  <Text bold size="17px" color="#FFF">
                    {/* {shortsData.title} */}
                    스키는 이렇게 타는거야
                  </Text>
                </Grid>
                <Text size="17px" color="#BDDCFF">
                  {/* {shortsData.nickname} */}
                  스키보이
                </Text>
              </Grid>
            </Grid>
          </Position>

          {/* 숏츠 작성 버튼 */}
          <FloatButton
            src={shortsBtn}
            bottom="34px"
            left="16px"
            _onClick={() => history.push("/shortsupload")}
          />

          {/* 댓글 */}
          <Position
            bottom="115px"
            right="16px"
            onClick={() => setShowModal(true)}
          >
            <img src={comment} alt="댓글" />
            <Grid margin="-8px 0 0" align="center">
              <Text bold color="#FFF">
                {/* {shortsData.shortsCommentCnt} */}
                10
              </Text>
            </Grid>
          </Position>

          {/* 좋아요 */}
          <Position bottom="34px" right="16px" onClick={likeChange}>
            {!heart ? (
              <Grid margin="-8px 0 0" align="center">
                <AiOutlineHeart size="45" color="#FFF" />
                <Text bold color="#FFF">
                  {/* {shortsData.shortsLikeCnt} */}
                  10
                </Text>
              </Grid>
            ) : (
              <Grid margin="-8px 0 0" align="center">
                <AiFillHeart size="45" color="red" />
                <Text bold color="#FFF">
                  {/* {shortsData.shortsLikeCnt} */}
                  10
                </Text>
              </Grid>
            )}
          </Position>
        </Grid>

        {/* 댓글모달 */}
        {showModal ? (
          <ShortComment closeModal={() => setShowModal(false)} />
        ) : null}
      </Grid>
    </React.Fragment>
  );
};

const Position = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  cursor: pointer;
`;

export default Short;
