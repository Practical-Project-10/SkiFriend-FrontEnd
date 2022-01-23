import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import { Grid, Text, Input, Image } from "../elements/index";
import DateSelector from "../components/DateSelector";
import Change from "../assets/carpoolList/change.svg";
import arrow from "../assets/carpoolList/arrow.svg";

import RegionSelector from "./RegionSelector";

const CarpoolSelect = (props) => {
  const { is_edit } = props;
  const { memberNum, startLocation, endLocation, date, time, carpoolType } =
    props.form;

  const [state, setState] = useState(false); //지역 교차 상태
  const [reqSelect, setReqSelect] = useState(false);
  const [ofSelect, setOfSelect] = useState(false);
  const [noneSelect, setNoneSelect] = useState(false);
  const params = useParams();
  const skiResort = params.skiresort;
  const startLoca = useRef();
  const subLoca = useRef();
  const endLoca = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;

    props.bringForm(name, value);
  };

  // 날짜 선택
  const selectDate = (date) => {
    props.bringDate(date);
  };

  // 모집완료 보지 않기
  const hiddenChange = (e) => {
    const { name, value } = e.target;

    if (noneSelect) {
      e.target.value = setNoneSelect(false);
    } else {
      e.target.value = setNoneSelect(true);
    }

    props.bringForm(name, value);
  };

  // 지역 보내기
  const selectLocation = (name, value) => {
    props.bringLocation(name, value);
  };

  // 출발 도착 지역 바꾸기
  const locationChange = () => {
    const _startLoca = startLoca.current.value;
    const _subLoca = subLoca.current.value;
    const _endLoca = endLoca.current.value;

    const _startLocation = `${_startLoca} ${_subLoca}`;

    if (!state) {
      setState(true);
      props.location(_startLocation);
    } else {
      setState(false);
      props.location(_endLoca);
    }
  };

  return (
    <React.Fragment>
      <Grid phoneSize>
        {/* 지역 선택 */}
        <Grid is_flex justify="space-around" padding="38px 0 17px 0">
          <Text size="16px" padding="0 20px">
            출발지역
          </Text>
          <ChangeButton onClick={locationChange}>
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
            <Text bold width="122px" sort="center" size="20px" color="#6195cf">
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
            {props.is_filter
            ? <Select
                width='144px'
                name="endLocation"
                ref={endLoca}
                value={endLocation}
                onChange={handleChange}
              >
                <option value="">스키장 선택</option>
                <option value={skiResort}>{skiResort}</option>
              </Select>
            : <Grid>
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
            }
            

            
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
                cursor="pointer"
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
                cursor="pointer"
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
            <Grid width="100%">
              <Label htmlFor="none" select={noneSelect} width="100%">
                카풀완료 보지않기
              </Label>
              <input
                id="none"
                type="checkbox"
                name="status"
                value={!noneSelect}
                style={{ display: "none" }}
              />
            </Grid>
          )}
        </form>

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
  width: ${props => props.width};
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

export default CarpoolSelect;
