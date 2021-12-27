import React from "react";

import {useDispatch} from 'react-redux';
import {carpoolActions} from '../redux/modules/carpool'

import styled from 'styled-components'
import { Grid, Text, Button, Input } from "../elements/index";
import "../elements/styles.css";

import Example from "../components/Example";
import TimePicker from "../components/TimePicker";

const CarpoolWrite = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(false);
  const [form, setFrom] = React.useState(
    {
      carpoolType: '',
      startLocation: '',
      endLocation: '',
      date: '',
      time: '',
      price: '',
      memberNum: '',
      notice: '',
    }
  );
  const {
    carpoolType,
    startLocation,
    endLocation,
    date,
    time,
    price,
    memberNum,
    notice,
  } = form;

  const handleChange = e => {
    const{name, value} = e.target;

    setFrom(
      {
        ...form,
        [name]: value,
      }
    )
  }
  console.log(form);
  
  const changeLocation = (e) => {
    e.preventDefault();

    if(!state) {
      setState(true);
    } else if(state) {
      setState(false);
    }
  };
  console.log(state)

  const skijang = 'HighOne'
  const write = () => {
    dispatch(carpoolActions.addCarpoolDB(skijang, form))
  }
  
  return (
    <React.Fragment>
        <div>
         <input type='text' name='carpoolType' onChange={handleChange}/>
         <input type='text' name='startLocation' onChange={handleChange}/>
         <input type='text' name='endLocation' onChange={handleChange}/>
         <input type='text' name='date' onChange={handleChange}/>
         <input type='text' name='time' onChange={handleChange}/>
         <input type='text' name='price' onChange={handleChange}/>
         <input type='text' name='memberNum' onChange={handleChange}/>
         <input type='text' name='notice' onChange={handleChange}/>
       </div>
    

    <Grid justify="column">
      
      {/* <Grid
        is_flex
        borderB="1px solid #CACACA"
        padding="10px"
        margin="0 0 20px 0"
      >
        <Text margin="0 auto">카풀 작성 페이지</Text>
      </Grid>

      <Grid borderB="1px solid #CACACA">
        <Grid align="center" border="1px solid #000" padding="10px">
          하이원
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
      </Grid> */}

      {/* <Grid is_flex padding="10px">
        <Text margin="10px">제목 : </Text>
        <Input title type="text" placeholder="제목을 입력해주세요."></Input>
      </Grid> */}


      {/* 출발도착지역 셀렉박스 */}
      {/* <Grid is_flex justify='space-around' selectBox position='relative' direction={state? 'row-reverse': ''} >
          <Grid>
            <select onChange={(e) => e.target}>
              <option>지방</option>
              <option>서울</option>
            </select>
          </Grid>
        <Cross state onClick={changeLocation}>교차</Cross>
        <div className="skiResort">하이원</div>
      </Grid> */}

      {/* <Grid is_flex width="100px">
        <Example />
        <TimePicker />
      </Grid>
      <Grid margin="10px">
        <Text>가격</Text>
        <Input />
        <Text>모집인원</Text>
        <Input />
        <Text>주의사항</Text>
        <Input />
      </Grid> */}
      <Grid margin="10px">
        <Button width="100%" padding="10px" _onClick={write}>
          작성
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
