import React from "react";
import { Grid, Text, Button ,Input} from "../elements/CarpoolCSS/index";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {BsArrowLeftRight} from "react-icons/bs";
import "../elements/CarpoolCSS/styles.css";
import Example from "../components/Example";
import TimePicker from "../components/TimePicker";


const CarpoolWrite = () => {
  return (
    <Grid justify="column">
      <Grid borderB="1px solid #CACACA" is_flex padding="10px" margin="0 0 20px 0">
        <AiOutlineArrowLeft />
        <Text margin="0 auto" >카풀 작성 페이지</Text>
      </Grid>
      <Grid borderB="1px solid #CACACA">    
        <Grid
            margin="0 auto"
            align="center"
            width="20vw"
            border="1px solid #000"
            padding="10px"
        >
            하이원
        </Grid>
        <Grid  is_flex margin="10px 15px 10px 15px">
            <Button>카풀요청</Button>
            <Button>카풀제공</Button>
        </Grid>
      </Grid>
      
      <Grid is_flex padding="10px">
          <Text margin="10px 8px 0 10px">제목 : </Text>
          <Input title type="text" placeholder="제목을 입력해주세요."></Input>
        </Grid>
        <Grid is_flex justify="space-between" margin="0 100px -30px 100px">
            <Text>출발지역</Text>
            <Text>도착지역</Text>
            </Grid>
            {/* 출발도착지역 셀렉박스 */}
        {/* <Grid selectBox>
                <select>
                <option>지방</option>
                <option>서울</option>
                </select>
                <span>
                <BsArrowLeftRight style={{ margin: "0px 20px" }} />
                </span>
                <span className="skiResort">용평</span>
            </Grid> */}
      <Grid is_flex width="100px">
         <Example/>
         <TimePicker/>
      </Grid>
      <Grid margin="0 10px 20px 0">
          <Text>가격</Text>
          <Input/>
          <Text>모집인원</Text>
          <Input/>
          <Text>주의사항</Text>
          <Input/>
      </Grid>
      <Grid margin="10px">
          <Button padding="10px">작성</Button>
      </Grid>
    </Grid>
  );
};

export default CarpoolWrite;
