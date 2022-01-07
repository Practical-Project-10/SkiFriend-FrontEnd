import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import styled from "styled-components";
import { Grid, Text, Button, Input } from "../elements/index";
import CarpoolSelect from "../components/CarpoolSelect";
import Header from "../components/Header";

const CarpoolWrite = (props) => {
  const dispatch = useDispatch();
  const carpool_list = useSelector((state) => state.carpool.list);

  const skiResort = props.match.params.skiresort;

  //수정페이지
  const postId = props.match.params.postId;
  const is_edit = postId ? true : false;
  const nickname = localStorage.getItem("nickname");
  const is_login = nickname ? true : false;
  const carpool = is_edit
    ? carpool_list.find((l) => l.postId === Number(postId))
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
  console.log(form);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

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

  const addCarpool = () => {
    if (is_login) {
      return dispatch(carpoolActions.addCarpoolDB(skiResort, form));
    } else {
      window.alert("로그인 및 프로필작성한 회원만 작성가능합니다.");
      return;
    }
  };
  const editCarpool = () => {
    dispatch(carpoolActions.editCarpoolDB(postId, form));
  };

  return (
    <React.Fragment>
      <Header goBack>카풀 {is_edit ? "수정" : "작성"} 페이지</Header>
      <Grid bg="#FFF" minHeight="calc( 100vh - 124px )">
        <CarpoolSelect bringForm={bringForm} bringDate={bringDate} />

        <div style={{ border: "5px solid #edeeef" }}></div>

        <Grid
          phoneSize
          margin="50px 0 0"
          display="flex"
          direction="column"
          gap="33px"
        >
          <Input
            blue
            label="제목"
            _maxLength="15"
            _name="title"
            _value={title}
            _onChange={handleChange}
            placeholder="제목을 입력해주세요."
            padding="19px 8px"
          />

          <Input
            blue
            type="number"
            label="가격"
            _name="price"
            _value={price}
            _onChange={handleChange}
            placeholder="숫자만 입력해주세요."
            padding="19px 8px"
          />

          <Grid>
            <Text size="12px" color="#6195CF">
              모집인원
            </Text>
            <Select
              name="memberNum"
              defaultValue="default"
              onChange={handleChange}
              value={memberNum}
            >
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
            _maxLength="25"
            _name="notice"
            _value={notice}
            _onChange={handleChange}
            placeholder="주의사항을 입력해주세요."
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
