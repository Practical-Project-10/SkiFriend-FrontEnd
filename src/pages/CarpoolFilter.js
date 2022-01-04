import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import { Grid, Button } from "../elements/index";
import CarpoolSelect from "../components/CarpoolSelect";


const CarpoolFilter = (props) => {
  const dispatch = useDispatch();
  const skiresort = props.match.params.skiresort;

  const [form, setForm] = useState({
    carpoolType: "",
    memberNum: "",
    startLocation: "",
    endLocation: skiresort,
    date: "",
  });

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

  // 데이터 전송
  const filterSubmit = async () => {
    if (form.startLocation === "" || form.endLocation === "") {
      return window.alert("지역선택은 필수입니다.");
    }
    dispatch(carpoolActions.filterCarpoolDB(skiresort, form));
  };
  console.log(form);

  return (
    <Grid bg='#FFF'>
      <CarpoolSelect is_filter bringForm={bringForm} bringDate={bringDate}/>
      
      <Grid padding='293px 0 16px 0'>
        <Button smallBtn size="20px" _onClick={filterSubmit}>
          필터적용
        </Button>
      </Grid>
    </Grid>
  );
};

export default CarpoolFilter;
