import React from "react";
import GlobalStyleds from "./shared/globalStyles";

import styled from "styled-components";
import { Route } from "react-router-dom";
//pages import
import Home from "./pages/Home";
import PhoneAuth from "./pages/PhoneAuth";
import SocialLogin from "./pages/SocialLogin";
import Carpool from "./pages/Carpool";
import CarpoolWrite from "./pages/CarpoolWrite";
import CarpoolFilter from "./pages/CarpoolFilter";
import FilterList from "./pages/FilterList";
import FreeBoardList from "../src/pages/FreeBoardList";
import FreeBoardWrite from "./pages/FreeBoardWrite";
import FreeBoardDetail from "./pages/FreeBoardDetail";
import PlaceInfo from "./pages/PlaceInfo";
import MyPage from "./pages/MyPage";
import ProfileWrite from "./pages/ProfileWrite";
import ChatList from "./pages/ChatList";
import Navbar from "./components/Navbar";
import ChatRoom from "./pages/ChatRoom";
import Snowflakes from "./components/Snowflakes";
import KakaoAuthHandle from "./components/KakaoAuthHandle";
import KakaoAuthHandle2 from "./components/KakaoAuthHandle2";
import NaverAuthHandle from "./components/NaverAuthHandle";
import ShortsUpload from "./pages/ShortsUpload";
import Shorts from "./pages/Shorts";

import background from "./assets/background.png.jpg";

function App() {
  // var video = document.getElementById("video");
  // console.log(video)
  return (
    <React.Fragment>
      <Container>
        <Snowflakes />
        <div id="wrap">
          <GlobalStyleds />
          <CardList>
            <Route exact path="/" component={Home} />
            <Route exact path="/phoneauth" component={PhoneAuth} />
            <Route exact path="/login" component={SocialLogin} />
            <Route
              exact
              path="/user/kakao/callback"
              component={KakaoAuthHandle}
            />
            <Route
              exact
              path="/user/kakao/callback/properties"
              component={KakaoAuthHandle2}
            />
            <Route
              exact
              path="/user/naver/callback"
              component={NaverAuthHandle}
            />
            <Route exact path="/carpool/:skiresort" component={Carpool} />
            <Route exact path="/filter/:skiresort" component={FilterList} />
            <Route exact path="/carpoolwrite" component={CarpoolWrite} />
            <Route
              exact
              path="/carpoolwrite/:skiresort"
              component={CarpoolWrite}
            />
            <Route
              exact
              path="/carpoolwrite/:skiresort/:postId"
              component={CarpoolWrite}
            />
            <Route
              exact
              path="/carpoolwrite/:page/:skiresort/:postId"
              component={CarpoolWrite}
            />
            <Route
              exact
              path="/carpoolfilter/:skiresort"
              component={CarpoolFilter}
            />
            <Route
              exact
              path="/freeboardlist/:skiresort"
              component={FreeBoardList}
            />
            <Route
              exact
              path="/freeboardwrite/:skiresort"
              component={FreeBoardWrite}
            />
            <Route
              exact
              path="/freeboardedit/:skiresort/:postId"
              component={FreeBoardWrite}
            />
            <Route
              exact
              path="/freeboarddetail/:skiresort/:postId"
              component={FreeBoardDetail}
            />
            <Route
              exact
              path="/freeboarddetail/:skiresort/:postId/:page"
              component={FreeBoardDetail}
            />
            <Route exact path="/placeinfo" component={PlaceInfo} />
            <Route exact path="/mypage" component={MyPage} />
            <Route exact path="/profilewrite" component={ProfileWrite} />
            <Route exact path="/chatlist" component={ChatList} />
            <Route
              exact
              path="/chatroom/:roomId/:roomName"
              component={ChatRoom}
            />
            <Route exact path="/shortsupload" component={ShortsUpload} />
            <Route exact path="/shortsupload/:shortsId" component={ShortsUpload} />
            <Route exact path="/shorts" component={Shorts} />
          </CardList>
          <Navbar />
        </div>
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #d9e3ee;
  /* background-size: contain; */
  overflow: hidden;
  position: relative;

  #wrap {
    width: 100%;
    max-width: 412px;
    height: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding: 0 auto;
    box-sizing: border-box;
    background-color: #d9e3ee;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    position: relative;

    @media screen and (min-width: 1024px) {
      position: relative;
      left: 27%;
      top: 0%;
      overflow: auto;
    }
  }

  @media screen and (min-width: 1200px) {
    background: url(${background}) no-repeat;
    background-size: 100% 100vh;
  }
`;

const CardList = styled.div`
  width: 100%;
  height: auto;
  max-height: 100vh;
  overflow-y: scroll;
`;

export default App;
