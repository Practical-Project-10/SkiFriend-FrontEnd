import React from "react";
import GlobalStyleds from "./shared/globalStyles";

import { Grid } from "./elements/SharedCSS";
import { Route } from "react-router-dom";
//pages import
import Home from "./pages/Home";
import PhoneAuth from "./pages/PhoneAuth";
import SignupOne from "./pages/SignupOne";
import SignupTwo from "./pages/SignupTwo";
import Login from "./pages/Login";
import Carpool from "./pages/Carpool";
import CarpoolWrite from "./pages/CarpoolWrite";
import CarpoolFilter from "./components/CarpoolFilter";
import Card from "./components/Card";
import FreeBoardList from "../src/pages/FreeBoardList";
import FreeBoardWrite from "./pages/FreeBoardWrite";
import FreeBoardDetail from "./pages/FreeBoardDetail";
import PlaceInfo from "./pages/PlaceInfo";
import PlaceInfoDetail from "./pages/PlaceInfoDetail";
import MyPage from "./pages/MyPage";
import ChatList from "./pages/ChatList";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ChatRoom from "./pages/ChatRoom";
import BoundChangeBox from "./components/BoundChangeBox";

function App() {
  return (
    <React.Fragment>
      <GlobalStyleds />
      <Grid mainFrame>
        {/* <Header/> */}
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/phoneauth" component={PhoneAuth}></Route>
        <Route path="/signupone" component={SignupOne}></Route>
        <Route path="/signupTwo" component={SignupTwo}></Route>
        <Route path="/login" component={Login} />
        <Route path="/carpool" component={Carpool} />
        <Route path="/carpoolwrite" component={CarpoolWrite} />
        <Route path="/carpoolfilter" component={CarpoolFilter} />
        <Route path="/card" component={Card} />
        <Route path="/freeboardlist" component={FreeBoardList} />
        <Route path="/freeboardwrite" component={FreeBoardWrite} />
        <Route path="/freeboarddetail/:postId" component={FreeBoardDetail} />
        <Route path="/placeinfo" component={PlaceInfo} />
        <Route path="/placeinfodetail" component={PlaceInfoDetail} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/chatroom" component={ChatRoom} />
        <Route path="/chatlist" component={ChatList} />
        <Route path="/boundchangebox" component={BoundChangeBox} />
        <Navbar />
      </Grid>
    </React.Fragment>
  );
};

export default App;
