import React, { useState } from "react";
import SelectRegion from "./SelectRegion";

import { Grid } from "../elements/index";
import { BsArrowLeftRight } from "react-icons/bs";

const BoundChangeBox = (props) => {
  //  출발지 도착지 선택 (의도: 여기서 redux에 있는 switch_places 라는 action 을 하려고 했습니다!)
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  return (
    <div>
      <Grid is_flex margin="auto" width="200px" padding="20px">
        {/* 지역 선택박스 */}
        <SelectRegion />
        <span>
          <BsArrowLeftRight style={{ margin: "0px 20px" }} />
        </span>

        {/* skiResort로 받은 스키장이름 */}
        <span className="skiResort">{props.skiResort}</span>
      </Grid>
    </div>
  );
};

export default BoundChangeBox;
