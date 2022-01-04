import React from "react";

import styled from 'styled-components'
import { Grid } from "../elements";

const SkiIcon = ({src}) => {

  
  return(
    <Grid>
      <Circle src={src}></Circle>
    </Grid>
  )
}

const Circle = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 999px;
  background: ${props => `url(${props.src}) no-repeat center`};
  background-size: 60px 25px;
  background-color: #fff;
`

export default SkiIcon;