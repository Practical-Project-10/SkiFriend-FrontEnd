import React, { useState, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import styled from "styled-components";
import { Grid, Text, Button, Input } from "../elements/index";
import CarpoolSelect from "../components/CarpoolSelect";


const CarpoolWrite = (props) => {
  const dispatch = useDispatch();
  const carpool_list = useSelector((state) => state.carpool.list);
  const [state, setState] = useState(false);

  const skiResort = props.match.params.skiresort;
  const startLoca = useRef();
  const endLoca = useRef();
  const city_name = [
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "강원",
    "경기",
    "경남",
    "경북",
    "전남",
    "전북",
    "제주",
    "충남",
    "충북",
  ];
  //수정페이지
  const postId = props.match.params.postId;
  const is_edit = postId ? true : false;
  const carpool = is_edit
    ? carpool_list.find((l) => l.postId === Number(postId))
    : null;

  const [form, setForm] = React.useState({
    carpoolType: `${carpool ? carpool.carpoolType : ""}`,
    startLocation: `${carpool ? carpool.startLocation : ""}`,
    endLocation: `${carpool ? carpool.endLocation : skiResort}`,
    date: `${carpool ? carpool.date : ""}`,
    time: `${carpool ? carpool.time : ""}`,
    title: `${carpool ? carpool.title : ""}`,
    price: `${carpool ? carpool.price : ""}`,
    memberNum: `${carpool ? carpool.memberNum : ""}`,
    notice: `${carpool ? carpool.notice : ""}`,
  });
  const {
    carpoolType,
    startLocation,
    endLocation,
    date,
    time,
    title,
    price,
    memberNum,
    notice,
  } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const bringDate = (date) => {
    console.log(date);
    setForm({
      ...form,
      date,
    });
  };

  const bringForm = (name, value) => {
    console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  console.log(form);

  const addCarpool = () => {
    dispatch(carpoolActions.addCarpoolDB(skiResort, form));
  };
  const editCarpool = () => {
    dispatch(carpoolActions.editCarpoolDB(postId, form));
  };

  return (
    <React.Fragment>
      <Grid bg='#FFF'>
        
        <CarpoolSelect bringForm={bringForm} bringDate={bringDate}/>

        {/* <div style={{border: '5px solid #edeeef'}}></div> */}
        <hr/>

        <Grid phoneSize margin="50px 0 0" display='flex' direction='column' gap='33px'>
          <Input
            blue
            type="text"
            _maxLength="15"
            _name="title"
            _value={title}
            _onChange={handleChange}
            placeholder='제목을 입력해주세요.'
            padding='19px 8px'
          />

          <Input 
            blue
            type="number"
            label='가격' 
            _name="price" 
            _value={price} 
            _onChange={handleChange} 
            placeholder='숫자만 입력해주세요.'
            padding='19px 8px'
          />

          <Grid>
            <Text size='12px' color='#6195CF'>모집인원</Text>
            <Select
              name="memberNum"
              defaultValue="default"
              onChange={handleChange}
            >
              <option value="0">선택</option>
              <option value="1">1명</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
              <option value="5">5인이상</option>
            </Select>
          </Grid>

          <Input
            blue 
            label='주의사항'
            type="text"
            _maxLength="15"
            _name="notice"
            _value={notice}
            _onChange={handleChange}
            placeholder='주의사항을 입력해주세요.'
            padding='19px 8px'
          />
        
          <Grid padding='0 0 16px'>
            <Button
              _onClick={is_edit ? editCarpool : addCarpool}
            >
              {is_edit ? "수정" : "작성"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Select = styled.select`
  width: 100%;
  padding: 18px 5px;
  border-radius: 6px;
`

export default CarpoolWrite;
