import React from "react";

import { NavLink, withRouter } from "react-router-dom";

import styled from "styled-components";
import { Grid, Text } from "../elements/index";

// react-icons
import { AiTwotoneHome, AiOutlineHome } from "react-icons/ai";
import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { BsChatFill, BsChat } from "react-icons/bs";
import { AiFillAppstore, AiOutlineAppstore } from "react-icons/ai";

const Navbar = ({ location }) => {

  if(location.pathname === '/login') {
    return null;
  }

  if(location.pathname === '/phoneauth') {
    return null;
  }

  if(location.pathname === '/signup') {
    return null;
  }

  return (
    <React.Fragment>
      <FixedNav>
        <Grid is_flex navbar>
          <NavLink to="/" className="navLink">
            {location.pathname === "/" ? (
              <AiTwotoneHome size="25" />
            ) : (
              <AiOutlineHome size="25" />
            )}
          </NavLink>
          <NavLink to="/placeinfo" className="navLink">
            {location.pathname === "/placeinfo" ? (
              <AiFillInfoCircle size="25" />
            ) : (
              <AiOutlineInfoCircle size="25" />
            )}
          </NavLink>
          <NavLink to="/chatroom" className="navLink">
            {location.pathname === "/chatroom" ? (
              <BsChatFill size="25" />
            ) : (
              <BsChat size="25" />
            )}
          </NavLink>
          <NavLink to="/mypage" className="navLink">
            {location.pathname === "/mypage" ? (
              <AiFillAppstore size="25" />
            ) : (
              <AiOutlineAppstore size="25" />
            )}
          </NavLink>
        </Grid>
        <Grid is_flex navbar margin="0 0 0 15px">
          <Text>홈</Text>
          <Text margin="0 0 0 3px">스키장정보</Text>
          <Text>채팅</Text>
          <Text margin="0 3px 0 0">마이페이지</Text>
        </Grid>
      </FixedNav>
    </React.Fragment>
  );
};

const FixedNav = styled.div`
  /* position: absolute;
  width: 100%;
  bottom: 0;
  left: 0; */
`

export default withRouter(Navbar);
