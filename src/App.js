import React from "react";
import GlobalStyleds from "./shared/globalStyles";

import { Grid } from "./elements/index";
import { Route } from "react-router-dom";
//pages import
import Header from "./components/Header";
import Home from "./pages/Home";
import PhoneAuth from "./pages/PhoneAuth";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
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
import PwdChange from "./pages/PwdChange";
import ChatList from "./pages/ChatList";
import Navbar from "./components/Navbar";
import ChatRoom from "./pages/ChatRoom";

import styled from "styled-components";

function App() {
  return (
    <React.Fragment>
      <Grid mainFrame>
        <GlobalStyleds />
        <Header />
        <Route exact path="/" component={Home}></Route>
        <Route path="/phoneauth" component={PhoneAuth}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login} />
        <Route path="/carpool/:skiresort" component={Carpool} />
        <Route path="/filter/:skiresort" component={FilterList} />
        <Route exact path="/carpoolwrite" component={CarpoolWrite} />
        <Route exact path="/carpoolwrite/:skiresort" component={CarpoolWrite} />
        <Route
          path="/carpoolwrite/:skiresort/:postId"
          component={CarpoolWrite}
        />
        <Route path="/carpoolfilter/:skiresort" component={CarpoolFilter} />
        <Route path="/freeboardlist/:skiresort" component={FreeBoardList} />
        <Route path="/freeboardwrite/:skiresort" component={FreeBoardWrite} />
        <Route
          path="/freeboardedit/:skiresort/:postId"
          component={FreeBoardWrite}
        />
        <Route
          path="/freeboarddetail/:skiresort/:postId"
          component={FreeBoardDetail}
        />
        <Route path="/placeinfo" component={PlaceInfo} />
        <Route path="/mypage" component={MyPage} />
        <Route exact path="/profilewrite" component={ProfileWrite}></Route>
        <Route
          exact
          path="/profilewrite/:username"
          component={ProfileWrite}
        ></Route>
        <Route
          path="/profilewrite/:username/pwdchange"
          component={PwdChange}
        ></Route>
        <Route path="/chatlist" component={ChatList} />
        <Route path="/chatroom/:roomId" component={ChatRoom} />
        {/* <Navbar /> */}
      </Grid>
    </React.Fragment>
  );
}

export default App;
