import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import styled from "styled-components";
import { Grid, Text, Button, Input } from "../elements/index";
import CarpoolSelect from "../components/CarpoolSelect";
import Header from "../components/Header";

const CarpoolWrite = (props) => {
  const dispatch = useDispatch();
  const skiResort = props.match.params.skiresort;
  const carpool_list = useSelector((state) => state.carpool.list);
  const [state, setState] = React.useState(false);

  //수정 유무
  const postId = props.match.params.postId;
  const is_edit = postId ? true : false;
  const carpool = is_edit
    ? carpool_list[skiResort].find((l) => l.postId === Number(postId))
    : null;

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
  const { title, price, memberNum, notice } = form;

  // 제목, 가격, 모집인원, 주의사항 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 날짜 변경
  const bringDate = (date) => {
    setForm({
      ...form,
      date,
    });
  };

  // CarpoolSelect 컴포넌트에서 가져온 정보로 state 변경
  const bringForm = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 지역 교차시 실행
  const bringLocation = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 출발 도착 지역 바꾸기
  const ChageLocation = (startLoca) => {
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

  return (
    <React.Fragment>
      <Header goBack>카풀 {is_edit ? "수정" : "작성"} 페이지</Header>
      <Grid bg="#FFF" minHeight="calc( 100vh - 124px )">
        <Text color="red" padding="10px">
          필수 입력사항
        </Text>
        <CarpoolSelect
          is_edit={is_edit}
          form={form}
          bringForm={bringForm}
          bringDate={bringDate}
          bringLocation={bringLocation}
          location={ChageLocation}
        />

        <div style={{ border: "5px solid #edeeef" }}></div>

        <Grid
          phoneSize
          margin="10px 0 0"
          display="flex"
          direction="column"
          gap="20px"
        >
          <Text color="red">선택 입력사항</Text>
          <Input
            blue
            label="제목"
            _maxLength="16"
            _name="title"
            _value={title}
            _onChange={handleChange}
            placeholder="ex) 서울역에서 출발합니다."
            padding="19px 8px"
          />

          <Input
            blue
            type="number"
            _maxLength="5"
            label="가격"
            _name="price"
            _value={price}
            _onChange={handleChange}
            autocomplete="off"
            placeholder="숫자만 입력가능! 서울→경기 편도시세 10000(자유협의)"
            padding="19px 8px"
          />

          <Grid>
            <Text size="12px" color="#6195CF">
              모집인원
            </Text>
            <Select name="memberNum" onChange={handleChange} value={memberNum}>
              <option value="0">선택</option>
              <option value="1">1명</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
              <option value="5">5인이상</option>
            </Select>
          </Grid>

          <Input
            blue
            label="주의사항"
            _maxLength="40"
            _name="notice"
            _value={notice}
            _onChange={handleChange}
            autocomplete="off"
            placeholder="ex) 장비 추가시, 5000원."
            padding="19px 8px"
          />

          <Grid padding="0 0 16px">
            <Button _onClick={is_edit ? editCarpool : addCarpool}>
              {is_edit ? "수정" : "작성"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Select = styled.select`
  width: 100%;
  padding: 18px 5px;
  border-radius: 6px;
`;

export default CarpoolWrite;
