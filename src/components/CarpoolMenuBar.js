import React from "react";
import "../App.css";
import { NavLink, withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Grid, Text } from "../elements/index";

const CarpoolMenuBar = ({ match, location }) => {
  const params = useParams();

  return (
    <Grid is_flex menubar>
      <NavLink to={`/carpool/${params.skiresort}`} className="navLink">
        {location.pathname === `/carpool/${params.skiresort}` ? (
          <Text boardlink>카풀</Text>
        ) : (
          <Text>카풀</Text>
        )}
      </NavLink>
      <NavLink to={`/freeboardlist/${params.skiresort}`} className="navLink">
        {location.pathname === `/freeboardlist/${params.skiresort}` ? (
          <Text boardlink>게시글</Text>
        ) : (
          <Text>게시글</Text>
        )}
      </NavLink>
    </Grid>
  );
};

export default withRouter(CarpoolMenuBar);
