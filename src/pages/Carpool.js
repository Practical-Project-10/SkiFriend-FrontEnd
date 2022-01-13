import React from "react";

import _ from 'lodash';

import { useDispatch, useSelector } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import CarpoolMenuBar from "../components/CarpoolMenuBar";
import Card from "../components/Card";
import FloatButton from "../components/FloatButton";
import Header from "../components/Header";

import styled from 'styled-components';
import { Grid, Image, Text } from "../elements/index";
import filter from "../assets/carpoolList/filter.svg";

const Carpool = (props) => {
  const history = props.history;
  const dispatch = useDispatch();
  const carpool_list = useSelector((state) => state.carpool.list);
  const page = useSelector((state) => state.carpool.page);
  const is_loading = useSelector((state) => state.carpool.is_loading);
  const is_next = useSelector((state) => state.carpool.is_next);
  const resortImg = useSelector((state) => state.carpool.resortImg);
  const is_login = localStorage.getItem("is_login");
  const is_profile = localStorage.getItem("is_profile");
  const skiResort = props.match.params.skiresort;


  React.useEffect(() => {
    dispatch(carpoolActions.imageResortDB(skiResort));
    dispatch(carpoolActions.getCarpoolDB(skiResort, page)); //
  }, []);

  const induceProfile = () => {
    if (is_login !== "true") {
      const ask = window.confirm(
        "로그인 후 이용할 수 있는 서비스 입니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (ask) {
        return history.push(`/login`);
      }
      return null;
    }

    if (is_profile !== "true") {
      const ask = window.confirm(
        "프로필 작성 후 이용할 수 있는 서비스 입니다. 마이페이지로 이동하시겠습니까?"
      );
      if (ask) {
        return history.push(`/mypage`);
      }
      return null;
    }
    history.push(`/carpoolwrite/${skiResort}`);
  };

  const list = document.getElementById('list');
  const cardList = document.getElementById('cardList');

  const infinifyScroll = _.throttle(() => {    
    const recentScroll = list? list.scrollTop: null;
    const cardListHeight = cardList? cardList.offsetHeight: null;
    const listHeight = list? list.scrollHeight: null
    console.log(listHeight , cardListHeight , recentScroll)
    console.log(listHeight - cardListHeight - recentScroll)

    if(is_loading) {
      return;
    }

    if(listHeight - cardListHeight - recentScroll < 20) {
      if(is_next){
        dispatch(carpoolActions.getCarpoolDB(skiResort, page));
      }
    }
  }, 1000)


  return (
    <CardList id='list' onScroll={infinifyScroll}>
      <Header
        goBack
        push
        _onClick={() => {
          history.push("/");
        }}
      >
        {skiResort}
      </Header>
      <Grid id="cardList" bg="#FFF" minHeight="calc( 100vh - 124px )" margin="0 0 70px">
        <Grid width="100%" height="210px">
          <Image src={resortImg} size="cover" width="100%" height="100%" />
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

          {carpool_list[skiResort].map((l) => {
            return (
              <Grid key={l.postId} padding="0 0 16px 0">
                <Card page='carpool' {...l} skiResort={skiResort} />
              </Grid>
            );
          })}
        </Grid>

        <FloatButton _onClick={induceProfile} />
      </Grid>
    </CardList>
  );
};

Carpool.defaultProps = {
  skiResort: "하이원",
  id: "",
  skiResortImg:
    "https://ww.namu.la/s/8824bc74d5ab99b1b526bdc3f8f22d449d90c7807c7dba5c576468522e89d158d227d98274f8f9433a7e6d7e2fb6d40b77958a91da322fed977c2ef80f241eba318aec584de0f642748dd476e983e1ca",
};

const CardList = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100vh;
  overflow-y: scroll;
  /* position: relative; */
`;

export default Carpool;
