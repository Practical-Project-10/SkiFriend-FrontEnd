import React from 'react';

import styled from 'styled-components';
import {Grid} from '../elements';

const ShortVideo = (props) => {
  console.log(props.src)

  return(
    <React.Fragment>
      <Grid height='100%'>
        <Video
          src={props.src}
          //고양이 'https://skifriendbucket.s3.ap-northeast-2.amazonaws.com/shorts/ff9f840c-1f59-48f0-83d5-843aa5358a5d%EA%B0%80%EB%A3%A8%EC%BA%A3%EB%8B%A2%EC%98%81%EC%83%81.mp4'
          //재우님 'https://skifriendbucket.s3.ap-northeast-2.amazonaws.com/shorts/3260569f-ead5-4c14-a947-d8052b66c122IMG_4013.mp4'
          autoPlay // 자동재생
          muted // 음소거 -> 안하면 좋겠지만 이거 안하면 자동 재생이 안돼요
          loop // 반복 재생
        >
        </Video>
      </Grid>
    </React.Fragment>
  );
};

const Video = styled.video`
  width: 100%;
  height: 100%;
`

export default ShortVideo;