import React from "react";
import { history } from "../redux/ConfigStore";
import { useParams } from "react-router-dom";

import { Grid, Button } from "../elements/index";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AiOutlineConsoleSql } from "react-icons/ai";

const CarpoolControl = () => {
  const params = useParams();
  const skiresort = params.skiresort;

  const [state, setState] = React.useState();

  const curState = (e) => {
    setState(e.target.value);
  };

  return (
    <React.Fragment>
      <Grid justify="space-around" is_flex width="100%">
        <Grid>
          <FormControl sx={{ m: 1, minWidth: 110 }}>
            <Select
              value={state}
              onChange={curState}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="전체">
                <em>전체</em>
              </MenuItem>
              <MenuItem value={"모집 중"}>모집 중</MenuItem>
              <MenuItem value={"모집 완료"}>모집 완료</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Button
          _onClick={() => {
            history.push(`/carpoolfilter/${skiresort}`);
          }}
        >
          필터
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default CarpoolControl;
