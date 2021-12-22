import React from 'react';
import { Grid } from "../elements/CarpoolCSS/index";

const TimePicker = () => {
    const HourArray=[];
    const MinuteArray=[0,15,30,45];
    for(let i=0; i < 24; i++){
      HourArray.push(i);
    }
    return (
        
            <Grid is_flex align="center">
                  <select className="selectBox">
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
    );
};

export default TimePicker;