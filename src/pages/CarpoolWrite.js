import React, {useState, useRef} from "react";

import {useDispatch, useSelector} from 'react-redux';
import {carpoolActions} from '../redux/modules/carpool'

import styled from 'styled-components'
import { Grid, Text, Button, Input } from "../elements/index";
import "../elements/styles.css";

import Example from "../components/Example";
import TimePicker from "../components/TimePicker";
import { inputClasses } from "@mui/material";

const CarpoolWrite = (props) => {
  const dispatch = useDispatch();
  const carpool_list = useSelector(state => state.carpool.list);
  console.log(carpool_list)
  const [state, setState] = useState(false);

  const skiResort = props.match.params.skiresort;
  const [startLoca, setStartLoca] = useState('');
  const [endLoca, setEndLoca] = useState(skiResort);
  
  const postId = props.match.params.postId;
  const is_edit = postId? true: false;
  const carpool = is_edit? carpool_list.find(l => l.postId === Number(postId)): null;

  const [form, setFrom] = React.useState(
    {
      carpoolType: `${carpool? carpool.carpoolType: ''}`,
      startLocation: `${carpool? carpool.startLocation: ''}`,
      endLocation: `${carpool? carpool.endLocation: endLoca}`,
      date: `${carpool? carpool.date: ''}`,
      time: `${carpool? carpool.time: ''}`,
      title: `${carpool? carpool.title: ''}`,
      price: `${carpool? carpool.price: ''}`,
      memberNum: `${carpool? carpool.memberNum: ''}`,
      notice: `${carpool? carpool.notice: ''}`,
    }
  );
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

  const handleChange = e => {
    const{ name, value } = e.target;
    console.log(name, value);

    if(name === 'startLocation') {
      setStartLoca(value);
      console.log(startLoca);
    }

    setFrom(
      {
        ...form,
        [name]: value,
      }
    )
  }

  const locationChange = () => {
    if(!state) {
      setState(true);
      setStartLoca(endLoca);
      setEndLoca(startLoca);
    } else {
      setState(false);
      setStartLoca(endLoca);
      setEndLoca(startLoca);
    }
    console.log(startLoca)
    console.log(endLoca)
    console.log(form);

    setFrom(
      {
        ...form,
        startLocation: startLoca,
        endLocation: endLoca,
      }
    )

  };
  
  const addCarpool = () => {
    dispatch(carpoolActions.addCarpoolDB(skiResort, form))
  }
  const editCarpool = () => {
    dispatch(carpoolActions.editCarpoolDB(postId, form))
  }
  
  return (
    <React.Fragment>
      <Grid justify="column">
        
        <Grid
          is_flex
          borderB="1px solid #CACACA"
          padding="10px"
          margin="0 0 20px 0"
        >
          <Text margin="0 auto">카풀 작성 페이지</Text>
        </Grid>

        <Grid borderB="1px solid #CACACA">
          <Grid align="center" border="1px solid #000" padding="10px">
            {skiResort}
          </Grid>
          <Grid is_flex margin="10px 15px">
            <input
              type='radio'
              name='carpoolType'
              value='카풀요청'
              onChange={handleChange}
            />카풀요청
            <input
              type='radio'
              name='carpoolType'
              value='카풀제공'
              onChange={handleChange}
            />카풀제공
          </Grid>
        </Grid>

        {/* <Grid is_flex padding="10px">
          <Text margin="10px">제목 : </Text>
          <Input title type="text" placeholder="제목을 입력해주세요."></Input>
        </Grid> */}


        {/* 출발도착지역 셀렉박스 */}
        <Grid is_flex justify='space-around' selectBox position='relative' direction={state? 'row-reverse': ''} >
            <Grid>
              <select name='startLocation' value={startLocation} onChange={handleChange}>
                <option value='지방'>지방</option>
                <option value='서울'>서울</option>
              </select>
            </Grid>
          <Cross state onClick={locationChange}>교차</Cross>
          <label htmlFor="endLocation" style={{ border:'1px solid #000'}}>{skiResort}</label>
          <input type='text' id="endLocation" name='endLocation' value={endLocation} style={{display:"none"}}/>
        </Grid>

        <Grid is_flex width="300px">
          <Example _name='date' _onChange={e => console.log(e.target)} />
          <TimePicker />
        </Grid>
        <Grid margin="10px">
          <Text>제목</Text>
          <Input _name='title' _onChange={handleChange}/>
          <Text>가격</Text>
          <Input _name='price' _onChange={handleChange}/>
          <Text>모집인원</Text>
          <Input _name='memberNum' _onChange={handleChange}/>
          <Text>주의사항</Text>
          <Input _name='notice' _onChange={handleChange}/>
        </Grid>
        <Grid margin="10px">
          <Button width="100%" padding="10px" _onClick={is_edit? editCarpool: addCarpool}>
            {is_edit? '수정': '작성'}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Cross = styled.div`
  width: 30px;
  height: 20px;
  border: 1px solid #000;
  cursor: pointer;
`

export default CarpoolWrite;
