import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {carpoolActions} from '../redux/modules/carpool'

import CarpoolMenuBar from "../components/CarpoolMenuBar";
import CarpoolControl from "../components/CarpoolControl"
import Card from "../components/Card";

import "../elements/styles.css";
import { Grid, Button } from "../elements/index";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Carpool = (props) => {
  const dispatch= useDispatch();
  const carpool_list = useSelector(state => state.carpool.list);
  console.log(carpool_list);
  const skiResort = props.match.params.skiresort;

  React.useEffect(() => {
    dispatch(carpoolActions.getCarpoolDB(skiResort));
  }, [])

  return (
    <Grid is_flex align="center" direction="column">
      <Grid bg="#C4C4C4"></Grid>

      {/* 카풀/게시글 네비게이션 바 */}
      <CarpoolMenuBar match={props.match}/>
      
      <CarpoolControl/>

      {carpool_list.map(l => {
        return(
          <Grid key={l.postId} width='100%'>
            <Card {...l} />
          </Grid>
        )
      })}

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
