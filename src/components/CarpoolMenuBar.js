import React from "react";
import "../App.css";
import { NavLink, withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import { Grid } from "../elements/index";

const CarpoolMenuBar = ({ match, location }) => {
  const params = useParams();
  const carpool = location.pathname === `/carpool/${params.skiresort}`;
  const board = location.pathname === `/freeboardlist/${params.skiresort}`;

  return (
    <div>
      <Grid phoneSize width="100%" height="55px" display="flex">
        <Grid light={carpool} is_flex justify="center" width="50%">
          <NavLink to={`/carpool/${params.skiresort}`} className="navLink">
            {location.pathname === `/carpool/${params.skiresort}` ? (
              <Tap light>카풀</Tap>
            ) : (
              <Tap>카풀</Tap>
            )}
          </NavLink>
        </Grid>

        <Grid light={board} is_flex justify="center" width="50%">
          <NavLink
            to={`/freeboardlist/${params.skiresort}`}
            className="navLink"
          >
            {location.pathname === `/freeboardlist/${params.skiresort}` ? (
              <Tap light>게시글</Tap>
            ) : (
              <Tap>게시글</Tap>
            )}
          </NavLink>
        </Grid>
      </Grid>
      <hr />
    </div>
  );
};

const Tap = styled.div`
  color: ${(props) => (props.light ? "#6195CF" : "#474D56")};
  font-weight: ${(props) => (props.light ? "700" : "")};
  font-size: 18px;
  opacity: ${(props) => (props.light ? "" : "0.5")};
`;

export default withRouter(CarpoolMenuBar);
