import React from 'react';

import styled from 'styled-components';
import { Grid, Text } from '../elements';

const HotPost = (props) => {


  return(
    <Grid padding='20px 0'>
      <ResortName>하이원</ResortName>
      <Text>sdfsfsdfsdfdfds</Text>
    </Grid>
  )
}

const ResortName = styled.div`
  width: 52px;
  height: 21px;
  background: #6195CF;
  border-radius: 140px;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #FFF;
  text-align: center;
  vertical-align: middle;
`

export default HotPost;