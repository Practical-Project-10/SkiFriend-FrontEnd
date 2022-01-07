import React from "react";

import { NavLink, withRouter } from "react-router-dom";

import styled from "styled-components";
import { Grid, Text } from "../elements/index";

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
        <Menu>
          <NavLink to="/" className="navLink">
            {location.pathname === "/" ? (
              <AiTwotoneHome size="30" />
            ) : (
              <AiOutlineHome size="30" />
            )}
          </NavLink>
          <NavLink to="/placeinfo" className="navLink">
            {location.pathname === "/placeinfo" ? (
              <AiFillInfoCircle size="30" />
            ) : (
              <AiOutlineInfoCircle size="30" />
            )}
          </NavLink>
          <NavLink to="/chatlist" className="navLink">
            {location.pathname === "/chatlist" ? (
              <BsChatFill size="30" />
            ) : (
              <BsChat size="30" />
            )}
          </NavLink>
          <NavLink to="/mypage" className="navLink">
            {location.pathname === "/mypage" ? (
              <AiFillAppstore size="30" />
            ) : (
              <AiOutlineAppstore size="30" />
            )}
          </NavLink>
        </Menu>
      </FixedNav>
    </React.Fragment>
  );
};

const FixedNav = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 2px solid #edeeef;
  width: 100%;
  height: 70px;
  background: #FFF;
`;

const Menu = styled.div`
  padding: 22px 28px;
  display: flex;
  align-items: center;
  gap: 79px;

`

export default withRouter(Navbar);
