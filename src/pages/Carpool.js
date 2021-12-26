import React from "react";
import { useHistory } from "react-router";
// import "react-datepicker/dist/react-datepicker.css";
import "../elements/styles.css";
import { Grid, Button } from "../elements/index";
// components
import CarpoolMenuBar from "../components/CarpoolMenuBar";
import Card from "../components/Card";

// material icons
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Carpool = (props) => {
  const history = useHistory();
  return (
    <Grid is_flex align="center" direction="column">
      <Grid bg="#C4C4C4"></Grid>
      {/* 스키 리조트 배너들어갈곳 */}
      <img alt="스키 리조트" src={props.skiResortImg} />

      {/* 카풀/게시글 네비게이션 바 */}
      <CarpoolMenuBar />
      <Grid justify="space-around" is_flex width="100%">
        <Grid>
          <FormControlLabel control={<Checkbox />} label="카풀완료 숨기기" />
        </Grid>

        <Button
          _onClick={() => {
            history.push("/carpoolfilter");
          }}
        >
          필터
        </Button>
      </Grid>

      <Card />
      <Stack spacing={2}>
        <Pagination count={5} />
      </Stack>
    </Grid>
  );
};

Carpool.defaultProps = {
  skiResort: "하이원",
  id: "",
  skiResortImg:
    "https://ww.namu.la/s/8824bc74d5ab99b1b526bdc3f8f22d449d90c7807c7dba5c576468522e89d158d227d98274f8f9433a7e6d7e2fb6d40b77958a91da322fed977c2ef80f241eba318aec584de0f642748dd476e983e1ca",
};
export default Carpool;
