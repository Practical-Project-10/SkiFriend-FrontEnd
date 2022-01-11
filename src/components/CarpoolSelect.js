import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import { Grid, Text, Input, Image } from "../elements/index";
import DateSelector from "../components/DateSelector";
import Change from "../assets/carpoolWrite/change.svg";
import Arrow from "../assets/carpoolWrite/arrow.svg";

import RegionSelector from "./RegionSelector";

const CarpoolSelect = (props) => {
  const { memberNum, startLocation, endLocation, date, time, carpoolType } = props.form;
  const [state, setState] = useState(false);
  const [reqSelect, setReqSelect] = useState(false);
  const [ofSelect, setOfSelect] = useState(false);
  const [noneSelect, setNoneSelect] = useState(true);
  const params = useParams();
  const skiResort = params.skiresort;
  const startLoca = useRef();
  const subLoca = useRef();
  const endLoca = useRef();
  console.log(subLoca.current);

  const handleChange = (e) => {
    const { name, value } = e.target;


    props.bringForm(name, value);
  };

  const hiddenChange = (e) => {
    const { name, value } = e.target;


    if (noneSelect) {
      e.target.value = setNoneSelect(false);
    } else {
      e.target.value = setNoneSelect(true);
    }

    props.bringForm(name, value);
  };

  // 출발 도착 지역 바꾸기
  const locationChange = (e) => {
    const _startLoca = startLoca.current.value;
    const _subLoca = subLoca.current.value;
    const _endLoca = endLoca.current.value;

    const _startLocation = `${_startLoca} ${_subLoca}`;

    console.log('select', state)
    if (!state) {
      setState(true);
      props.location(_startLocation);
    } else {
      setState(false);
      props.location(_endLoca);
    }
  };

  // 날짜 선택
  const selectDate = (date) => {
    props.bringDate(date);
  };

  return (
    <React.Fragment>
      <Grid phoneSize>
        {/* 지역 선택 */}
        <Grid is_flex justify="space-between" padding="38px 0 17px 0">
          <Text margin="0 0 0 37px" size="16px">
            출발지역
          </Text>
          <ChangeButton onClick={locationChange}>
            <Image src={Change} width="100%" height="15px" />
          </ChangeButton>
          <Text margin="0 37px 0 0" size="16px">
            도착지역
          </Text>
        </Grid>

        <Grid
          is_flex
          justify="space-between"
          margin="0 0 32px 0"
          direction={state ? "row-reverse" : ""}
        >
          <RegionSelector ref={startLoca} subLoca={subLoca} _onClick={handleChange}/>
          {/* <RegionSelector /> */}
          <Image src={Arrow} width="50px" height="10px" />
          {/* value속성이 고정값이 아니라 나는 에러임 */}
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
          />
        </Grid>

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
                name="memberNum"
                defaultValue="default"
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
                htmlFor="request"
                select={carpoolType === '카풀 요청'? true: reqSelect}
                width="100%"
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
                htmlFor="offer"
                select={carpoolType === '카풀 제공'? true: ofSelect}
                width="100%"
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
        <from onChange={hiddenChange}>
          {props.is_filter && (
            <Grid width="100%">
              <CheckLabel htmlFor="none" select={noneSelect} width="100%">
                카풀완료 보지않기
              </CheckLabel>
              <input
                id="none"
                type="checkbox"
                name="status"
                value={noneSelect}
                style={{ display: "none" }}
              />
            </Grid>
          )}
        </from>

        {/* <Grid>
          <Input type="checkBox"/>
          <Text>모집 중인 게시글만 보기</Text>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
};

const ChangeButton = styled.button`
  width: 50px;
  height: 29px;
  background: #474d56;
  border-radius: 80px;
  border: none;
  cursor: pointer;
`;

const Select = styled.select`
  padding: 18px 33px;
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
  cursor: pointer;
`;

const CheckLabel = styled.label`
  width: ${(props) => props.width};
  height: 55px;
  background: ${(props) => (props.select ? "#FFF" : "#6195CF")};
  border: 2px solid #6195cf;
  box-sizing: border-box;
  border-radius: 6px;
  color: ${(props) => (props.select ? "#6195CF" : "#FFF")};
  font-weight: bold;
  font-size: 20px;
  line-height: 49px;
  text-align: center;
  display: block;
  cursor: pointer;
`;

export default CarpoolSelect;
