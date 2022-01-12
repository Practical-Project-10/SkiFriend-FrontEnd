import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import { Grid, Button } from "../elements/index";
import CarpoolSelect from "../components/CarpoolSelect";
import Header from "../components/Header";

const CarpoolFilter = (props) => {
  const dispatch = useDispatch();
  const skiResort = props.match.params.skiresort;
  const [state, setState] = React.useState(false);

  const [form, setForm] = useState({
    carpoolType: "",
    memberNum: "",
    startLocation: "",
    endLocation: skiResort,
    date: "",
    status: false,
  });
  console.log(form);
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

  const bringLocation = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    })
  }

  // 출발 도착 지역 바꾸기
  const location = (startLoca) => {
    console.log(startLoca)

    if (!state) {
      setState(true);
      setForm({
        ...form,
        startLocation: skiResort,
        endLocation: startLoca,
      });
    } else {
      setState(false);
      setForm({
        ...form,
        startLocation: startLoca,
        endLocation: skiResort,
      });
    }
  };

  // 데이터 전송
  const filterSubmit = async () => {
    if (form.startLocation === "" || form.endLocation === "") {
      return window.alert("지역선택은 필수입니다.");
    }
    dispatch(carpoolActions.filterCarpoolDB(skiResort, form));
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
        <CarpoolSelect is_filter form={form} bringForm={bringForm} bringDate={bringDate} bringLocation={bringLocation} location={location}/>

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
