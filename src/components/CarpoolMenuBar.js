import React from "react";
import "../App.css";
import { NavLink, withRouter } from "react-router-dom";
import { Grid, Text } from "../elements/index";

const CarpoolMenuBar = ({ location }) => {
  return (
    <Grid is_flex menubar>
      <NavLink to="/carpool" className="navLink">
        {location.pathname === "/carpool" ? (
          <Text boardlink>카풀</Text>
        ) : (
          <Text>카풀</Text>
        )}
      </NavLink>
      <NavLink to="/freeboardlist" className="navLink">
        {location.pathname === "/freeboardlist" ? (
          <Text boardlink>게시글</Text>
        ) : (
          <Text>게시글</Text>
        )}
      </NavLink>
    </Grid>
  );
};

export default withRouter(CarpoolMenuBar);
