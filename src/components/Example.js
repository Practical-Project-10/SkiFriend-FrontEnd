import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Text, Grid } from "../elements/index";
import "../elements/styles.css";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";

// 데이트 피커입니다!!! 이름이 Example 일떄밖에 인식이 안되서 이렇게 일단 놔뒀습니다ㅠㅠ 나중에 수정하겠습니다!
const Example = (props) => {
  const { _selectDate, _value } = props;
  console.log(_value);

  const dateRef = useRef();
  const [date_, setDate_] = React.useState(new Date());

  const sendDate = (date) => {
    setDate_(date);
    console.log(date_);

    const selectDate = dateRef.current.input.value;
    console.log(dateRef.current.input);
    console.log(selectDate);
    console.log(date_);

    _selectDate(selectDate);
    
  };
  
  console.log(date_);
  // function (date) {
  //   console.log(date);
  //   var year = date.getFullYear(); //yyyy
  //   var month = 1 + date.getMonth(); //M
  //   month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  //   var day = date.getDate(); //d
  //   day = day >= 10 ? day : "0" + day; //day 두자리로 저장
  //   return year + "-" + month + "-" + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
  // }
  // const date = sendDate(date_);
  // console.log(date);

  // value 다시 손보기
  return (
    <Grid is_flex justify="center">
      <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={date_}
        onChange={(date) => {
          sendDate(date);
        }}
        // value={_value}
        minDate={new Date()}
        ref={dateRef}
      />
    </Grid>
  );
};

// const Picker = styled(DatePicker)`
//   margin: 5px 10px 5px 10px;
//   width: 100px;
//   box-sizing: border-box;
//   padding: 5px 10px;
//   border-radius: 4px;
//   border: 1px solid #cacaca;
//   font-size: 12px;
// `;

export default Example;
