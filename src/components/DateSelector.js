import React from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

import { Grid } from "../elements/index";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = (props) => {
  // 데이터 넘겨주기 위해 지정
  const { _selectDate } = props;
  // 화면에 보여지는 날짜
  const [date_, setDate_] = React.useState(new Date());

  function sendDate(date) {
    setDate_(date);
    let year = date.getFullYear(); //yyyy
    let month = 1 + date.getMonth(); //Month
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    let day = date.getDate(); //day
    day = day >= 10 ? day : "0" + day; //day 두자리로 저장
    let pickedDate = year + "-" + month + "-" + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
    return _selectDate(pickedDate);
  }

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
        minDate={new Date()}
      />
    </Grid>
  );
};

export default DateSelector;
