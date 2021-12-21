import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Grid, Text } from "../elements/SharedCSS/index";

const CarpoolMenuBar = ({ location }) => {
  return (
    <Grid is_flex navbar>
      <NavLink to="/">
        {location.pathname === "/" ? (
          <Text boardlink>카풀</Text>
        ) : (
          <Text>카풀</Text>
        )}
      </NavLink>
      <NavLink to="/2">
        {location.pathname === "/2" ? (
          <Text boardlink>게시글</Text>
        ) : (
          <Text>게시글</Text>
        )}
      </NavLink>
    </Grid>
  );
};

export default withRouter(CarpoolMenuBar);
