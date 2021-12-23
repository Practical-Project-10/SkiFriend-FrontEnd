import React from "react";
import { Grid, Text,Button } from "../elements/CarpoolCSS";
import "../elements/CarpoolCSS/styles.css";
import Example from "../components/Example";
import { BsArrowLeftRight } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useHistory } from "react-router";


const CarpoolFilter = () => {
    const history = useHistory();
  return (
    <Grid justify="center">
      <Grid 
        borderB="1px solid #CACACA"
        is_flex
        padding="10px"
        margin="0 0 20px 0"
      >
        <AiOutlineArrowLeft onClick={()=> {history.push("/carpool")}} style={{cursor:"pointer"}}/>
        <Text margin="0 auto">검색필터</Text>
      </Grid>
      <Grid justify="center">
        <Example />
      </Grid>
      <Grid selectBox>
        <select>
          <option value="">도시선택</option>
          <option>지방</option>
          <option>서울</option>
        </select>
        <span>
          <BsArrowLeftRight style={{ margin: "0px 20px" }} />
        </span>
        <span className="skiResort">용평</span>
      </Grid>
      <Grid is_flex justify="center" margin="30px">
        <FormControlLabel
          control={<Checkbox />}
          label="카풀 요청만 보기"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="카풀 제공만 보기"
        />
      </Grid>
      <Grid>
        <Button>
          작성버튼
        </Button>
      </Grid>
    </Grid>
  );
};

export default CarpoolFilter;
