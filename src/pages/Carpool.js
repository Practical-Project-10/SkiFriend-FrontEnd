import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import CarpoolMenuBar from "../components/CarpoolMenuBar";
import CarpoolControl from "../components/CarpoolControl";
import Card from "../components/Card";
import FloatButton from "../components/FloatButton";
import InfinityScroll from "../components/InfinityScroll";

import { Grid, Button } from "../elements/index";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Carpool = (props, { location }) => {
  const history = props.history;
  const dispatch = useDispatch();
  console.log(props);
  const nickname = localStorage.getItem("nickname");
  const is_mine = props.nickname === nickname;
  const is_profile = localStorage.getItem("is_profile");
  const carpool_list = useSelector((state) => state.carpool.list);
  const page = useSelector((state) => state.carpool.page);
  const is_loading = useSelector((state) => state.carpool.is_loading);
  const skiResort = props.match.params.skiresort;

  React.useEffect(() => {
    if (carpool_list.length === 0) {
      dispatch(carpoolActions.getCarpoolDB(skiResort, page));
    }
  }, []);

  const induceProfile = () => {
    if (!is_profile) {
      window.alert("프로필 작성 후 이용할 수 있는 서비스 입니다.");
      return null;
    }
    history.push(`/carpoolwrite/${skiResort}`);
  };

  return (
    <Grid is_flex align="center" direction="column" heigth="100px">
      <Grid bg="#C4C4C4"></Grid>

      {/* 카풀/게시글 네비게이션 바 */}
      <CarpoolMenuBar match={props.match} />

      <CarpoolControl />

      <InfinityScroll
        callNext={() => {
          dispatch(carpoolActions.getCarpoolDB(skiResort, page));
        }}
        is_loading={is_loading}
      >
        {carpool_list.map((l) => {
          return (
            <Grid key={l.postId} width="100%">
              {is_mine ? (
                <Card {...l} skiResort={skiResort} is_mine />
              ) : (
                <Card {...l} skiResort={skiResort} />
              )}
            </Grid>
          );
        })}
      </InfinityScroll>

      <FloatButton _onClick={induceProfile} />
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
