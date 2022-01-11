import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import { Grid, Button } from "../elements/index";
import CarpoolSelect from "../components/CarpoolSelect";
import Header from "../components/Header";

const CarpoolFilter = (props) => {
  const dispatch = useDispatch();
  const skiresort = props.match.params.skiresort;

  const [form, setForm] = useState({
    carpoolType: "",
    memberNum: "",
    startLocation: "",
    endLocation: skiresort,
    date: "",
    status: false,
  });

  const bringDate = (date) => {
    setForm({
      ...form,
      date,
    });
  };

  const bringForm = (name, value) => {
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
  console.log(form)

  return (
    <React.Fragment>
      <Header goBack>검색필터</Header>
      <Grid
        display="flex"
        direction="column"
        justify="space-between"
        bg="#FFF"
        minHeight="calc( 100vh - 124px )"
        margin="0 0 70px 0"
      >
        <CarpoolSelect is_filter form={form} bringForm={bringForm} bringDate={bringDate} />

        <Grid padding="0 16px 16px">
          <Button size="20px" _onClick={filterSubmit}>
            필터적용
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CarpoolFilter;
