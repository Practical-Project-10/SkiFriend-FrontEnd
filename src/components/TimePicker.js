import React from "react";
import { Grid } from "../elements/index";

const TimePicker = (props) => {
  const {
    _name,
    _value,
    _onChange,
  } = props;

  const [time, setTime] = React.useState();
  const hourRef = React.useRef();
  const minuteRef = React.useRef();

  const HourArray = [];
  const MinuteArray = [0, 15, 30, 45];
  for (let i = 0; i < 24; i++) {
    HourArray.push(i);
  }

  const sendTime = () => {
    const hour = hourRef.current.value;
    const minute = minuteRef.current.value;
    
    if(hour && minute) {
      props.selectTime(`${hour}:${minute}`);
    }
  }

  return (
    <Grid is_flex align="center">
      <select onChange={sendTime} ref={hourRef}>
        {HourArray.map((h, idx) => {
          return (
            <option key={idx + "hour"} value={h}>
              {h}
            </option>
          );
        })}
      </select>시
      <select onChange={sendTime} ref={minuteRef}>
        {MinuteArray.map((m, idx) => {
          return (
            <option key={idx + "minute"} value={m} name="color">
              {m}
            </option>
          );
        })}
      </select>분
    </Grid>
  );
};

export default TimePicker;
