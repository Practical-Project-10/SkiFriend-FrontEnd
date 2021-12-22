import React from "react";

import { Grid } from "./elements/SharedCSS";
import { Route } from "react-router-dom";
//pages import
import SignupOne from "./pages/SignupOne";
import SignupTwo from "./pages/SignupTwo";
import Login from "./pages/Login";
import Carpool from "./pages/Carpool";
import CarpoolWrite from "./pages/CarpoolWrite";
import Card from "./components/Card";
import FreeBoardList from "../src/pages/FreeBoardList";
import FreeBoardWrite from "./pages/FreeBoardWrite";
import FreeBoardDetail from "./pages/FreeBoardDetail";
import MyPage from "./pages/MyPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <React.Fragment>
      <Grid mainFrame>
        <Route exact path="/signupone" component={SignupOne}></Route>
        <Route path="/signupTwo" component={SignupTwo}></Route>
        <Route path="/login" component={Login} />
        <Route path="/carpool" component={Carpool} />
        <Route path="/carpoolwrite" component={CarpoolWrite} />
        <Route path="/card" component={Card} />
        <Route path="/freeboardlist" component={FreeBoardList} />
        <Route path="/freeboardwrite" component={FreeBoardWrite} />
        <Route path="/freeboarddetail" component={FreeBoardDetail} />
        <Route path="/mypage" component={MyPage} />
        <Navbar />
      </Grid>
    </React.Fragment>
  );
}

export default App;
