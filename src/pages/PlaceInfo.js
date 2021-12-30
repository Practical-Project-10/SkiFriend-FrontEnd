import React, { useState } from "react";
import { Grid, Button } from "../elements/index";

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

  const intro = [
    "https://www.high1.com/ski/contents.do?key=730",
    "https://www.yongpyong.co.kr/kor/skiNboard/introduce.do",
    "https://www.sonohotelsresorts.com/daemyung.vp.skiworld.index.ds/dmparse.dm",
    "https://phoenixhnr.co.kr/static/pyeongchang/guide/intro",
    "https://www.wellihillipark.com/snowpark/snowpark/intro",
    "https://www.konjiamresort.co.kr/ski/useInfo.dev",
  ];

  const slope_info = [
    "https://www.high1.com/ski/slopeView.do?key=748&mode=p",
    "https://www.yongpyong.co.kr/kor/skiNboard/slope/introduce.do",
    "https://www.sonohotelsresorts.com/daemyung.vp.skiworld.04_02_01.ds/dmparse.dm",
    "https://phoenixhnr.co.kr/static/pyeongchang/snowpark/slope-lift",
    "https://www.wellihillipark.com/snowpark/snowpark/slope-guide",
    "https://www.konjiamresort.co.kr/ski/sloPe.dev",
  ];

  const fare_info = [];

  const weather_info = [];
  return (
    <React.Fragment>
      <Grid header>스키장정보</Grid>
      <Grid align="center">
        {/* 하이원 정보 */}
        <Grid id="tabHighOne" _onClick={toggleMenu}>
          <Button placeBtn>하이윈</Button>
          {toggleState.tabHighOne ? (
            <React.Fragment>
              <Grid>
                <Grid
                  link
                  href="https://www.high1.com/ski/contents.do?key=730"
                  target="_blank"
                >
                  소개
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://www.high1.com/ski/slopeView.do?key=748&mode=p"
                  target="_blank"
                >
                  슬로프안내
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://www.high1.com/ski/contents.do?key=750"
                  target="_blank"
                >
                  요금정보
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="http://www.high1.com/www/contents.do?key=622"
                  target="_blank"
                >
                  날씨
                </Grid>
              </Grid>
            </React.Fragment>
          ) : (
            ""
          )}
        </Grid>
        {/* 용평정보 */}
        <Grid id="tabYongPyong" _onClick={toggleMenu}>
          <Button placeBtn>용평</Button>
          {toggleState.tabYongPyong ? (
            <React.Fragment>
              <Grid>
                <Grid
                  link
                  href="https://www.yongpyong.co.kr/kor/skiNboard/introduce.do"
                  target="_blank"
                >
                  소개
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://www.yongpyong.co.kr/kor/skiNboard/slope/introduce.do"
                  target="_blank"
                >
                  슬로프안내
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://www.yongpyong.co.kr/kor/skiNboard/utilizationFee/rentCharge.do"
                  target="_blank"
                >
                  요금정보
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://www.yongpyong.co.kr/kor/skiNboard/live.do"
                  target="_blank"
                >
                  날씨
                </Grid>
              </Grid>
            </React.Fragment>
          ) : (
            ""
          )}
        </Grid>
        {/* 비발디정보 */}
        <Grid id="tabVivaldiPark" _onClick={toggleMenu}>
          <Button placeBtn>비발디</Button>
          {toggleState.tabVivaldiPark ? (
            <React.Fragment>
              <Grid>
                <Grid
                  link
                  href="https://www.sonohotelsresorts.com/daemyung.vp.skiworld.index.ds/dmparse.dm"
                  target="_blank"
                >
                  소개
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://www.sonohotelsresorts.com/daemyung.vp.skiworld.04_02_01.ds/dmparse.dm"
                  target="_blank"
                >
                  슬로프안내
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://www.sonohotelsresorts.com/daemyung.vp.skiworld.04_04_01.ds/dmparse.dm"
                  target="_blank"
                >
                  요금정보
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://www.kweather.co.kr/forecast/forecast_sports.html?index=6&area=42720370%7C212&rname=Xff3UAv5Ux72VicBTAj8Uv73ZOYN&idx=ski"
                  target="_blank"
                >
                  날씨
                </Grid>
              </Grid>
            </React.Fragment>
          ) : (
            ""
          )}
        </Grid>
        {/* 휘닉스정보 */}
        <Grid id="tabPhoenix" _onClick={toggleMenu}>
          <Button placeBtn>휘닉스</Button>
          {toggleState.tabPhoenix ? (
            <React.Fragment>
              <Grid>
                <Grid
                  link
                  href="https://phoenixhnr.co.kr/static/pyeongchang/guide/intro"
                  target="_blank"
                >
                  소개
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://phoenixhnr.co.kr/static/pyeongchang/snowpark/slope-lift"
                  target="_blank"
                >
                  슬로프안내
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://phoenixhnr.co.kr/static/pyeongchang/guide/price/snowpark"
                  target="_blank"
                >
                  요금정보
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://phoenixhnr.co.kr/static/pyeongchang/guide/weather/weather1"
                  target="_blank"
                >
                  날씨
                </Grid>
              </Grid>
            </React.Fragment>
          ) : (
            ""
          )}
        </Grid>
        {/* 윌리휠리정보 */}
        <Grid id="tabWellihilliPark" _onClick={toggleMenu}>
          <Button placeBtn>윌리휠리</Button>
          {toggleState.tabWellihilliPark ? (
            <React.Fragment>
              <Grid>
                <Grid
                  link
                  href="https://www.wellihillipark.com/snowpark/snowpark/intro"
                  target="_blank"
                >
                  소개
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://www.wellihillipark.com/snowpark/snowpark/slope-guide"
                  target="_blank"
                >
                  슬로프안내
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://www.wellihillipark.com/home/guide/pay/snowpark"
                  target="_blank"
                >
                  요금정보
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://www.wellihillipark.com/home/guide/weather"
                  target="_blank"
                >
                  날씨
                </Grid>
              </Grid>
            </React.Fragment>
          ) : (
            ""
          )}
        </Grid>
        {/* 곤지암정보 */}
        <Grid id="tabKonjiam" _onClick={toggleMenu}>
          <Button placeBtn>곤지암</Button>
          {toggleState.tabKonjiam ? (
            <React.Fragment>
              <Grid>
                <Grid
                  link
                  href="https://www.konjiamresort.co.kr/ski/useInfo.dev"
                  target="_blank"
                >
                  소개
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://www.konjiamresort.co.kr/ski/sloPe.dev"
                  target="_blank"
                >
                  슬로프안내
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://www.konjiamresort.co.kr/funny/useChargeSkiMeTimePass.dev"
                  target="_blank"
                >
                  요금정보
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  link
                  href="https://www.konjiamresort.co.kr/contact/weather.dev"
                  target="_blank"
                >
                  날씨
                </Grid>
              </Grid>
            </React.Fragment>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default PlaceInfo;
