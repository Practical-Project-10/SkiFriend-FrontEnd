import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/ConfigStore";
import { likeCreators as likeActions } from "../redux/modules/like";
import { shortsActions } from "../redux/modules/shorts";
import { commentCreators as commentActions } from "../redux/modules/comment";

import styled from "styled-components";
import { Grid, Image, Text } from "../elements";

import FloatButton from "../components/FloatButton";
import shortsBtn from "../assets/shorts/shorts_btn.svg";
import comment from "../assets/shorts/comment.png";

import ShortComment from "./ShortComment";
import ShortVideo from "./ShortsVideo";

//react icons
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ShortsBody = (props) => {
  const dispatch = useDispatch();
  //redux data
  const shortsData = useSelector((state) => state.shorts.shortsList);
  const likeList = useSelector((state) => state.like.shortsLikeList);
  const likeData = shortsData.shortsLikeResponseDtoList;
  //localstorage 로그인정보
  const login_userId = localStorage.getItem("userId");
  const is_login = localStorage.getItem("is_login");
  // useState
  const [showModal, setShowModal] = useState(false);
  const [heart, setHeart] = useState();
  console.log(likeData);
  console.log(likeList);
  useEffect(() => {
    dispatch(shortsActions.getShortsDB());
    if (likeData !== undefined) {
      setTimeout(() => {
        for (let i = 0; i < likeData.length; i++) {
          if (likeData[i].userId === parseInt(login_userId)) {
            return setHeart(true);
          } else {
            continue;
          }
        }
        return setHeart(false);
      }, 1000);
    }
  }, []);

  console.log(heart);
  console.log(likeData);
  //-------heart-------
  const changeHeart = () => {
    if (heart) {
      return setHeart(false);
    } else {
      return setHeart(true);
    }
  };

  //-------좋아요 변경---------
  const likeChange = () => {
    if (is_login) {
      changeHeart();
      dispatch(likeActions.addShortsLikeDB(shortsData.shortsId));
    } else {
      const ask = window.confirm(
        "로그인한 회원만 가능합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (ask) {
        history.push(`/login`);
      }
    }
  };

  const goAddShorts = () => {
    if (is_login) {
      history.push("/shortsupload");
    } else {
      const ask = window.confirm(
        "로그인한 회원만 가능합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (ask) {
        history.push(`/login`);
      }
    }
  };

  return (
    <React.Fragment>
      <Container>
        <IconWrap>
          {/* 프로필 */}
          {/* <Position top="20px" left="16px">
            <Grid is_flex>
              <Image
                myIcon
                src={shortsData.profileImg}
                width="44px"
                height="44px"
              />
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
          </Position> */}

          {/* 다음 동영상 불러오는 버튼 */}
          <Position
            top="50%"
            right="16px"
            onClick={() => dispatch(shortsActions.getShortsDB())}
          >
            <NextBtn>
              →{/* <img src={arrow} width="36" alt="다음 영상" /> */}
            </NextBtn>
          </Position>

          {/* 숏츠 작성 버튼 */}
          <FloatButton
            src={shortsBtn}
            bottom="5%"
            left="16px"
            _onClick={goAddShorts}
          />

          {/* 댓글 갯수 */}
          <Position
            bottom="15%"
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
          <Position bottom="5%" right="16px" onClick={likeChange}>
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

        <ShortVideo page="shorts" {...shortsData} />
      </Container>

      {/* 댓글모달 */}
      {showModal ? (
        <ShortComment
          shortsData={shortsData.shortsId}
          closeModal={() => setShowModal(false)}
        />
      ) : null}
    </React.Fragment>
  );
};

const Container = styled.div`
  height: calc(100vh - 70px);
  position: relative;
`;

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
  height: 100%;
  position: absolute;
  z-index: 2;
`;

const NextBtn = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 999px;
  background-color: #6195cf;
  color: #fff;
  font-size: 50px;
  font-weight: bold;
  /* line-height: 37px; */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.9;
  }
`;

export default ShortsBody;
