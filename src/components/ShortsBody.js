import React from "react";

import {history} from "../redux/ConfigStore";

import styled from "styled-components";
import {Grid, Image, Text} from "../elements"

import FloatButton from "../components/FloatButton"
import shortsBtn from "../assets/shorts/shorts_btn.svg"
import comment from "../assets/shorts/comment.png"
import heart from "../assets/shorts/heart.png"

import ShortComment from "./ShortComment";

import high1 from "../assets/high1_logo.svg" //임시

const Short = (props) => {

  return(
    <React.Fragment>
      <Grid
        phoneSize
        minHeight="calc( 100vh - 70px )"
        bg='#669900'
        position='relative'
      >

        {/* 아이콘
        <Grid height='calc( 100vh - 70px )' position='relative'>
          프로필
          <Position top='44px' left='0'>
            <Grid is_flex>
              <Image myIcon src={high1} width='44px' height='44px'/>
              <Grid padding='0 0 0 13px'>
                <Grid padding='0 0 5px'>
                  <Text bold size='17px' color='#FFF'>스키는 이렇게 타는거야</Text>
                </Grid>
                <Text size='17px' color='#BDDCFF'>스키보이</Text>
              </Grid>
            </Grid>
          </Position>

          숏츠 작성 버튼
          <FloatButton src={shortsBtn} bottom='34px' left='0' _onClick={() => history.push('/shortsupload')}/>

          댓글
          <Position bottom='115px' right='0'>
            <img src={comment} alt='댓글'/>
            <Grid margin='-8px 0 0' align='center'>
              <Text bold color='#FFF'>10</Text>
            </Grid>
          </Position>

          좋아요
          <Position bottom='34px' right='0'>
            <img src={heart} alt='좋아요'/>
            <Grid margin='-8px 0 0' align='center'>
              <Text bold color='#FFF'>10</Text>
            </Grid>
          </Position>
        </Grid> */}

        {/* 댓글모달 */}
        <ShortComment/>
      </Grid>
    </React.Fragment>
  );
};

const Position = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  cursor: pointer;
`

export default Short;