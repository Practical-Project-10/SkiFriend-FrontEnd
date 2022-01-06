import React from "react";

import styled from "styled-components";
import { Grid, Text, Image } from "../elements";
import { history } from "../redux/ConfigStore";

import Heart from "../assets/freeBoard/heart.svg";
import Comment from "../assets/freeBoard/comment.svg";

const HotPost = (props) => {
  // const skiResort = [
  //   '하이원',
  //   '용평',
  //   '비발디',
  //   '휘닉스',
  //   '웰리힐리',
  //   '곤지암'
  // ]
  return (
    <React.Fragment>
      <Posts>
        <Grid is_flex padding="20px 0">
          <ResortName>{props.skiResort}</ResortName>
          <Grid is_flex justify="space-between" width="100%" gap="66px">
            <Grid width="80%">
              <Text
                _onClick={() => {
                  history.push(``);
                }}
              >
                {props.title}
              </Text>
            </Grid>
            <Grid is_flex width="25%">
              <Grid is_flex margin="0 11px 0 0">
                <Image src={Heart} width="15px" height="13px" />
                <Text>{props.likeCnt}</Text>
              </Grid>
              <Grid is_flex>
                <Image src={Comment} width="15px" height="13px" />
                <Text>{props.commentCnt}</Text>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr />
      </Posts>
    </React.Fragment>
  );
};

const ResortName = styled.div`
  width: 75px;
  height: 21px;
  margin-right: 11px;
  background: #6195cf;
  border-radius: 140px;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  vertical-align: middle;
`;

const Posts = styled.div`
  &:last-child > hr {
    display: none;
  }
`;

export default HotPost;
