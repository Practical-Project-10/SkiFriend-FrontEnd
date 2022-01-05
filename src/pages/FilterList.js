import React from "react";
import { useSelector } from "react-redux";

import CarpoolMenuBar from "../components/CarpoolMenuBar";
import Card from "../components/Card";
import FloatButton from "../components/FloatButton";

import { Grid, Image, Text } from "../elements/index";
import filter from "../assets/carpoolList/filter.svg"
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const FilterList = (props) => {
  const history = props.history;
  const is_profile = localStorage.getItem("is_profile");
  const carpool_list = useSelector((state) => state.carpool.list);
  const skiResort = props.match.params.skiresort;

  React.useEffect(() => {
    if (carpool_list.length === 0) {
      history.push(`/carpool/${skiResort}`);
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
    
    <Grid is_flex align="center" direction="column">
      <Grid bg="#C4C4C4"></Grid>

      {/* 카풀/게시글 네비게이션 바 */}
      <CarpoolMenuBar match={props.match} />

      <Grid cursor is_flex justify='center' width='66px' height='30px' margin='16px 0' border='2px solid #6195CF' radius='6px'
          _onClick={() => {
            history.push(`/carpoolfilter/${skiResort}`);
          }}
        >
          <Image src={filter} width='20px' height='20px'/>
          <Text bold color='#6195CF'>필터</Text>
        </Grid>
      <Grid>

        {carpool_list.map((l) => {
          return (
            <Grid key={l.postId} width="100%">
              <Card {...l} skiResort={skiResort} />
            </Grid>
          );
        })}
      </Grid>
      {/* <Stack spacing={2}>
        <Pagination count={5} />
      </Stack> */}
      <FloatButton _onClick={induceProfile} />
    </Grid>
  );
};

export default FilterList;
