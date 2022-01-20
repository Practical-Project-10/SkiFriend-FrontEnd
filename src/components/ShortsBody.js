import React, {useState, useEffect} from "react";

import {history} from "../redux/ConfigStore";
import { useDispatch, useSelector } from "react-redux";
import { shortsActions } from "../redux/modules/shorts";

import styled from "styled-components";
import {Grid, Image, Text} from "../elements"

import FloatButton from "../components/FloatButton"
import shortsBtn from "../assets/shorts/shorts_btn.svg"
import comment from "../assets/shorts/comment.png"
import heart from "../assets/shorts/heart.png"

import ShortComment from "./ShortComment";
import ShortVideo from "./ShortsVideo";

import high1 from "../assets/high1_logo.svg" //임시

const Short = (props) => {
  const dispatch = useDispatch();


  const [showModal, setShowModal] = useState(false);
  console.log(showModal)

  useEffect(() => { dispatch(shortsActions.getShortsDB()); }, []);
  
  return(
    <React.Fragment>
      <Grid
        height="calc( 100vh - 70px )"
        bg='#669900'
        position='relative'
      >
        {/* 아이콘 */}
        <IconWrap>
          {/* 프로필 */}
          <Position top='44px' left='16px'>
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

          {/* 숏츠 작성 버튼 */}
          <FloatButton src={shortsBtn} bottom='34px' left='16px' _onClick={() => history.push('/shortsupload/shortid')}/>

          {/* 댓글 */}
          <Position bottom='115px' right='16px' onClick={() => setShowModal(true)}>
            <img src={comment} alt='댓글'/>
            <Grid margin='-8px 0 0' align='center'>
              <Text bold color='#FFF'>10</Text>
            </Grid>
          </Position>

          {/* 좋아요 */}
          <Position bottom='34px' right='16px'>
            <img src={heart} alt='좋아요'/>
            <Grid margin='-8px 0 0' align='center'>
              <Text bold color='#FFF'>10</Text>
            </Grid>
          </Position>
        </IconWrap>

        {/* 댓글모달 */}
        {showModal
        ? <ShortComment
            closeModal={() => setShowModal(false)}
          /> 
        : null
        }

        <ShortVideo/>
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
  cursor: 'pointer';
`

const IconWrap = styled.div`
  width: 100%;
  height: calc( 100vh - 70px );
  position: absolute;
  z-index: 1px;
`

export default Short;