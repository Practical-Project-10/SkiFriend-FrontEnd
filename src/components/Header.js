import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Header = ({ location }) => {
  if (
    location.pathname === "/login" ||
    location.pathname === "/phoneauth" ||
    location.pathname === "/signup" ||
    location.pathname.includes("/chatroom") ||
    location.pathname.includes("/freeboardlist") ||
    location.pathname === "/chatlist"
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
  padding: 13px 16px;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  border: 1px solid #000;
`;

export default withRouter(Header);
