import React from "react";
import { history } from "../redux/ConfigStore";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boardCreators as boardActions } from "../redux/modules/freeboard";
import { carpoolActions } from "../redux/modules/carpool";

import { Grid, Image } from "../elements/index";
import CarpoolMenuBar from "../components/CarpoolMenuBar";
import FloatButton from "../components/FloatButton";
import Board from "../components/Board";
import Header from "../components/Header";

const FreeBoardList = () => {
  const dispatch = useDispatch();
  //경로
  const params = useParams();
  const skiresort = params.skiresort;
  //redux
  const boardList = useSelector((state) => state.freeboard.list);
  const resortImg = useSelector((state) => state.carpool.resortImg);
  //로그인 판단
  const is_login = localStorage.getItem("is_login");
  const loginCheck = is_login === "true" ? true : false;
  // 게시글 작성 페이지 이동 판단
  const moveWritePage = () => {
    if (loginCheck) {
      return history.push(`/freeboardwrite/${skiresort}`);
    } else {
      const ask = window.confirm(
        `게시물 등록은 로그인한 회원만 가능합니다. 로그인 페이지로 이동하시겠습니까?`
      );
      if (ask) {
        return history.push("/login");
      } else {
        return;
      }
    }
  };

  React.useEffect(() => {
    dispatch(carpoolActions.imageResortDB(skiresort));
    dispatch(boardActions.loadBoardDB(skiresort));
  }, []);

  return (
    <React.Fragment>
      <Header
        goBack
        push
        _onClick={() => {
          history.push("/");
        }}
      >
        {skiresort}
      </Header>
      <Grid bg="#FFF" margin="0 0 70px 0" minHeight="calc( 100vh - 124px )">
        <Grid height="210px">
          <Image src={resortImg} size="cover" width="100%" height="100%" />
        </Grid>
        {/* 메뉴 탭바 */}
        <CarpoolMenuBar />
        {/* body */}
        <Grid margin="16px" height="300px">
          {boardList.map((l) => {
            return (
              <Grid key={l.postId}>
                <Board skiresort={skiresort} {...l} />
              </Grid>
            );
          })}
        </Grid>
        {/* 작성버튼 */}
        <FloatButton _onClick={moveWritePage} />
      </Grid>
    </React.Fragment>
  );
};
export default FreeBoardList;
