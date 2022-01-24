import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/ConfigStore";
import { likeCreators as likeActions } from "../redux/modules/like";
import { shortsActions } from "../redux/modules/shorts";

import styled from "styled-components";
import { Grid, Text } from "../elements";

import shortsBtn from "../assets/shorts/addShorts_btn.png";
import comment from "../assets/shorts/comment.png";
import heart_ from "../assets/shorts/heart.png";
import fillHeart from "../assets/shorts/fillHeart.png";
import nextShortBtn from "../assets/shorts/nextShort_btn.png";

import ShortComment from "./ShortComment";
import ShortVideo from "./ShortsVideo";


const ShortsBody = (props) => {
  const dispatch = useDispatch();
  //params
  const params = useParams();
  const shortsId = params.shortsId;
  //redux data
  const shortsData = useSelector((state) => state.shorts.shortsList);
  const likeData = shortsData.shortsLikeResponseDtoList;
  //localstorage 로그인정보
  const login_userId = localStorage.getItem("userId");
  const is_login = localStorage.getItem("is_login");
  
  // useState
  const [showModal, setShowModal] = useState(false);
  const [heart, setHeart] = useState(false);

  //-------heart-------
  const changeHeart = () => {
    if (heart) {
      return setHeart(false);
    } else {
      return setHeart(true);
    }
  };

  useEffect(() => {
    dispatch(shortsActions.getShortsDB());
  }, []);

  useEffect(() => {
    console.log('test1')
    if (likeData !== undefined) {
      console.log('test2')
      for (let i = 0; i < likeData.length; i++) {
        if (likeData[i].userId === parseInt(login_userId)) {
          return setHeart(true);
        } else {
          continue;
        }
      }
      return setHeart(false);
    }
  }, [shortsId]);


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
          {/* 다음 동영상 불러오는 버튼 */}
          <Position
            bottom="4%"
            left="16px"
            onClick={() => dispatch(shortsActions.getShortsDB())}
          >
            <img src={nextShortBtn} alt="다음 동영상" />
          </Position>

          {/* 숏츠 작성 버튼 */}
          <Position
            bottom="23%"
            right="21px"
            onClick={goAddShorts}
          >
            <img src={shortsBtn} alt="작성" />
          </Position>

          {/* 댓글 갯수 */}
          <Position
            bottom="13%"
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
          <Position bottom="4%" right="16px" onClick={likeChange}>
            <img src={heart? fillHeart: heart_} alt="댓글" />
            <Grid margin="-8px 0 0" align="center">
              <Text bold color="#FFF">
                {shortsData.shortsLikeCnt}
              </Text>
            </Grid>
          </Position>
        </IconWrap>

        <ShortVideo page="shorts" top="5%" left="16px" {...shortsData} />
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

export default ShortsBody;
