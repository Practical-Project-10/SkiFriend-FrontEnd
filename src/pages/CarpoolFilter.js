import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import { Grid, Text, Button } from "../elements/index";
import Example from "../components/Example";

//material icons
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//react icons
import { GrFormPrevious } from "react-icons/gr";
import { BsArrowLeftRight } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

import "../elements/styles.css";

const CarpoolFilter = ({ history }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const skiresort = params.skiresort;

  // useRef
  const departureLoca = useRef();
  const arrivalLoca = useRef();

  // useState관리
  const [state, setState] = useState(false);
  const [datas, setDatas] = useState({
    carpoolType: "",
    maxNum: "",
    departure: "",
    destination: skiresort,
    date: "",
  });

  // datas useState값 바꾸기
  const valueChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setDatas({
      ...datas,
      [name]: value,
    });
  };

  // 출발 도착 지역 바꾸기
  const locationChange = () => {
    if (!state) {
      console.log(departureLoca.current.value);
      console.log(arrivalLoca.value);
      setState(true);
      setDatas({
        ...datas,
        departure: skiresort,
        destination: departureLoca.current.value,
      });
    } else {
      setState(false);
      setDatas({
        ...datas,
        departure: arrivalLoca.current.value,
        destination: skiresort,
      });
    }
  };
  console.log(datas);
  // 데이터 전송
  const filterSubmit = () => {
    dispatch(carpoolActions.filterCarpoolDb(skiresort, datas));
  };

  return (
    <React.Fragment>
      <Grid header>검색필터</Grid>
      <Grid cursor="pointer" _onClick={() => history.goBack()}>
        <GrFormPrevious size="30" />
      </Grid>

      {/* 출발 도착지역 셀렉박스 */}
      <Grid is_flex justify="center">
        <Text>출발지역</Text>
        <Button smallBtn margin="0 10px">
          <BsArrowLeftRight size="15" state onClick={locationChange} />
        </Button>
        <Text>도착지역</Text>
      </Grid>
      <Grid is_flex justify="center" direction={state ? "row-reverse" : ""}>
        <select
          name={state ? "destination" : "departure"}
          value={datas.departure}
          ref={departureLoca}
          onChange={valueChange}
        >
          <option value="">도시선택</option>
          <option value="지방">지방</option>
          <option value="서울">서울</option>
        </select>
        <span>
          <BsArrowRight style={{ margin: "0px 20px" }} />
        </span>
        <span
          className="skiResort"
          name="destination"
          value={skiresort}
          ref={arrivalLoca}
        >
          {skiresort}
        </span>
      </Grid>

      <Grid is_flex justify="center">
        {/* 날짜선택 */}
        <Grid>
          <Text>날짜 선택</Text>
          <Example onChange={valueChange}/>
        </Grid>

        {/* 최대 수용가능한 인원 */}
        <Grid>
          <Text margin="0 5px">수용가능인원</Text>
          <select name="maxNum" onChange={valueChange}>
            <option value="" selected disabled>
              선택
            </option>
            <option value="1">1명</option>
            <option value="2">2명</option>
            <option value="3">3명</option>
            <option value="4">4명</option>
            <option value="5">5명</option>
          </select>
        </Grid>
      </Grid>
      {/* 카풀요청 필터 */}
      <Grid is_flex justify="center" margin="30px">
        <FormControlLabel
          control={<Checkbox />}
          onChange={valueChange}
          label="카풀 요청만 보기"
        />
        <FormControlLabel
          control={<Checkbox />}
          onChange={valueChange}
          label="카풀 제공만 보기"
        />
      </Grid>
      <Grid align="center">
        <Button smallBtn size="20px" _onClick={filterSubmit}>
          필터적용
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default CarpoolFilter;
