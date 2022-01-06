import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import CarpoolMenuBar from "../components/CarpoolMenuBar";
import Card from "../components/Card";
import FloatButton from "../components/FloatButton";
import InfinityScroll from "../components/InfinityScroll";
import Header from "../components/Header";

import { Grid, Button, Image, Text } from "../elements/index";
import High from "../assets/skiImage/HighOne/HighOne3.png";
import filter from "../assets/carpoolList/filter.svg";

const Carpool = (props, { location }) => {
  const history = props.history;
  const dispatch = useDispatch();
  const carpool_list = useSelector((state) => state.carpool.list);
  // const carpool_list = resort_carpool.filter(l)
  console.log(carpool_list)
  const page = useSelector((state) => state.carpool.page);
  const is_loading = useSelector((state) => state.carpool.is_loading);
  const is_login = localStorage.getItem('is_login');
  const is_profile = localStorage.getItem('is_profile');
  const skiResort = props.match.params.skiresort;

  React.useEffect(() => {
    dispatch(carpoolActions.getCarpoolDB(skiResort, page));
  }, []);

  const induceProfile = () => {
    if (!is_login) {
      window.alert("로그인 후 이용할 수 있는 서비스 입니다.");
      return null;
    }

    if (!is_profile) {
      window.alert("프로필 작성 후 이용할 수 있는 서비스 입니다.");
      return null;
    }
    history.push(`/carpoolwrite/${skiResort}`);
  };

  return (
    <Grid>
      <Header goBack>{skiResort}</Header>
      <Grid bg="#FFF" minHeight='calc( 100vh - 124px )' margin='0 0 70px'>
        <Grid width="100%" height="291px">
          {/* <Image src={High} size="cover" width="100%" height="100%" /> */}
        </Grid>

        <Grid width="100%">
          <CarpoolMenuBar match={props.match} />
        </Grid>

        <Grid phoneSize>
          <Grid
            cursor
            is_flex
            justify="center"
            width="66px"
            height="30px"
            margin="16px 0"
            border="2px solid #6195CF"
            radius="6px"
            _onClick={() => {
              history.push(`/carpoolfilter/${skiResort}`);
            }}
          >
            <Image src={filter} width="20px" height="20px" />
            <Text bold color="#6195CF">
              필터
            </Text>
          </Grid>

          {/* <InfinityScroll
            callNext={() => {
              dispatch(carpoolActions.getCarpoolDB(skiResort, page));
            }}
            is_loading={is_loading}
          > */}
            {carpool_list.map((l) => {
              return (
                <Grid key={l.postId} padding='0 0 16px 0' >
                  <Card {...l} skiResort={skiResort}/>
                </Grid>
              );
            })}
          {/* </InfinityScroll> */}
        </Grid>

        <FloatButton _onClick={induceProfile} /> 

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
