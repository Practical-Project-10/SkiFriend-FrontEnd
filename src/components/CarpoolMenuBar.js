import React from "react";
import "../App.css";
import { NavLink, withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";

import styled from 'styled-components';
import { Grid } from "../elements/index";

const CarpoolMenuBar = ({ match, location }) => {
  const params = useParams();

  const carpool = location.pathname === `/carpool/${params.skiresort}`
  const board = location.pathname === `/freeboardlist/${params.skiresort}`
  // const [carpoolTab, setCarpoolTab] = React.useState(false);
  // const [boardTab, setBoardTab] = React.useState(false);

  // const carpoolTo = () => {
  //   if(carpool) {
  //     setCarpoolTab(true);
  //   }
  // }

  // const BoardTo = () => {
  //   if(board) {
  //     setBoardTab(true);
  //   }
  // }

  return (
    <div>
      <Grid phoneSize width='100%' height='55px' display='flex'>

        <Grid light={carpool} is_flex justify='center' width='50%'>
          <NavLink to={`/carpool/${params.skiresort}`} className="navLink">
            {/* <Tap onClick={carpoolTo}>카풀</Tap> */}
            {location.pathname === `/carpool/${params.skiresort}` ? (
              <Tap light>카풀</Tap>
            ) : (
              <Tap>카풀</Tap>
            )}
          </NavLink>
        </Grid>

        <Grid light={board} is_flex justify='center' width='50%'>
          <NavLink to={`/freeboardlist/${params.skiresort}`} className="navLink">
            {/* <Tap onClick={BoardTo} light={boardTab}>게시글</Tap> */}
            {location.pathname === `/freeboardlist/${params.skiresort}` ? (
              <Tap light>게시글</Tap>
            ) : (
              <Tap>게시글</Tap>
            )}
          </NavLink>
        </Grid>
      </Grid>
      <hr/>
    </div>
  );
};

const Tap = styled.div`
  color: ${props => props.light? '#6195CF': '#474D56'};
  font-weight: ${props => props.light? '700': ''};
  font-size: 18px;
  opacity: ${props => props.light? '': '0.5'};
`

// const MenuBar = styled.div`
//   width: 50%
//   display: flex;
//   justify-content: center;
//   align-items: center
//   border-bottom: ${props => props.light? '3px solid #6195CF': ''};
// `

export default withRouter(CarpoolMenuBar);
