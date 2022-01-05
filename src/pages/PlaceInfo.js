import React, { useState } from "react";
import { Grid, Button, Image, Text } from "../elements/index";

import SkiIcon from "../components/SkiIcon"

import High1 from "../assets/skiInfo/high1_logo.png";
import YongPyong from "../assets/skiInfo/yongpyong_logo.png";
import VivaldiPark from "../assets/skiInfo/vivaldi_logo.png";
import Phoenix from "../assets/skiInfo/phoenix_logo.png";
import WellihilliPark from "../assets/skiInfo/welli_logo.png";
import Konjiam from "../assets/skiInfo/kongiam_logo.png";
import drop from "../assets/skiInfo/drop.svg"

const PlaceInfo = () => {
  const [toggleState, setToggleState] = useState({
    tabHighOne: false,
    tabYongPyong: false,
    tabVivaldiPark: false,
    tabPhoenix: false,
    tabWellihilliPark: false,
    tabKonjiam: false,
  });

  const toggleMenu = (e) => {
    const newToggleState = { ...toggleState };
    const activeToggleState = e.currentTarget.id;
    for (let key in newToggleState) {
      key === activeToggleState
        ? (newToggleState[key] = true)
        : (newToggleState[key] = false);
    }
    setToggleState(newToggleState);
  };

  const resortInfo = [
    {// 하이원
      resort: '하이원',
      logo: High1,
      intro: "https://www.high1.com/ski/contents.do?key=730",
      slope: "https://www.high1.com/ski/slopeView.do?key=748&mode=p",
      fare: "https://www.high1.com/ski/contents.do?key=750",
      weather: "http://www.high1.com/www/contents.do?key=622",
    },
    {// 용평
      resort: '용평',
      logo: YongPyong,
      intro: "https://www.yongpyong.co.kr/kor/skiNboard/introduce.do",
      slope: "https://www.yongpyong.co.kr/kor/skiNboard/slope/introduce.do",
      fare: "https://www.yongpyong.co.kr/kor/skiNboard/utilizationFee/rentCharge.do",
      weather: "https://www.yongpyong.co.kr/kor/skiNboard/live.do",
    },
    {// 비발디
      resort: '비발디',
      logo: VivaldiPark,
      intro: "https://www.sonohotelsresorts.com/daemyung.vp.skiworld.index.ds/dmparse.dm",
      slope: "https://www.sonohotelsresorts.com/daemyung.vp.skiworld.04_02_01.ds/dmparse.dm",
      fare: "https://www.sonohotelsresorts.com/daemyung.vp.skiworld.04_04_01.ds/dmparse.dm",
      weather: "https://www.kweather.co.kr/forecast/forecast_sports.html?index=6&area=42720370%7C212&rname=Xff3UAv5Ux72VicBTAj8Uv73ZOYN&idx=ski",
    },
    {// 휘닉스
      resort: '휘닉스',
      logo: Phoenix,
      intro: "https://phoenixhnr.co.kr/static/pyeongchang/guide/intro",
      slope: "https://phoenixhnr.co.kr/static/pyeongchang/snowpark/slope-lift",
      fare: "https://phoenixhnr.co.kr/static/pyeongchang/guide/price/snowpark",
      weather: "https://phoenixhnr.co.kr/static/pyeongchang/guide/weather/weather1",
    },
    {// 웰리힐리
      resort: '웰리힐리',
      logo: WellihilliPark,
      intro: "https://www.wellihillipark.com/snowpark/snowpark/intro",
      slope: "https://www.wellihillipark.com/snowpark/snowpark/slope-guide",
      fare: "https://www.wellihillipark.com/home/guide/pay/snowpark)",
      weather: "https://www.wellihillipark.com/home/guide/weather",
    },
    {// 곤지암
      resort: '곤지암',
      logo: Konjiam,
      intro: "https://www.konjiamresort.co.kr/ski/useInfo.dev",
      slope: "https://www.konjiamresort.co.kr/ski/sloPe.dev",
      fare: "https://www.konjiamresort.co.kr/funny/useChargeSkiMeTimePass.dev",
      weather: "https://www.konjiamresort.co.kr/contact/weather.dev",
    },
  ]

  return (
    <React.Fragment>
      <Grid phoneSize>
        {/* 하이원 정보 */}
        <Grid _onClick={toggleMenu}>
          {resortInfo.map(r => {
            return(
              <Grid>
                <Grid is_flex>
                  <Grid padding='16px 0' margin='0 13px 0 0'>
                    <SkiIcon border='2px solid #6195CF' src={r.logo}/>
                  </Grid>
                  <Grid width='100%' is_flex justify='space-between'>
                    <Grid width='70px' align='center'>
                      <Text size='17px'>{r.resort}</Text>
                    </Grid>
                    <Image src={drop} width='20px' height='19px'/>
                  </Grid>
                </Grid>
                <div style={{border: '1px solid #adb6c1'}}></div>
              </Grid>
            )
          })}

        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default PlaceInfo;
