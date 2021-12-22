import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Button, Grid, Text ,Input} from "../elements/CarpoolCSS";

const ChatRoom = () => {
  return (
    <>
    {/* 상단부  */}
      <Grid 
        borderB="1px solid #CACACA"
        is_flex
        padding="10px"
        margin="0 0 20px 0"
      >
        <Text margin="0 auto">채팅</Text>
      </Grid>
      <AiOutlineArrowLeft onClick={() => {}} style={{ cursor: "pointer" }} />

      {/* 채팅이 들어갈 공간 */}
      <Grid width="100%" height="300px">
            {/* 채팅말풍선 */}
        <Grid borderB=" 1px solid #d1d1d1" justify="flex-end">
            <Input ></Input>
        </Grid>
      </Grid>
      {/* 하단부 버튼들 */}
      <Grid>
        <Grid justify="flex-end" width="100%" bg="#414141"borderB="1px solid #fff" padding="5px">
            <Button width="20%">이미지업로드버튼</Button>
        </Grid>
        <Grid justify="flex-end" width="100%" bg="#414141" padding="20px" align="right">
        <Button width="30%" padding="20px">전송</Button>
        </Grid>
      </Grid>
     
    </>
  );
};

export default ChatRoom;