import React from 'react';

import styled from 'styled-components';
import {Grid} from '../elements'

const ShortVideo = (props) => {
  console.log(props.src)

  return(
    <React.Fragment>
      <Grid height='100%' border='2px solid #000'>
        <Video 
          src={props.src}
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
  padding-bottom: 56.25%;
  border: 1px solid red;
  
  position: absolute;
  top: 13%;
  left: 0;
  right: 0;
  margin: 0 auto;
`

export default ShortVideo;