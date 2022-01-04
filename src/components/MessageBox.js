import React from "react";
import { Grid, Text, Image } from "../elements/index";

const MessageBox = (props) => {
  const { chatInfo } = props;
  const nickname = localStorage.getItem("nickname");
  console.log(props);

  return (
    <React.Fragment>
      {/* 내가 메세지 보낼때 보이는 위치와 상대방이 나에게 보낼때 위치 */}
      {nickname === chatInfo.sender ? (
        <Grid is_flex justify="end">
          <Text size="10px" margin="0 10px">
            {chatInfo.createdAt}
          </Text>
          <Text>{chatInfo.message}</Text>
        </Grid>
      ) : (
        <Grid justify="left">
          <Image
            width="35px"
            height="35px"
            radius="50%"
            src={chatInfo.img}
          ></Image>
          <Text size="10px">{chatInfo.sender}</Text>
          <Grid is_flex justify="left">
            <Text>{chatInfo.message}</Text>
            <Text size="10px" margin="0 10px">
              {chatInfo.createdAt}
            </Text>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};
export default MessageBox;
