import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { commentCreators as commentActions } from "../redux/modules/comment";
import { history } from "../redux/ConfigStore";

import styled from "styled-components";
import { Grid, Input } from "../elements";
import sendBtn from "../assets/send.svg";

const SendText = (props) => {
  const dispatch = useDispatch();
  //params
  const params = useParams();
  const videoId = params.shortsId;
  // useState관리
  const [commentValue, setCommentValue] = useState("");
  //localstorage
  const is_login = localStorage.getItem("is_login");
  const loginCheck = is_login === "true" ? true : false;

  //------댓글 입력한 내용 가져오기------
  const getComment = (e) => {
    const currentComment = e.target.value;
    setCommentValue(currentComment);
  };

  //엔터치면 메세지 보내지게 하기
  const onKeyPress = (e) => {
    if (e.key === "Enter" && commentValue.replace(/\s|/gi, "").length !== 0) {
      addCommentBtn();
    }
  };

  //-------댓글 작성-------
  const addCommentBtn = () => {
    if (loginCheck) {
      if (commentValue.replace(/\s|/gi, "").length !== 0) {
        dispatch(commentActions.addCommentDB(videoId, commentValue));
        return setCommentValue("");
      }
      return;
    } else {
      const ask = window.confirm(
        "로그인한 회원만 이용가능합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (ask) {
        return history.push(`/login`);
      }
    }
  };

  return (
    <React.Fragment>
      <Grid width="100%" is_flex>
        <Input
          send
          placeholder={
            loginCheck ? "댓글작성" : "로그인한 회원만 작성가능 합니다."
          }
          _value={commentValue}
          _onKeyPress={onKeyPress}
          _onChange={getComment}
          _readOnly={!loginCheck}
        />
        <Send src={sendBtn} onClick={addCommentBtn}></Send>
      </Grid>
    </React.Fragment>
  );
};

const Send = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  right: 26px;
  background-color: #6195cf;
  background: #6195cf url(${sendBtn}) no-repeat center;
`;

export default SendText;
