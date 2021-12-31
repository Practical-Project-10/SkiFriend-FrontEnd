import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import { Grid, Text, Button, Input } from "../elements/index";
import Example from "../components/Example";

//react icons
import { GrFormPrevious } from "react-icons/gr";
import { BsArrowLeftRight } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

import "../elements/styles.css";
import axios from "axios";

const CarpoolFilter = ({ history }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const skiresort = params.skiresort;

  // useRef
  const departureLoca = useRef();
  const arrivalLoca = useRef();

  // useState관리
  const [state, setState] = useState(0);
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

  // 수용인원 datas useState값 바꾸기
  const valueNum = (e) => {
    const { name, value } = e.target;
    setDatas({
      ...datas,
      [name]: parseInt(value),
    });
  };

  // 출발 도착 지역 바꾸기
  const locationChange = () => {
    if (!state) {
      console.log(departureLoca.current.value);
      console.log(arrivalLoca.value);
      setState(1);
      setDatas({
        ...datas,
        departure: skiresort,
        destination: departureLoca.current.value,
      });
    } else {
      setState(0);
      setDatas({
        ...datas,
        departure: arrivalLoca.current.value,
        destination: skiresort,
      });
    }
  };

  // 날짜 선택
  const selectDate = (date) => {
    console.log(date);
    setDatas({
      ...datas,
      date,
    });
  };

  // 데이터 전송
  const filterSubmit = async () => {
    const accessToken = document.cookie.split("=")[1];
    const token = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${accessToken}`,
      },
    };

    await axios
      .get(
        `http://13.125.249.172/board/carpool/${skiresort}/category?size=10&page=1`,
        token,
        datas
      )
      .then((res) => {
        console.log("필터적용 성공");
        console.log(res);
        console.log(res.data);
        history.push(`carpool/${skiresort}`);
        dispatch(carpoolActions.getCarpool(res.data));
      })
      .catch((error) => {
        console.log(`필터적용 실패${error}`);
      });
    // dispatch((carpoolActions.filterCarpoolDB = (skiresort, datas)));
  };
  console.log(datas);
  return (
    <React.Fragment>
      <Grid header>검색필터</Grid>
      <Grid>
        <GrFormPrevious
          size="30"
          cursor="pointer"
          onClick={() => history.goBack()}
        />
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
          <Example _value={datas.date} _selectDate={selectDate} />
        </Grid>

        {/* 최대 수용가능한 인원 */}
        <Grid>
          <Text margin="0 5px">수용가능인원</Text>
          <select name="maxNum" defaultValue="default" onChange={valueChange}>
            <option value="default" disabled>
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
        <Input
          type="radio"
          _name="carpoolType"
          _value="카풀요청"
          _onClick={valueChange}
          label="카풀 요청만 보기"
        />
        <Input
          type="radio"
          _name="carpoolType"
          _value="카풀제공"
          _onClick={valueChange}
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
