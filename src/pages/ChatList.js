import React from "react";

import { Grid, Image, Text } from "../elements/index";

const ChatList = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid align="center">
          <h4>채팅목록</h4>
        </Grid>

        <Grid is_flex justify="space-between" padding="10px">
          <Grid is_flex>
            <Image width="40px" height="40px" radius="50%" />
            <Grid>
              <Text size="12px" padding="2px 0" margin="0">
                운전자
              </Text>
              <Text size="12px" padding="2px 0" margin="0" color="#999">
                아자아자
              </Text>
            </Grid>
          </Grid>
          <Grid height="42px">
            <Text>14:24</Text>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ChatList;
