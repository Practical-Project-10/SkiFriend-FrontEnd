import React, { useState } from "react";

import styled from "styled-components";
import { Grid, Image, Text } from "../elements/index";

import SkiIcon from "../components/SkiIcon"
import Header from "../components/Header";

import High1 from "../assets/high1_logo.svg";
import YongPyong from "../assets/yongpyong_logo.svg";
import Vivaldi from "../assets/vivaldi_logo.svg";
import Phoenix from "../assets/phoenix_logo.svg";
import Wellihilli from "../assets/welli_logo.svg";
import Konjiam from "../assets/konjiam_logo.svg";
import drop from "../assets/drop.svg"

const PlaceInfo = () => {
  const [toggleState, setToggleState] = useState({
    tabHighOne: false,
    tabYongPyong: false,
    tabVivaldiPark: false,
    tabPhoenix: false,
    tabWellihilliPark: false,
    tabKonjiam: false,
  });
  //객체를 배열로 변경 -- 142줄 
  const list = Object.entries(toggleState);

  const toggleMenu = (e) => {
    const {id} = e.currentTarget;
    //id와 일치하는 요소를 반환
    const state = list.filter(t => t[0] === id);

    if(state[0][1] === false) {
      setToggleState(
        {
          ...toggleState,
          [id]: true,
        }
      )
    };

    if(state[0][1] === true) {
      setToggleState(
        {
          ...toggleState,
          [id]: false,
        }
      )
    };
    // const newToggleState = { ...toggleState };
    // const activeToggleState = e.currentTarget.id;
    // for (let key in newToggleState) {
    //   key === activeToggleState
    //     ? (newToggleState[key] = true)
    //     : (newToggleState[key] = false);
    // }
    // setToggleState(newToggleState);
  };

  const resortInfo = [
    {// 하이원
      resort: '하이원',
      id: 'tabHighOne',
      logo: High1,
      intro: "https://www.high1.com/ski/contents.do?key=730",
      slope: "https://www.high1.com/ski/slopeView.do?key=748&mode=p",
      fare: "https://www.high1.com/ski/contents.do?key=750",
      weather: "http://www.high1.com/www/contents.do?key=622",
    },
    {// 용평
      resort: '용평',
      id: 'tabYongPyong',
      logo: YongPyong,
      intro: "https://www.yongpyong.co.kr/kor/skiNboard/introduce.do",
      slope: "https://www.yongpyong.co.kr/kor/skiNboard/slope/introduce.do",
      fare: "https://www.yongpyong.co.kr/kor/skiNboard/utilizationFee/rentCharge.do",
      weather: "https://www.yongpyong.co.kr/kor/skiNboard/live.do",
    },
    {// 비발디
      resort: '비발디',
      id: 'tabVivaldiPark',
      logo: Vivaldi,
      intro: "https://www.sonohotelsresorts.com/daemyung.vp.skiworld.index.ds/dmparse.dm",
      slope: "https://www.sonohotelsresorts.com/daemyung.vp.skiworld.04_02_01.ds/dmparse.dm",
      fare: "https://www.sonohotelsresorts.com/daemyung.vp.skiworld.04_04_01.ds/dmparse.dm",
      weather: "https://www.kweather.co.kr/forecast/forecast_sports.html?index=6&area=42720370%7C212&rname=Xff3UAv5Ux72VicBTAj8Uv73ZOYN&idx=ski",
    },
    {// 휘닉스
      resort: '휘닉스',
      id: 'tabPhoenix',
      logo: Phoenix,
      intro: "https://phoenixhnr.co.kr/static/pyeongchang/guide/intro",
      slope: "https://phoenixhnr.co.kr/static/pyeongchang/snowpark/slope-lift",
      fare: "https://phoenixhnr.co.kr/static/pyeongchang/guide/price/snowpark",
      weather: "https://phoenixhnr.co.kr/static/pyeongchang/guide/weather/weather1",
    },
    {// 웰리힐리
      resort: '웰리힐리',
      id: 'tabWellihilliPark',
      logo: Wellihilli,
      intro: "https://www.wellihillipark.com/snowpark/snowpark/intro",
      slope: "https://www.wellihillipark.com/snowpark/snowpark/slope-guide",
      fare: "https://www.wellihillipark.com/home/guide/pay/snowpark)",
      weather: "https://www.wellihillipark.com/home/guide/weather",
    },
    {// 곤지암
      resort: '곤지암',
      id: 'tabKonjiam',
      logo: Konjiam,
      intro: "https://www.konjiamresort.co.kr/ski/useInfo.dev",
      slope: "https://www.konjiamresort.co.kr/ski/sloPe.dev",
      fare: "https://www.konjiamresort.co.kr/funny/useChargeSkiMeTimePass.dev",
      weather: "https://www.konjiamresort.co.kr/contact/weather.dev",
    },
  ];

  return (
    <React.Fragment>
      <Grid>
        <Header>스키장 정보</Header>
        <Grid phoneSize bg='#FFF' margin='0 0 70px 0' minHeight='calc( 100vh - 124px )' radius='22px 22px 0 0'>
          {/* 하이원 정보 */}
          {resortInfo.map((r, i) => {
            
            return(
              <Grid id={r.id} key={r.id} _onClick={toggleMenu}>
                <Grid is_flex>
                  <Grid padding='16px 0' margin='0 13px 0 0'>
                    <SkiIcon border='2px solid #6195CF' src={r.logo}/>
                  </Grid>
                  <Grid width='100%' is_flex justify='space-between'>
                    <Grid width='70px' align='center'>
                      <Text size='17px'>{r.resort}</Text>
                    </Grid>
                    <Grid>
                      <Image src={drop} width='46px' height='46px'/>
                    </Grid>
                  </Grid>
                </Grid>

                {/* 토글 메뉴 */}
                {list[i][1] &&
                  <Toggle width="100px" align='center' margin='0 auto'>
                    <Info
                      href={r.intro}
                      target="_blank"
                    >
                      소개
                    </Info>

                    <Info
                      href={r.slope}
                      target="_blank"
                    >
                      슬로프안내
                    </Info>

                    <Info
                      href={r.fare}
                      target="_blank"
                    >
                      요금정보
                    </Info>

                    <Info
                      href={r.weather}
                      target="_blank"
                    >
                      날씨
                    </Info>
                  </Toggle>
                }
                <div style={{border: '1px solid #adb6c1'}}></div>
              </Grid>
            )
          })}

        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Toggle = styled.div`
  width: 380px;
  height: 218px;
  padding: 9px;
  background-color: #D9E3EE;
  text-align: center;
  border-top: 2px solid #adb6c1;
`

const Info = styled.a`
  display: block;
  height: 43px;
  margin-bottom: 9px;
  background-color: #FFF;
  font-size: 14px;
  line-height: 42px;
  border: 1px solid #6195CF;
  border-radius: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`

export default PlaceInfo;