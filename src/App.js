import "./App.css";
import React from "react";

import {Grid} from "./elements/SharedCSS";
import { Route } from "react-router-dom";
import Carpool from './pages/Carpool';
import CarpoolWrite from "./pages/CarpoolWrite";
import Card from "./components/Card";
import FreeBoard from "../src/pages/FreeBoard";
import Login from "./pages/Login";
import SignupOne from "./pages/SignupOne";
import SignupTwo from "./pages/SignupTwo";


function App() {
  return (
    <React.Fragment>
      <Grid mainFrame>
        <Route path="/carpool" exact component ={Carpool}/>
        <Route path="/carpoolwrite"  component ={CarpoolWrite}/>
        <Route path="/login"  component ={Login}/>
        <Route path="/card"  component ={Card}/>
        <Route path="/freeboard" component={FreeBoard} />
        <Route path='/signupone' component={SignupOne}></Route>
        <Route path='/signupTwo' component={SignupTwo}></Route>
      </Grid>
    </React.Fragment>
  );
}

export default App;
