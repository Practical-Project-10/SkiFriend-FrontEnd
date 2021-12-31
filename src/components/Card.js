import React from "react";

import styled from 'styled-components';
import { Grid, Text, Button } from "../elements/index";

import { useDispatch } from "react-redux";
import { history } from "../redux/ConfigStore"
import {carpoolActions} from '../redux/modules/carpool';

const Card = (props) => {
  const dispatch = useDispatch();

  const nickname = localStorage.getItem('nickname');
  const is_mine = props.nickname === nickname;

  return (
    <CarpoolCard
      status={!props.status}
      small={props.small}
    >
      {is_mine
        ?<Grid>
          <Button _onClick={() => dispatch(carpoolActions.deleteCarpoolDB(props.skiResort, props.postId))}>삭제</Button>
          <Button _onClick={() => history.push(`/carpoolwrite/${props.skiResort}/${props.postId}`)}>수정</Button>
          <Button _onClick={() => dispatch(carpoolActions.completeCarpoolDB(props.skiResort, props.postId))}>모집 완료</Button>
         </Grid>
        : null
      }
      <Text size="20px" weight="700" marginB="5px">
        [{props.carpoolType}]
      </Text>
      <Text carpoolInfo>{props.startLocation} =&gt;  {props.endLocation} </Text>
      <Text margin="3px">[{props.title}]</Text>
      <Text margin="3px">날짜 : {props.date}</Text>
      <Text margin="3px">시간 : {props.time}</Text>
      <Text margin="3px">인원 : {props.memberNum}</Text>
      <Text margin="3px">카풀 비용 : {props.price}</Text>
      <Text margin="3px">주의사항 : {props.notice}</Text>
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
  width: 90%;//${props => props.small? '50%': '75%'};
  margin: 16px auto;
  background: #eaeaea;
  height: 220px;
  margin: '10px auto';
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  position: relative;
  &::before {
    content: '';
    width: ${props => props.status? '100%': ''};
    height: ${props => props.status? '100%': ''};
    border-radius: ${props => props.status? '10px': ''};
    background: ${props => props.status? 'rgba(0,0,0,0.5)': ''};
    position: ${props => props.status? 'absolute': ''};
    top: ${props => props.status? 0: ''};
    left: ${props => props.status? 0: ''};
  }
`
export default Card;
