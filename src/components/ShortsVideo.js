import React from "react";

import styled from "styled-components";
import { Grid, Text, Image } from "../elements";

const ShortVideo = (props) => {
  if (props.page === "write") {
    return (
      <Video
        src={props.src}
        autoPlay // 자동재생
        loop // 반복 재생
        playsInline
      />
    );
  }
  //
  return (
    <Shorts>
      <ThumbNail src={props.thumbNailPath} alt="썸네일" />
      <Position top={props.top} left={props.left}>
        <Grid is_flex>
          {props.page === "shorts" && (
            <Image myIcon src={props.profileImg} width="22%" height="44px" />
          )}
          <Grid padding="0 0 0 13px">
            <Grid padding="0 0 5px">
              <Text bold size="17px" color="#FFF">
                {props.title}
              </Text>
            </Grid>
            {props.page === "shorts" && (
              <Text size="17px" color="#BDDCFF">
                {props.nickname}
              </Text>
            )}
          </Grid>
        </Grid>
      </Position>
      <Grid>
        <Video
          src={props.videoPath}
          autoPlay // 자동재생
          muted={props.page === "myPage" ? true : false} // 음소거
          loop // 반복 재생
          playsInline
        />
      </Grid>
    </Shorts>
  );
};

const Shorts = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ThumbNail = styled.img`
  width: 100%;
  height: 100%;
  filter: blur(15px);
`;

const Position = styled.div`
  width: 80%;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
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

export default ShortVideo;
