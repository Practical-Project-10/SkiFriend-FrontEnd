import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import styled from 'styled-components';
import { Grid, Text, Button, Input, Image } from "../elements/index";
import DateSelector from "../components/DateSelector";
import CarpoolSelect from "../components/CarpoolSelect";
import Change from "../assets/carpoolWrite/change.svg"
import Arrow from "../assets/carpoolWrite/arrow.svg"


//react icons
import { GrFormPrevious } from "react-icons/gr";
import { BsArrowLeftRight } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";


const CarpoolFilter = (props) => {
  const [state, setState] = useState(false);

  const params = useParams();
  const skiResort = params.skiresort;
  const startLoca = useRef();
  const endLoca = useRef();

  const city_name = [
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "강원",
    "경기",
    "경남",
    "경북",
    "전남",
    "전북",
    "제주",
    "충남",
    "충북",
  ];

  const [form, setForm] = useState({
    carpoolType: "",
    memberNum: "",
    startLocation: "",
    endLocation: skiResort,
    date: "",
    time: "",
  });

  const {
    carpoolType,
    memberNum,
    startLocation,
    endLocation,
    date,
    time,
  } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setForm({
      ...form,
      [name]: value,
    });
    props.bringForm(name, value);
  };

  // 출발 도착 지역 바꾸기
  const locationChange = () => {
    if (!state) {
      console.log(startLoca.current.value);
      setState(true);
      setForm({
        ...form,
        startLocation: skiResort,
        endLocation: startLoca.current.value,
      });
    } else {
      setState(false);
      setForm({
        ...form,
        startLocation: endLoca.current.value,
        endLocation: skiResort,
      });
    }
  };

  // 날짜 선택
  const selectDate = (date) => {
    console.log(date);
    setForm({
      ...form,
      date,
    });
    props.bringDate(date)
  };

  console.log(form);

  return (
    <React.Fragment>
      <Grid phoneSize>
        {/* 지역 선택 */}
        <Grid
          is_flex
          justify="space-between"
          padding='38px 0 17px 0'
        >
          <Text margin='0 0 0 37px' size='16px'>출발지역</Text>
          <ChangeButton onClick={locationChange}>
            <Image src={Change} width='100%' height='15px'/>
          </ChangeButton>
          <Text margin='0 37px 0 0' size='16px'>도착지역</Text>
        </Grid>

        <Grid
          is_flex
          justify='space-between'
          margin='0 0 32px 0'
          direction={state ? "row-reverse" : ""}
        >
          <Select
            name={state ? "endLocation" : "startLocation"}
            value={state ? endLocation : startLocation}
            ref={startLoca}
            onChange={handleChange}
          >
            <option value="" disabled>
              지역선택
            </option>
            ;
            {city_name.map((city, idx) => {
              return (
                <React.Fragment key={"bigCity" + idx}>
                  <option value={city}>{city}</option>;
                </React.Fragment>
              );
            })}
          </Select>
          <Image src={Arrow} width='50px' height='10px'/>
          {/* value속성이 고정값이 아니라 나는 에러임 */}
          <Label htmlFor="endLocation">{skiResort}</Label>
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
        {props.is_filter
          ? <Grid display='flex' margin='0 0 50px 0' gap='24px'>
              <Grid>
                <Text size='12px' color='#6195CF'>날짜</Text>
                <DateSelector _value={date} _selectDate={selectDate} />
              </Grid>
              <Grid>
                <Text size='12px' color='#6195CF'>수용가능인원</Text>
                <Select
                  name="memberNum"
                  defaultValue="default"
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
          : <Grid display='flex' margin='0 0 50px 0' gap='24px'>
              <Grid width='70%'>
                <Text size='12px' color='#6195CF'>날짜</Text>
                <DateSelector _value={date} _selectDate={selectDate} />
              </Grid>
              <Grid width='30%'>
                <Input
                  blue
                  label='시간'
                  type="time"
                  padding='16.5px 8px'
                  _name="time"
                  _value={time}
                  _onChange={handleChange}
                />
              </Grid>
            </Grid>
          }

        {/* 카풀 제공/요청 */}
        <form onChange={handleChange}>
          <Grid display='flex' gap='20px' margin='0 0 50px 0'>
            <Grid width='50%'>
              <Label htmlFor="request" width='100%' border='none' bg='#6195CF' color='#FFF'>카풀 요청</Label>
              <input id='request' type="radio" name="carpoolType" value="카풀 요청" style={{ display: "none" }}/>
            </Grid>
            <Grid width='50%'>
              <Label htmlFor="offer" width='100%' border='1px solid #474D56'>카풀 제공</Label>
              <input id='offer' type="radio" name="carpoolType" value="카풀 제공" style={{ display: "none" }}/>
            </Grid>
          </Grid>
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
  background: #474D56;
  border-radius: 80px;
  border: none;
  cursor: pointer;
`

const Select = styled.select`
  padding: 18px 33px;
  border-radius: 6px;
  border: 1px solid #474D56;
`

const Label = styled.label`
  width: ${props => props.width? props.width: '144px'};
  height: 55px;
  background: ${props => props.bg? props.bg: '#FFF'};
  border: ${props => props.border? props.border: '2px solid #6195CF'};
  box-sizing: border-box;
  border-radius: 6px;
  color: ${props => props.color? props.color: '#6195CF'};
  font-weight: bold;
  font-size: 20px;
  line-height: 49px;
  text-align: center;
  display: block;
`

export default CarpoolFilter;
