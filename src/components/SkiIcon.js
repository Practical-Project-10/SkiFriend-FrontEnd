import React from "react";

import styled from 'styled-components'
import { Grid } from "../elements";

const SkiIcon = (props) => {
  const {border, src} = props;
  const style = {border, src};
  
  return(
    <Grid>
      <Circle {...style}></Circle>
    </Grid>
  )
}

const Circle = styled.div`
  width: 76px;
  height: 76px;
  border: ${props => props.border};
  border-radius: 999px;
  background: ${props => props.src? `url(${props.src}) no-repeat center`: ''};
  background-size: 60px 25px;
  background-color: #fff;
`

export default SkiIcon;