import React from "react";

import styled from "styled-components";
import { Grid, Text, Image } from "../elements/index";

import { useDispatch } from "react-redux";
import { history } from "../redux/ConfigStore";
import { carpoolActions } from "../redux/modules/carpool";
import { chatCreators as chatActions } from "../redux/modules/chat";

import arrow from "../assets/carpoolList/arrow_icon.svg";
import calendar from "../assets/carpoolList/calendar_icon.svg";
import clock from "../assets/carpoolList/clock_icon.svg";
import person from "../assets/carpoolList/person_icon.svg";
import price from "../assets/carpoolList/price_icon.svg";
import etc from "../assets/carpoolList/etc_icon.svg";

const Card = (props) => {
  const dispatch = useDispatch();
  const is_login = localStorage.getItem("is_login");
  const repuest = props.carpoolType === '카풀 요청'
  console.log(repuest)
  const nickname = localStorage.getItem("nickname");
  const is_mine = props.nickname === nickname;

  //------useState관리-------
  const [showmodal, setShowModal] = React.useState();

  //-------Modal-------
  const closemodal = () => {
    setShowModal(false);
  };


  //연락하기 기능
  const connectRoom = (postId) => {
    console.log('성공')
    if (!is_login) {
      const ask = window.confirm(
        "로그인한 회원만 사용 가능합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (ask) {
        return history.push(`/login`);
      } else {
        return;
      }
    }
    return dispatch(chatActions.makeRoomChatDB(postId));
  };

  return (
    <CarpoolCard repuest={repuest} status={!props.status}>
      <Grid>
        <Grid margin="0 0 3px">
          <Text bold color={repuest? '#7281D1': '#6195CF'}>{props.carpoolType}</Text>
        </Grid>
        <Text bold size='20px'>{props.title}</Text>
        <Posts>
          <Text bold>{props.startLocation}</Text>
          <Image src={arrow} width='50px' height='10px'/>
          <Text bold color={repuest? '#7281D1': '#6195CF'}>{props.endLocation}</Text>
        </Posts>
        <Grid is_flex justify='space-between' margin='0 0 7px'>
          <Small repuest={repuest} width="101px">
            <Image src={calendar} width='11px' height='15px'/>
            <Text>{props.date}</Text>
          </Small>
          <Small repuest={repuest} width="61px">
            <Image src={clock} width='11px' height='15px'/>
            <Text>{props.time}</Text>
          </Small>
          <Small repuest={repuest} width="49px">
            <Image src={person} width='11px' height='15px'/>
            <Text>{props.memberNum}명</Text>
          </Small>
          <Small repuest={repuest} width="80px">
            <Image src={price} width='11px' height='15px'/>
            <Text>{props.price}원</Text>
          </Small>
        </Grid>
        <Text>
          <span style={{fontWeight:'700'}}>주의사항</span> : {props.notice}
        </Text>
      </Grid>

      {props.status ? 
        <Grid is_flex>
          {/* 게시글 수정 삭제 modal 시작 */}
          {/* 게시글을 조회한사람이 작성한 사람과 일치할 경우 모달 선택창이 보이게 하기 */}
          {is_mine ?
            <SubMenu width='27px' height='27px' line='41px'>
              <Grid _onClick={() => {setShowModal(true)}}>
                <Image src={etc} width='27px' height='27px'/>
              </Grid>
            </SubMenu> : 
            <SubMenu width='78px' height='27px' line='29px'>
              <Text 
                bold 
                color={repuest? '#7281D1': '#6195CF'}
                _onClick={() => {connectRoom(props.postId)}} 
              >연락하기&gt;</Text>
            </SubMenu>
          }
          <div showmodal={showmodal} />
          {showmodal ?
            <Grid className="modalBackground" _onClick={closemodal}>
              <Grid
                className="modalContainer"
                _onClick={(e) => e.stopPropagation()}
              >
                {/* <Grid margin="25px 0">
                  <BsFillExclamationCircleFill size="30" />
                </Grid> */}
                <Grid margin="10px 0">
                  <Text size="20px" cursor="pointer"
                    _onClick={() => {
                      history.push(`/carpoolwrite/${props.skiResort}/${props.postId}`)
                  }}>
                    수정하기
                  </Text>
                </Grid>
                <Grid margin="10px 0">
                  <Text size="20px" cursor="pointer"
                    _onClick={() => {
                      dispatch(
                        carpoolActions.deleteCarpoolDB(props.skiResort, props.postId)
                      )
                  }}>
                    삭제하기
                  </Text>
                </Grid>
                <Grid margin="10px 0">
                  <Text size="20px" cursor="pointer"
                    _onClick={() => {
                      dispatch(
                        carpoolActions.completeCarpoolDB(props.skiResort, props.postId)
                      )
                  }}>
                    모집 완료
                  </Text>
                </Grid>
                <Text
                  _onClick={closemodal}
                  size="18px"
                  margin="20px 0"
                  cursor="pointer"
                >
                  취소
                </Text>
              </Grid>
            </Grid>
            : null}
      </Grid>
      : null}

    </CarpoolCard>
  );
};

Card.defaultProps = {
  carpoolType: "카풀제공",
  startLocation: "하이원",
  endLocation: "서울",
  date: "2021-12-01",
  time: "17시",
  price: 10000,
  memberNum: 4,
  notice: "장비 가능하지만 5000원 추가입니다^^",
};

const CarpoolCard = styled.div`
  height: 173px;
  background: ${(props) => (props.repuest ? "#D3DBEE" : "#D9E4EE")};
  border-radius: 15px;
  padding: 16px;
  position: relative;

  &::before {
    content: "";
    width: ${(props) => (props.status ? "100%" : "")};
    height: ${(props) => (props.status ? "100%" : "")};
    border-radius: ${(props) => (props.status ? "10px" : "")};
    background: ${(props) => (props.status ? "rgba(0,0,0,0.5)" : "")};
    position: ${(props) => (props.status ? "absolute" : "")};
    top: ${(props) => (props.status ? 0 : "")};
    left: ${(props) => (props.status ? 0 : "")};
  }
`;

const Posts = styled.div`
  width: 160px;
  height: 30px;
  margin: 10px 0 12px;
  background: #FFF;
  border: 1px solid #6195CF;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Small = styled.div`
  width: ${props => props.width};
  height: 22px;
  padding: 0 4px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: ${(props) => (props.repuest ? "#7281D1" : "#6195CF")};
  color: #FFF;
`

const SubMenu = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  line-height: ${props => props.line};
  text-align: center;
  position: absolute;
  top: 10px;
  right: 10px;
  
  &:hover {
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: 999px;
    background: rgba(0,0,0,0.1);
  }
`

export default Card;
