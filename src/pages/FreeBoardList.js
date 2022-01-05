import React from "react";
import { history } from "../redux/ConfigStore";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boardCreators as boardActions } from "../redux/modules/freeboard";

import { Grid, Image } from "../elements/index";
import CarpoolMenuBar from "../components/CarpoolMenuBar";
import FloatButton from "../components/FloatButton";
import Board from "../components/Board";
import High from "../assets/skiImage/HighOne/HighOne3.png";

import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

const FreeBoardList = () => {
  const params = useParams();
  const skiresort = params.skiresort;
  const dispatch = useDispatch();
  const boardList = useSelector((state) => state.freeboard.list);
  // const page = useSelector((state) => state.carpool.page);
  // const is_loading = useSelector((state) => state.freeboard.is_loading);
  console.log(boardList);
  const is_login = localStorage.getItem("nickname");

  // 게시글 작성 페이지 이동 판단
  const moveWritePage = () => {
    if (is_login) {
      return history.push(`/freeboardwrite/${skiresort}`);
    } else {
      const ask = window.confirm(
        `게시물 등록은 로그인한 회원만 가능합니다. \n 로그인 페지로 이동하시겠습니까?`
      );
      if (ask) {
        return history.push("/login");
      } else {
        return;
      }
    }
  };

  React.useEffect(() => {
    if (boardList.length === 0) {
      dispatch(boardActions.loadBoardDB(skiresort));
    }
  }, []);

  return (
    <React.Fragment>
      <Grid bg="#FFF">
        <Grid header2 align="center">
          {skiresort}
        </Grid>
        <Grid height="291px">
          <Image src={High} size="cover" width="100%" height="100%" />
        </Grid>

        <CarpoolMenuBar />

        <Grid padding="16px">
          {/* <InfinityScroll
            callNext={() => {
              dispatch(boardActions.loadBoardDB(skiresort, page));
            }}
            is_loading={is_loading}
          > */}
          <Board />
          {/* {boardList.map(l => {
              return(
                <Grid 
                  key={l.postId}
                  _onClick={() => {
                    history.push(
                      `/freeboarddetail/${skiresort}/${post.postId}`
                    );
                >
                  <Board {...l}/>
                </Grid>
              )
            })} */}
          {/* </InfinityScroll> */}
        </Grid>
        <FloatButton _onClick={moveWritePage} />
      </Grid>
    </React.Fragment>
  );
};
export default FreeBoardList;
