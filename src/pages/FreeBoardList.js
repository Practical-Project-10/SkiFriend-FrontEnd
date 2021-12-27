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
  const dispatch = useDispatch();

  const boardList = useSelector((state) => state.freeboard.list);
  console.log(boardList);

  return (
    <React.Fragment>
      <Header />
      <Grid height="13em" bg="red">
        하이원
      </Grid>
      <CarpoolMenuBar />
      <Grid padding="20px" height="384px" overflow="scroll">
        <Text>전체</Text>
        {boardList.map((post, idx) => {
          return (
            <Grid is_flex justify="space-between">
              <Grid is_flex>
                <Text margin="0 10px 0 0">{post.nickname}</Text>
                <Text
                  margin="0 10px 0 0"
                  cursor="pointer"
                  _onClick={() => {
                    history.push(`/freeboarddetail/${post.title}`);
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
      <Grid
        _onClick={() => {
          history.push(`/freeboardwrite/${params.skiresort}`);
        }}
      >
        <FloatButton />
      </Grid>
    </React.Fragment>
  );
};
export default FreeBoardList;
