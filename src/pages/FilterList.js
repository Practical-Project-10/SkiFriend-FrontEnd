import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { carpoolActions } from "../redux/modules/carpool";

import CarpoolMenuBar from "../components/CarpoolMenuBar";
import Card from "../components/Card";
import FloatButton from "../components/FloatButton";
import Header from "../components/Header";

import { Grid, Image, Text } from "../elements/index";
import filter from "../assets/carpoolList/filter.svg";

const FilterList = (props) => {
  const history = props.history;
  const dispatch = useDispatch();
  const certification = localStorage.getItem("certification") === "true"? true: false;
  const carpool_list = useSelector((state) => state.carpool.filterList);
  const resortImg = useSelector((state) => state.carpool.resortImg);
  const skiResort = props.match.params.skiresort;

  useEffect(() => {
    dispatch(carpoolActions.imageResortDB(skiResort));
    if (carpool_list.length === 0) {
      history.push(`/carpool/${skiResort}`);
    }
  }, []);

  const induceProfile = () => {
    if (!certification) {
      window.alert("휴대폰 인증 후 이용할 수 있는 서비스 입니다. 인증하시겠습니까?");
      return null;
    }
    history.push(`/carpoolwrite/${skiResort}`);
  };

  return (
    <Grid>
      <Header
        goBack
        push
        _onClick={() => {
          history.push("/");
        }}
      >
        {skiResort}
      </Header>
      <Grid bg="#FFF" minHeight="calc( 100vh - 124px )" margin="0 0 70px">
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

          {carpool_list.map((l) => {
            return (
              <Grid key={l.postId} width="100%" padding="0 0 16px">
                <Card page='filter' {...l} skiResort={skiResort} />
              </Grid>
            );
          })}
        </Grid>

        <FloatButton _onClick={induceProfile} />
      </Grid>
    </Grid>
  );
};

export default FilterList;
