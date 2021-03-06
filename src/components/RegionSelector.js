import React, { forwardRef } from "react";

import styled from "styled-components";
//지역선택 셀렉박스 css 는 import 경로에 쓰여져 있습니다!
const RegionSelector = forwardRef((props, loca) => {
  const { subLoca, changeLoca, state } = props;

  // const
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
    "충남",
    "충북",
  ];

  const regionSelect = (e) => {
    const { value } = e.target;

    let region_name = [];

    region_name[0] = [
      "전체",
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ];
    region_name[1] = [
      "전체",
      "강서구",
      "금정구",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
      "기장군",
    ];
    region_name[2] = [
      "전체",
      "남구",
      "달서구",
      "동구",
      "북구",
      "서구",
      "수성구",
      "중구",
      "달성군",
    ];
    region_name[3] = [
      "전체",
      "계양구",
      "남구",
      "남동구",
      "동구",
      "부평구",
      "서구",
      "연수구",
      "중구",
      "강화군",
      "옹진군",
    ];
    region_name[4] = ["전체", "광산구", "남구", "동구", "북구", "서구"];
    region_name[6] = ["전체", "남구", "동구", "북구", "중구", "울주군"];
    region_name[5] = ["전체", "대덕구", "동구", "서구", "유성구", "중구"];
    region_name[7] = [
      "전체",
      "강릉시",
      "동해시",
      "삼척시",
      "속초시",
      "원주시",
      "춘천시",
      "태백시",
      "고성군",
      "양구군",
      "양양군",
      "영월군",
      "인제군",
      "정선군",
      "철원군",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ];
    region_name[8] = [
      "전체",
      "고양시 덕양구",
      "고양시 일산구",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시 소사구",
      "부천시 오정구",
      "부천시 원미구",
      "성남시 분당구",
      "성남시 수정구",
      "성남시 중원구",
      "수원시 권선구",
      "수원시 장안구",
      "수원시 영통구",
      "수원시 팔달구",
      "시흥시",
      "안산시 단원구",
      "안산시 상록구",
      "안성시",
      "안양시 동안구",
      "안양시 만안구",
      "오산시",
      "용인시",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "하남시",
      "화성시",
      "가평군",
      "양주군",
      "양평군",
      "여주군",
      "연천군",
      "포천군",
    ];
    region_name[9] = [
      "전체",
      "거제시",
      "김해시",
      "마산시",
      "밀양시",
      "사천시",
      "양산시",
      "진주시",
      "진해시",
      "창원시",
      "통영시",
      "거창군",
      "고성군",
      "남해군",
      "산청군",
      "의령군",
      "창녕군",
      "하동군",
      "함안군",
      "함양군",
      "합천군",
    ];
    region_name[10] = [
      "전체",
      "경산시",
      "경주시",
      "구미시",
      "김천시",
      "문경시",
      "상주시",
      "안동시",
      "영주시",
      "영천시",
      "포항시 남구",
      "포항시 북구",
      "고령군",
      "군위군",
      "봉화군",
      "성주군",
      "영덕군",
      "영양군",
      "예천군",
      "울릉군",
      "울진군",
      "의성군",
      "청도군",
      "청송군",
      "칠곡군",
    ];
    region_name[11] = [
      "전체",
      "광양시",
      "나주시",
      "목포시",
      "순천시",
      "여수시",
      "강진군",
      "고흥군",
      "곡성군",
      "구례군",
      "담양군",
      "무안군",
      "보성군",
      "신안군",
      "영광군",
      "영암군",
      "완도군",
      "장성군",
      "장흥군",
      "진도군",
      "함평군",
      "해남군",
      "화순군",
    ];
    region_name[12] = [
      "전체",
      "군산시",
      "김제시",
      "남원시",
      "익산시",
      "전주시 덕진구",
      "전주시 완산구",
      "정읍시",
      "고창군",
      "무주군",
      "부안군",
      "순창군",
      "완주군",
      "임실군",
      "장수군",
      "진안군",
    ];
    region_name[13] = [
      "전체",
      "공주시",
      "논산시",
      "보령시",
      "서산시",
      "아산시",
      "천안시",
      "금산군",
      "당진군",
      "부여군",
      "서천군",
      "연기군",
      "예산군",
      "청양군",
      "태안군",
      "홍성군",
    ];
    region_name[14] = [
      "전체",
      "제천시",
      "청주시 상당구",
      "청주시 흥덕구",
      "충주시",
      "청원구",
      "괴산군",
      "단양군",
      "보은군",
      "영동군",
      "옥천군",
      "음성군",
      "진천군",
    ];
    const state = document.getElementById("state");

    let add = [];

    if (value === "서울") {
      add = region_name[0];
    } else if (value === "부산") {
      add = region_name[1];
    } else if (value === "대구") {
      add = region_name[2];
    } else if (value === "인천") {
      add = region_name[3];
    } else if (value === "광주") {
      add = region_name[4];
    } else if (value === "대전") {
      add = region_name[5];
    } else if (value === "울산") {
      add = region_name[6];
    } else if (value === "강원") {
      add = region_name[7];
    } else if (value === "경기") {
      add = region_name[8];
    } else if (value === "경남") {
      add = region_name[9];
    } else if (value === "경북") {
      add = region_name[10];
    } else if (value === "전남") {
      add = region_name[11];
    } else if (value === "전북") {
      add = region_name[12];
    } else if (value === "충남") {
      add = region_name[13];
    } else if (value === "충북") {
      add = region_name[14];
    }

    // 지역 선택시 option 초기화
    state.options.length = 1;

    // 지역 별 시군구 option 추가
    for (let i in add) {
      let opt = document.createElement("option");
      opt.value = add[i];
      opt.innerHTML = add[i];
      state.appendChild(opt);
    }
  };

  const changeLocation = (e) => {
    const _startLoca = loca.current.value;
    const _subLoca = subLoca.current.value;
    const location = `${_startLoca} ${_subLoca}`;

    if (_startLoca !== "" && _subLoca !== "") {
      changeLoca(e.target.name, location);
    }
  };

  return (
    <Form is_flex width="144px" height="55px" onChange={changeLocation}>
      <Select
        margin="0 3px 0 0"
        name={state ? "endLocation" : "startLocation"}
        onChange={regionSelect}
        ref={loca}
      >
        <option value="">시/도</option>
        {city_name.map((c, idx) => {
          return (
            <option value={c} key={"cityName" + idx}>
              {c}
            </option>
          );
        })}
      </Select>

      <Select
        width="107px"
        name={state ? "endLocation" : "startLocation"}
        id="state"
        ref={subLoca}
      >
        <option value="">군/구</option>
      </Select>
    </Form>
  );
});

const Form = styled.form`
  width: 144px;
  display: flex;
  height: 55px;
`;

const Select = styled.select`
  width: ${(props) => (props.width ? props.width : "53px")};
  height: 55px;
  margin: ${(props) => props.margin && props.margin};
  border: 1px solid #474d56;
  border-radius: 6px;
`;

export default RegionSelector;
