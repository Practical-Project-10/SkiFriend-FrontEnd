import React from "react";
import { Grid, Text } from "../elements/index";

import { useDispatch } from "react-redux";
import {carpoolActions} from '../redux/modules/carpool';

const Card = (props) => {
  const dispatch = useDispatch();
  console.log(props)

  const deleteCarpool = () => {
    dispatch(carpoolActions.deleteCarpoolDB(props.postId));
  }

  return (
    <Grid
      display="flex"
      direction="column"
      width="75%"
      radius="20px"
      bg="#EAEAEA"
      height="220px"
      margin="10px auto"
      padding="15px 20px"
      border="1px solid transparent"
    >
      <button onClick={deleteCarpool}>삭제</button>
      <Text size="20px" weight="700" marginB="5px">
        [{props.carpoolType}]
      </Text>
      <Text carpoolInfo>{props.startLocation} =&gt;  {props.endLocation} </Text>
      <Text margin="3px">날짜 : {props.date}</Text>
      <Text margin="3px">시간 : {props.time}</Text>
      <Text margin="3px">인원 : {props.memberNum}</Text>
      <Text margin="3px">카풀 비용 : {props.price}</Text>
      <Text margin="3px">주의사항 : {props.notice}</Text>
    </Grid>
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
export default Card;
