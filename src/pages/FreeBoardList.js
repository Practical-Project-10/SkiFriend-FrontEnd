import React from "react";
import { history } from "../redux/ConfigStore";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boardCreators as boardActions } from "../redux/modules/freeboard";

import { Grid, Text } from "../elements/index";
import Header from "../components/Header";
import CarpoolMenuBar from "../components/CarpoolMenuBar";
import FloatButton from "../components/FloatButton";

//react icon
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";

const FreeBoardList = () => {
  const params = useParams();
  const skiresort = params.skiresort;
  const dispatch = useDispatch();
  const boardList = useSelector((state) => state.freeboard.list);
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
      <Header />
      <Grid height="13em" bg="red">
        {skiresort}
      </Grid>
      <CarpoolMenuBar />
      <Grid padding="20px" height="384px" overflow="scroll">
        <Text>전체</Text>
        {boardList.map((post) => {
          return (
            <Grid is_flex justify="space-between" key={post.postId}>
              <Grid is_flex>
                <Text margin="0 10px 0 0">{post.nickname}</Text>
                <Text
                  margin="0 10px 0 0"
                  cursor="pointer"
                  _onClick={() => {
                    history.push(
                      `/freeboarddetail/${skiresort}/${post.postId}`
                    );
                  }}
                >
                  {post.title}
                </Text>
              </Grid>
              <Grid is_flex>
                <AiOutlineHeart size="17" />
                <Text margin="0 5px 0 0">{post.likeCnt}</Text>
                <BsChat size="15" />
                <Text margin="0 5px 0 0">{post.commentCnt}</Text>
                <Text>{post.createdAt}</Text>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Grid _onClick={moveWritePage}>
        <FloatButton />
      </Grid>
    </React.Fragment>
  );
};
export default FreeBoardList;
