import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Header = ({ location }) => {
  if (
    location.pathname === "/login" ||
    location.pathname === "/phoneauth" ||
    location.pathname === "/signup" ||
    location.pathname === "/chatlist" ||
    location.pathname.includes("/chatroom") ||
    location.pathname.includes("/freeboardlist") ||
    location.pathname.includes("/freeboardwrite") ||
    location.pathname.includes("/freeboarddetail")
  ) {
    return null;
  }

  return (
    <React.Fragment>
      <Head>스키프렌드</Head>
    </React.Fragment>
  );
};

const Head = styled.div`
  width: 100%;
  height: 54px;
  background-color: #fff;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  line-height: 50px;
  border: 1px solid #000;
  position: absolute;
`;

export default withRouter(Header);
