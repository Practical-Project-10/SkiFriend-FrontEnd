import React from 'react';

import {Grid, Text, Image} from '../elements/ChatListCSS'

const ChatList = (props) => {


  return(
    <React.Fragment>
      <Grid>
        <Grid align='center'>
          <h4>채팅목록</h4>
        </Grid>

        <Grid className='chatBox'>
          <Grid className='chatEl'>
            <Image/>
            <Grid >
              <Text className='chatName'>운전자</Text>
              <Text className='chatContent'>아자아자</Text>
            </Grid>
          </Grid>
          <Grid className='chatTime'>
            <Text>14:24</Text>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ChatList;