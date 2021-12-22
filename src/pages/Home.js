import React from 'react';

import {Grid, Image, Text} from '../elements/HomeCSS'

const Home = (props) => {


  return(
    <React.Fragment>
      <Grid>
        <Grid className='banner'>
          <Image/>
        </Grid>

        <Grid className='notification'>
          <Text size='12px'>카풀과 스키장이 처음이라면? 가이드 읽어보기</Text>
        </Grid>

        <Grid className='skiNav'>
          <Grid className='skiIcon'>
            <div style={{width: '30px', height: '30px', background:'#000'}}></div>
            <Text>하이원</Text>
          </Grid>
          <Grid className='skiIcon'>
            <div style={{width: '30px', height: '30px', background:'#000'}}></div>
            <Text>용평</Text>
          </Grid>
          <Grid className='skiIcon'>
            <div style={{width: '30px', height: '30px', background:'#000'}}></div>
            <Text>비발디</Text>
          </Grid>
          <Grid className='skiIcon'>
            <div style={{width: '30px', height: '30px', background:'#000'}}></div>
            <Text>휘닉스</Text>
          </Grid>
          <Grid className='skiIcon'>
            <div style={{width: '30px', height: '30px', background:'#000'}}></div>
            <Text>웰리힐리</Text>
          </Grid>
          <Grid className='skiIcon'>
            <div style={{width: '30px', height: '30px', background:'#000'}}></div>
            <Text>곤지암</Text>
          </Grid>
        </Grid>

        <Grid>
          <Text size='14px'>&lt;인기게시글&gt;</Text>
          <Grid className='hotBoard'></Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Home