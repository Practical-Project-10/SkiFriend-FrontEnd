import React from 'react';

import styled from "styled-components";
import { Grid, Text, Input } from "../elements";

const CarpoolOptional = ({handleChange, optional}) => {
  // 가격 99,999원까지 제한
  const maxPrice = (e) => {
    if(e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  return(
    <React.Fragment>
      <Grid margin='10px 0'>
        <Text color="red">선택 입력사항</Text>
      </Grid>
      <Optional>
        {/* 선택 입력 사항 */}
        <Input
          blue
          label="제목"
          _maxLength="16"
          _name="title"
          _value={optional.title}
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
          _value={optional.price}
          _onChange={handleChange}
          _onInput={maxPrice}
          autocomplete="off"
          placeholder="숫자만 입력가능! 서울→경기 편도시세 10000(자유협의)"
          padding="19px 8px"
        />

        <Grid>
          <Text size="12px" color="#6195CF">
            모집인원
          </Text>
          <Select name="memberNum" onChange={handleChange} value={optional.memberNum}>
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
          _value={optional.notice}
          _onChange={handleChange}
          autocomplete="off"
          placeholder="ex) 장비 추가시, 5000원."
          padding="19px 8px"
        />
      </Optional>
    </React.Fragment>
  );
};

const Optional = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 10px;
`

const Select = styled.select`
  width: 100%;
  padding: 18px 5px;
  border-radius: 6px;
`;

export default CarpoolOptional;