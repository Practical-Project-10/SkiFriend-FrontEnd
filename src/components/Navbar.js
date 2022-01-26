import React, { useEffect, useState } from "react";

import { NavLink, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { chatCreators } from "../redux/modules/chat";
import { shortsActions } from "../redux/modules/shorts";

import styled from "styled-components";
import { Grid } from "../elements";

import shorts from "../assets/nav/shorts.svg";
import shorts_active from "../assets/nav/shorts_active.svg";
import home from "../assets/nav/home.svg";
import home_active from "../assets/nav/home_active.svg";
import info from "../assets/nav/info.svg";
import info_active from "../assets/nav/info_active.svg";
import chat from "../assets/nav/chat.svg";
import chat_active from "../assets/nav/chat_active.svg";
import myPage from "../assets/nav/mypage.svg";
import myPage_active from "../assets/nav/mypage_active.svg";

const Navbar = ({ location }) => {
  const dispatch = useDispatch();
  const alarm = useSelector((state) => state.chat.alarm);
  const [newRing, setNewRings] = useState(false);

  useEffect(() => {
    if (alarm.length !== 0) {
      setNewRings(true);
    }
  }, [alarm]);

  if (
    location.pathname === "/login" ||
    location.pathname === "/phoneauth" ||
    location.pathname === "/user/kakao/callback" ||
    location.pathname.includes("/chatroom") ||
    location.pathname.includes("/freeboardwrite") ||
    location.pathname.includes("/freeboarddetail") ||
    location.pathname.includes("/carpoolwrite") ||
    location.pathname.includes("/freeboardedit") ||
    location.pathname.includes("/profilewrite") ||
    location.pathname.includes("/shortsupload") ||
    location.pathname.includes("/carpoolfilter")
  ) {
    return null;
  }

  const deleteAlarm = () => {
    dispatch(chatCreators.deleteAlarm());
    setNewRings(false);
  };

  return (
    <FixedNav>
      <Icon>
        <NavLink to="/" className="navLink">
          <img src={location.pathname === "/" ? home_active : home} alt="홈" />
        </NavLink>
      </Icon>
      <Icon>
        <NavLink to="/placeinfo" className="navLink">
          <img
            src={location.pathname === "/placeinfo" ? info_active : info}
            alt="스키장 안내"
          />
        </NavLink>
      </Icon>
      <Icon onClick={() => dispatch(shortsActions.getShortsDB())}>
        <NavLink to="" className="navLink">
          <img
            src={location.pathname.includes("/shorts") ? shorts_active : shorts}
            alt="동영상"
          />
        </NavLink>
      </Icon>
      <Icon>
        <NavLink to="/chatlist" className="navLink">
          <Grid _onClick={deleteAlarm}>
            {newRing && <New>New</New>}
            <img
              src={location.pathname === "/chatlist" ? chat_active : chat}
              alt="채팅"
            />
          </Grid>
        </NavLink>
      </Icon>
      <Icon>
        <NavLink to="/mypage" className="navLink">
          <img
            src={location.pathname === "/mypage" ? myPage_active : myPage}
            alt="마이페이지"
          />
        </NavLink>
      </Icon>
    </FixedNav>
  );
};

const FixedNav = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  padding: 25px 28px;
  border-top: 2px solid #edeeef;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 65px;
  z-index: 9;
`;

const Icon = styled.div`
  position: relative;
  width: calc((100% - 268px) / 5);
`;

const New = styled.div`
  height: 17px;
  padding: 2px;
  border-radius: 999px;
  background: red;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  line-height: 13px;
  position: absolute;
  right: -13px;
  top: -8px;
`;

export default withRouter(Navbar);
