import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/ConfigStore";
import { likeCreators as likeActions } from "../redux/modules/like";
import shorts, { shortsActions } from "../redux/modules/shorts";

import styled from "styled-components";
import { Grid, Image, Text } from "../elements";

import FloatButton from "../components/FloatButton";
import shortsBtn from "../assets/shorts/shorts_btn.svg";
import comment from "../assets/shorts/comment.png";

import ShortComment from "./ShortComment";
import ShortVideo from "./ShortsVideo";

//react icons
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Short = (props) => {
  const dispatch = useDispatch();
  //redux data
  const shortsData = useSelector((state) => state.shorts.shortsList);
  const likeList = useSelector((state) => state.like.shortsLikeList);
  const likeData = shortsData.shortsLikeResponseDtoList;
  //localstorage 로그인정보
  const login_userId = localStorage.getItem("userId");
  const is_login = localStorage.getItem("is_login");

  // console

  // useState
  const [showModal, setShowModal] = useState(false);
  const [heart, setHeart] = useState(false);
  // console.log(shortsData);
  // console.log(likeList);

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
  }, []);

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
      return dispatch(
        likeActions.addShortsLikeDB(
          shortsData.shortsId,
          shortsData.shortsCommentCnt
        )
      );
    } else {
      const ask = window.confirm(
        "로그인한 회원만 가능합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (ask) {
        return history.push(`/login`);
      }
    }
  };

  return(
    <React.Fragment>
      <Container>
        {/* 아이콘 */}
        <IconWrap>
          {/* 프로필 */}
          <Position top="44px" left="16px">
            <Grid is_flex>
              <Image myIcon src={shortsData.profileImg} width="44px" height="44px" />
              <Grid padding="0 0 0 13px">
                <Grid padding="0 0 5px">
                  <Text bold size="17px" color="#FFF">
                    {shortsData.title}
                  </Text>
                </Grid>
                <Text size="17px" color="#BDDCFF">
                  {shortsData.nickname}
                </Text>
              </Grid>
            </Grid>
          </Position>

          {/* 숏츠 작성 버튼 */}
          <FloatButton src={shortsBtn} bottom='34px' left='16px' _onClick={() => history.push('/shortsupload')}/>

          {/* 댓글 */}
          <Position
            bottom="115px"
            right="16px"
            onClick={() => setShowModal(true)}
          >
            <img src={comment} alt="댓글" />
            <Grid margin="-8px 0 0" align="center">
              <Text bold color="#FFF">
                {shortsData.shortsCommentCnt}
              </Text>
            </Grid>
          </Position>

          {/* 좋아요 */}
          <Position bottom="34px" right="16px" onClick={likeChange}>
            {!heart ? (
              <Grid margin="-8px 0 0" align="center">
                <AiOutlineHeart size="45" color="#FFF" />
                <Text bold color="#FFF">
                  {shortsData.shortsLikeCnt}
                </Text>
              </Grid>
            ) : (
              <Grid margin="-8px 0 0" align="center">
                <AiFillHeart size="45" color="red" />
                <Text bold color="#FFF">
                  {shortsData.shortsLikeCnt}
                </Text>
              </Grid>
            )}
          </Position>
        </IconWrap>

        {/* 댓글모달 */}
        {showModal ? (
          <ShortComment
            shortsData={shortsData}
            closeModal={() => setShowModal(false)}
          />
        ) : null}

        <ShortVideo src={shortsData.videoPath}/>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  height: calc( 100vh - 70px );
  background-color: rgba(0,0,0,0.6);
  position: relative;
`

const Position = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  cursor: pointer;
`;

const IconWrap = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  position: absolute;
  z-index: 1;
`

export default Short;
