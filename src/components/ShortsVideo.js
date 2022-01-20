import React from "react";

import styled from "styled-components";
import { Grid } from "../elements";

const ShortVideo = (props) => {

  return (
    <React.Fragment>
      <Grid height="100%">
        <Video
          src={props.src}
          autoPlay // 자동재생
          muted // 음소거 -> 안하면 좋겠지만 이거 안하면 자동 재생이 안돼요
          loop // 반복 재생
        ></Video>
      </Grid>
    </React.Fragment>
  );
};

const Video = styled.video`
  width: 100%;
  height: 100%;
`;

export default ShortVideo;
