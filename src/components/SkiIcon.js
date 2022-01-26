import React from "react";

import {history} from "../redux/ConfigStore"

import styled from 'styled-components'
import { Grid, Text } from "../elements";

const SkiIcon = (props) => {
  const {border, src} = props;
  const style = {border, src};
  
  return(
    <Grid
      // width="calc((100% - 100px) / 3)"
      // cursor="pointer"
      // hoverOpacity="0.8"
      // _onClick={() => history.push(`/carpool/${props.name}`)}
      // align="center"
    >
      <Circle {...style}></Circle>
      {/* <Text>{props.resort}</Text> */}
    </Grid>
  )
}

const Circle = styled.div`
  width: 76px;
  height: 76px;
  margin-bottom: 6px;
  border: ${props => props.border};
  border-radius: 999px;
  background: ${props => props.src? `url(${props.src}) no-repeat center`: ''};
  background-color: #fff;
`

export default SkiIcon;