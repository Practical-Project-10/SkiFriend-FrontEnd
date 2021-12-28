import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Text, Grid } from "../elements/index";
import "../elements/styles.css";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";

// 데이트 피커입니다!!! 이름이 Example 일떄밖에 인식이 안되서 이렇게 일단 놔뒀습니다ㅠㅠ 나중에 수정하겠습니다!
const Example = (props) => {
  const [date, setDate] = React.useState(new Date());
  console.log(date.toISOString().slice(0,10));
  const startDate = date.toISOString().slice(0,10);

  return (
    <Grid is_flex justify="center">
      <Grid is_flex>
        <Text width="3em">날짜</Text>
        <Picker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={date}
          onChange={date => setDate(date)}
          minDate={new Date()}
        />
      </Grid>
    </Grid>
  );
};

const Picker = styled(DatePicker)`
  margin: 5px 10px 5px 10px;
  width: 10vw;
  box-sizing: border-box;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #cacaca;
  font-size: 12px;
`;

export default Example;
