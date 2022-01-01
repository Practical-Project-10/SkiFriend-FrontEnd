import React from "react";
import { useSelector } from "react-redux";

import CarpoolMenuBar from "../components/CarpoolMenuBar";
import CarpoolControl from "../components/CarpoolControl";
import Card from "../components/Card";
import FloatButton from "../components/FloatButton";

import "../elements/styles.css";
import { Grid } from "../elements/index";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const FilterList = (props, { location }) => {
  const history = props.history;
  const is_profile = localStorage.getItem("is_profile");
  console.log(is_profile);
  const carpool_list = useSelector((state) => state.carpool.filter);
  console.log(carpool_list);

  const skiResort = props.match.params.skiresort;

  const induceProfile = () => {
    if (!is_profile) {
      window.alert("프로필 작성 후 이용할 수 있는 서비스 입니다.");
      return null;
    }
    history.push(`/carpoolwrite/${skiResort}`);
  };

  React.useEffect(() => {
    if (carpool_list.length === 0) {
      history.push(`/carpool/${skiResort}`);
    }
  }, []);

  return (
    <Grid is_flex align="center" direction="column">
      <Grid bg="#C4C4C4"></Grid>

      {/* 카풀/게시글 네비게이션 바 */}
      <CarpoolMenuBar match={props.match} />

      <CarpoolControl />

      {carpool_list.map((l) => {
        return (
          <Grid key={l.postId} width="100%">
            <Card {...l} skiResort={skiResort} />
          </Grid>
        );
      })}

      <Stack spacing={2}>
        <Pagination count={5} />
      </Stack>

      <FloatButton _onClick={induceProfile} />
    </Grid>
  );
};

FilterList.defaultProps = {
  skiResort: "하이원",
  id: "",
  skiResortImg:
    "https://ww.namu.la/s/8824bc74d5ab99b1b526bdc3f8f22d449d90c7807c7dba5c576468522e89d158d227d98274f8f9433a7e6d7e2fb6d40b77958a91da322fed977c2ef80f241eba318aec584de0f642748dd476e983e1ca",
};
export default FilterList;
