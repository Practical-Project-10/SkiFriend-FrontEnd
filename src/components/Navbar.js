import React from "react";

import { NavLink, withRouter } from "react-router-dom";

import styled from "styled-components";
import { Grid, Text, Image } from "../elements/index";

import home from "../assets/navBar/nav_home_icon.png"
import info from "../assets/navBar/nav_info_icon.png"
import chat from "../assets/navBar/nav_chat_icon.png"
import mypage from "../assets/navBar/nav_mypage_icon.png"

import { AiTwotoneHome, AiOutlineHome } from "react-icons/ai";
import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { BsChatFill, BsChat } from "react-icons/bs";
import { AiFillAppstore, AiOutlineAppstore } from "react-icons/ai";

const Navbar = ({ location }) => {
  if (
    location.pathname === "/login" ||
    location.pathname === "/phoneauth" ||
    location.pathname === "/signup" ||
    location.pathname.includes("/chatroom") ||
    location.pathname.includes("/freeboardwrite") ||
    location.pathname.includes("/freeboarddetail")
  ) {
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
          <NavLink to="/chatlist" className="navLink">
            {location.pathname === "/chatlist" ? (
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
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #000;
  width: 100%;
  height: 70px;
  background: #FFF;
`;

export default withRouter(Navbar);
