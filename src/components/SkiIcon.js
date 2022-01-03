import React from "react";

import styled from 'styled-components'
import { Grid } from "../elements";
import high1 from "../assets/skiInfo/high1_logo.png"

const SkiIcon = ({url}) => {

  
  return(
    <Grid>
      <Circle url={url}></Circle>
    </Grid>
  )
}

const Circle = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 999px;
  background: ${props => `url(${props.url}) no-repeat center`};
  background-size: 60px 25px;
  background-color: #fff;
`

export default SkiIcon;