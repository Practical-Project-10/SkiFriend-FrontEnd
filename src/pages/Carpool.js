import React from "react";
import DatePickers from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsArrowLeftRight } from "react-icons/bs";
import { Grid } from "../elements/CarpoolCSS";
import "../elements/CarpoolCSS/styles.css";
import CarpoolMenuBar from "../components/CarpoolMenuBar";
import Card from "../components/Card";

const Carpool = (props) => {
  return (
    <Grid mainFrame>
      <Grid wraps>
        <Grid head>
            {/* 출발날짜 선택박스 */}
            <Grid datepicker>
                <DatePickers />
            </Grid>

            {/* 출발 도착 셀렉박스 */}
            <Grid selectBox>
                <select>
                <option>지방</option>
                <option>서울</option>
                </select>
                <span>
                <BsArrowLeftRight style={{ margin: "0px 20px" }} />
                </span>
                <span className="skiResort">{props.skiResort}</span>
          </Grid>
        </Grid>
        {/* 스키 리조트 배너들어갈곳 */}
        <img alt="스키 리조트" src={props.skiResortImg} />
        {/* 카풀/게시글 네비게이션 바 */}
        <CarpoolMenuBar/>

        <div className="optionBox">
            <select>
            <option>카풀요청</option>
            <option>카풀제공</option>
            </select>
        </div>
        
        <Card/>
      </Grid>
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
