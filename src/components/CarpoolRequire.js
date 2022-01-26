import React, { useState, useRef } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import styled from "styled-components";
import { Grid, Text, Input, Image, Button } from "../elements/index";
import DateSelector from "../components/DateSelector";
import Change from "../assets/carpoolList/change.svg";
import arrow from "../assets/carpoolList/arrow.svg";

import RegionSelector from "./RegionSelector";
import CarpoolOptional from "./CarpoolOptional";

const CarpoolRequire = (props) => {
  const { postId, is_edit } = props;
  // const { memberNum, startLocation, endLocation, date, time, carpoolType } =
  //   props.form;
  const dispatch = useDispatch();
  const params = useParams();
  const carpool_list = useSelector((state) => state.carpool.list);

  const skiResort = params.skiresort;
  // 수정 유무
  const carpool = is_edit
    ? carpool_list[skiResort].find((l) => l.postId === Number(postId))
    : null;

  const [state, setState] = useState(false); //지역 교차 상태
  const [status, setStatus] = useState(false); //필터 페이지 - 모집 완료 제외
  const [reqSelect, setReqSelect] = useState(false);
  const [ofSelect, setOfSelect] = useState(false);
  const startLoca = useRef();
  const subLoca = useRef();
  const endLoca = useRef();

  const [form, setForm] = React.useState({
    carpoolType: `${carpool ? carpool.carpoolType : ""}`,
    startLocation: `${carpool ? carpool.startLocation : ""}`,
    endLocation: `${carpool ? carpool.endLocation : skiResort}`,
    date: `${carpool ? carpool.date : ""}`,
    time: `${carpool ? carpool.time : ""}`,
    title: `${carpool ? carpool.title : ""}`,
    price: `${carpool ? carpool.price : ""}`,
    memberNum: `${carpool ? carpool.memberNum : ""}`,
    notice: `${carpool ? carpool.notice : ""}`,
  });
  const {
    title,
    price,
    memberNum,
    notice,
    startLocation,
    endLocation,
    date,
    time,
    carpoolType,
  } = form;
  const optional = {
    title,
    price,
    memberNum,
    notice,
  };
  console.log(form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 지역 보내기
  const selectLocation = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 날짜 선택
  const selectDate = (date) => {
    console.log("hi");
    setForm({
      ...form,
      date,
    });
  };

  // 지역 교차 버튼 클릭시 실행
  const ChageLocation = () => {
    if (!state) {
      setState(true);
      setForm({
        ...form,
        startLocation: skiResort,
        endLocation: startLocation,
      });
    } else {
      setState(false);
      setForm({
        ...form,
        startLocation: endLocation,
        endLocation: skiResort,
      });
    }
  };

  // 모집완료 보지 않기
  const hiddenChange = () => {
    if (!status) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  // 카풀게시물 추가
  const addCarpool = () => {
    if (form.startLocation === "" || form.startLocation === " ") {
      return window.alert("출발지역을 선택해주세요");
    }
    if (form.startLocation === "" || form.endLocation === " ") {
      return window.alert("도착지역을 선택해주세요");
    }
    if (form.date === "") {
      return window.alert("날짜를 선택해주세요");
    }
    if (form.time === "") {
      return window.alert("시간을 선택해주세요");
    }
    if (form.carpoolType === "") {
      return window.alert("카풀 요청, 혹은 카풀 제공을 선택해주세요");
    }
    dispatch(carpoolActions.addCarpoolDB(skiResort, form));
  };

  // 카풀게시물 수정
  const editCarpool = () => {
    dispatch(carpoolActions.editCarpoolDB(skiResort, postId, form));
  };

  // 필터 적용
  const filterSubmit = async () => {
    dispatch(carpoolActions.filterCarpoolDB(skiResort, form, status));
  };

  return (
    <React.Fragment>
      <Container bg="#FFF" height={props.height}>
        <Grid phoneSize>
          <Text color="red" margin="10px 0">
            필수 입력사항
          </Text>
          {/* 지역 선택 */}
          <Grid is_flex justify="space-around" padding="0 0 17px">
            <Text size="16px" padding="0 20px">
              출발지역
            </Text>
            <ChangeButton onClick={ChageLocation}>
              <Image src={Change} width="100%" height="15px" />
            </ChangeButton>
            <Text size="16px" padding="0 20px">
              도착지역
            </Text>
          </Grid>

          {is_edit ? (
            <Location>
              <Text bold width="130px" sort="center" size="14px">
                {startLocation}
              </Text>
              <Image src={arrow} width="50px" height="10px" size="40px 10px" />
              <Text
                bold
                width="122px"
                sort="center"
                size="20px"
                color="#6195cf"
              >
                {endLocation}
              </Text>
            </Location>
          ) : (
            <Grid
              is_flex
              justify="space-between"
              margin="0 0 32px 0"
              direction={state ? "row-reverse" : ""}
            >
              <RegionSelector
                ref={startLoca}
                subLoca={subLoca}
                changeLoca={selectLocation}
                state={state}
              />
              <Image src={arrow} width="50px" height="10px" />

              {props.is_filter ? (
                <Select
                  width="144px"
                  name="endLocation"
                  ref={endLoca}
                  onChange={handleChange}
                >
                  <option value="">스키장 선택</option>
                  <option value={skiResort}>{skiResort}</option>
                </Select>
              ) : (
                <Grid>
                  <Label htmlFor="endLocation" width="144px">
                    {skiResort}
                  </Label>
                  <input
                    type="text"
                    id="endLocation"
                    name="endLocation"
                    value={endLocation}
                    style={{ display: "none" }}
                    ref={endLoca}
                    readOnly
                  />
                </Grid>
              )}
            </Grid>
          )}

          {/* 날짜 or 수용인원 */}
          {props.is_filter ? (
            <Grid display="flex" margin="0 0 50px 0" gap="24px">
              <Grid>
                <Text size="12px" color="#6195CF">
                  날짜
                </Text>
                <DateSelector _value={date} _selectDate={selectDate} />
              </Grid>
              <Grid>
                <Text size="12px" color="#6195CF">
                  수용가능인원
                </Text>
                <Select
                  width="138px"
                  name="memberNum"
                  value={memberNum}
                  onChange={handleChange}
                >
                  <option value="0">선택</option>
                  <option value="1">1명</option>
                  <option value="2">2명</option>
                  <option value="3">3명</option>
                  <option value="4">4명</option>
                  <option value="5">5인이상</option>
                </Select>
              </Grid>
            </Grid>
          ) : (
            <Grid display="flex" margin="0 0 50px 0" gap="24px">
              <Grid width="60%">
                <Text size="12px" color="#6195CF">
                  날짜
                </Text>
                <DateSelector _value={date} _selectDate={selectDate} />
              </Grid>
              <Grid width="40%">
                <Text size="12px" color="#6195CF">
                  시간
                </Text>
                <Input
                  blue
                  type="time"
                  step="900"
                  padding="16.5px 8px"
                  _name="time"
                  _value={time}
                  _onChange={handleChange}
                />
              </Grid>
            </Grid>
          )}

          {/* 카풀 제공/요청 */}
          <form onChange={handleChange}>
            <Grid display="flex" gap="20px" margin="0 0 50px 0">
              <Grid width="50%">
                <Label
                  width="100%"
                  htmlFor="request"
                  select={carpoolType === "카풀 요청" ? true : reqSelect}
                  onClick={() => {
                    setReqSelect(true);
                    setOfSelect(false);
                  }}
                >
                  카풀 요청
                </Label>
                <input
                  id="request"
                  type="radio"
                  name="carpoolType"
                  value="카풀 요청"
                  style={{ display: "none" }}
                />
              </Grid>
              <Grid width="50%">
                <Label
                  width="100%"
                  htmlFor="offer"
                  select={carpoolType === "카풀 제공" ? true : ofSelect}
                  onClick={() => {
                    setOfSelect(true);
                    setReqSelect(false);
                  }}
                >
                  카풀 제공
                </Label>
                <input
                  id="offer"
                  type="radio"
                  name="carpoolType"
                  value="카풀 제공"
                  style={{ display: "none" }}
                />
              </Grid>
            </Grid>
          </form>

          <form onChange={hiddenChange}>
            {props.is_filter && (
              <Grid>
                <Label htmlFor="none" select={status} width="100%">
                  카풀완료 보지않기
                </Label>
                <input
                  id="none"
                  type="checkbox"
                  name="status"
                  value={status}
                  style={{ display: "none" }}
                />
              </Grid>
            )}
          </form>
        </Grid>

        {!props.is_filter ? (
          <Grid padding="0 16px 16px">
            <div style={{ border: "5px solid #edeeef" }}></div>

            <CarpoolOptional handleChange={handleChange} optional={optional} />
            <Grid padding="50px 0 0">
              <Button _onClick={is_edit ? editCarpool : addCarpool}>
                {is_edit ? "수정" : "작성"}
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid padding="0 16px 16px">
            <Button size="20px" _onClick={filterSubmit}>
              필터적용
            </Button>
          </Grid>
        )}
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
`;

const ChangeButton = styled.button`
  width: 50px;
  height: 29px;
  background: #474d56;
  border-radius: 80px;
  border: none;
  cursor: pointer;
`;

const Select = styled.select`
  width: ${(props) => props.width};
  padding: 18px;
  border-radius: 6px;
  border: 1px solid #474d56;
`;

const Label = styled.label`
  width: ${(props) => props.width};
  height: 55px;
  background: ${(props) => (props.select ? "#6195CF" : "#FFF")};
  border: 2px solid #6195cf;
  box-sizing: border-box;
  border-radius: 6px;
  color: ${(props) => (props.select ? "#FFF" : "#6195CF")};
  font-weight: bold;
  font-size: 20px;
  line-height: 49px;
  text-align: center;
  display: block;
  cursor: default;
`;

const Location = styled.div`
  width: 100%;
  height: 55px;
  margin: 0 0 12px;
  background: #fff;
  border: 1px solid #6195cf;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default CarpoolRequire;
