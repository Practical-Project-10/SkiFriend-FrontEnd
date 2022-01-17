import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, withRouter } from "react-router-dom";

import styled from "styled-components";
//react icons
import { AiTwotoneHome, AiOutlineHome } from "react-icons/ai";
import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { BsChatFill, BsChat } from "react-icons/bs";
import { AiFillAppstore, AiOutlineAppstore } from "react-icons/ai";

const Navbar = ({ location }) => {
  const dispatch = useDispatch();
  const alarm = useSelector((state) => state.chat.alarm);
  const [newRing, setNewRings] = useState(false);

  useEffect(() => {
    if (alarm.length !== 0) {
      setNewRings(true);
    }
  }, []);

  if (
    location.pathname === "/login" ||
    location.pathname === "/phoneauth" ||
    location.pathname === "/signup" ||
    location.pathname.includes("/chatroom") ||
    location.pathname.includes("/freeboardwrite") ||
    location.pathname.includes("/freeboarddetail") ||
    location.pathname.includes("/carpoolwrite") ||
    location.pathname.includes("/freeboardedit") ||
    location.pathname.includes("/profilewrite")
  ) {
    return null;
  }

  return (
    <React.Fragment>
      <FixedNav>
        <Menu>
          <Icon>
            <NavLink to="/" className="navLink">
              {location.pathname === "/" ? (
                <AiTwotoneHome size="30" />
              ) : (
                <AiOutlineHome size="30" />
              )}
            </NavLink>
          </Icon>
          <Icon>
            <NavLink to="/placeinfo" className="navLink">
              {location.pathname === "/placeinfo" ? (
                <AiFillInfoCircle size="30" />
              ) : (
                <AiOutlineInfoCircle size="30" />
              )}
            </NavLink>
          </Icon>
          <Icon>
            <NavLink to="/chatlist" className="navLink">
              {location.pathname === "/chatlist" ? (
                <BsChatFill size="30" />
              ) : (
                <BsChat size="30" />
              )}
            </NavLink>
          </Icon>
          <Icon>
            <NavLink to="/mypage" className="navLink">
              {location.pathname === "/mypage" ? (
                <AiFillAppstore size="30" />
              ) : (
                <AiOutlineAppstore size="30" />
              )}
            </NavLink>
          </Icon>
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
  background: #fff;
`;

const Menu = styled.div`
  padding: 17px 28px;
  display: flex;
  align-items: center;
  gap: 79px;
`;

const Icon = styled.div`
  width: calc((100% - 237px) / 4);
`;

export default withRouter(Navbar);
