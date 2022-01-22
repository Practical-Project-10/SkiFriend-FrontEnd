import React from "react";

import styled from "styled-components";
import { Grid } from "../elements";

const ShortVideo = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Grid>
        <ThumbNail src={props.thumbNailPath} alt="썸네일" />
        <Video
          src={props.videoPath}
          autoPlay // 자동재생
          muted={props.page === "myPage" ? true : false} // 음소거 -> 안하면 좋겠지만 이거 안하면 자동 재생이 안돼요
          loop // 반복 재생
          playsInline
        ></Video>
      </Grid>
    </React.Fragment>
  );
};

const Title = styled.text`
  padding: 5px;
  font-size: 12px;
  font-weight: 600;
  position: absolute;
  z-index: 2;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  ${(props) => (props.page === "myPage" ? "z-index: 1;" : "")}
`;

const ThumbNail = styled.img`
  width: 100%;
  height: 99%;
  filter: blur(15px);
`;
export default ShortVideo;
