import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Text, Grid } from "../elements/CarpoolCSS/index";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";


// 데이트 피커입니다!!! 이름이 Example 일떄밖에 인식이 안되서 이렇게 일단 놔뒀습니다ㅠㅠ 나중에 수정하겠습니다!
const Example = () => {
  const HourArray=[];
  const MinuteArray=[0,15,30,45];
  for(let i=0; i < 24; i++){
    HourArray.push(i);
  }


  const [startDate, setStartDate] = useState(new Date());
  return (
    <Grid>
      <Text>날짜</Text>
      <Picker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
      />
      <Grid is_flex>
                  <select>
                      <option value="" >시간</option>
                    {HourArray.map((h, idx) => {
                      return (
                        <option key={idx + "hour"} value="" name="color">
                          {h}
                        </option>
                      );
                    })}
                  </select>
                  <select>
                      <option value="" >분</option>
                    {MinuteArray.map((m, idx) => {
                      return (
                        <option key={idx + "minute"} value="" name="color">
                          {m}
                        </option>
                      );
                    })}
                  </select>
      </Grid>
    </Grid>
    
  );
};

const Picker =styled(DatePicker)`
margin-top: 5px;
width:20vw;
box-sizing: border-box;
padding: 5px 10px;
border-radius : 4px;
border : 1px solid #CACACA;
font-size:12px;
`;
export default Example;

