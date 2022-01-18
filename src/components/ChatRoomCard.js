import React from "react";
import { Grid, Text, Image } from "../elements/index";

//icons
import arrow from "../assets/carpoolList/arrow_icon.svg";
import calendar from "../assets/carpoolList/calendar_icon.svg";
import clock from "../assets/carpoolList/clock_icon.svg";
import person from "../assets/carpoolList/person_icon.svg";
import price from "../assets/carpoolList/price_icon.svg";

const ChatRoomCard = (props) => {
  const { roomInfo } = props;

  return (
    <React.Fragment>
      <Grid
        width="100%"
        height="163px"
        padding="16px"
        margin="0 0 10px"
        bg="#FFF"
        radius="10px"
        display="flex"
        direction="column"
        justify="space-between"
      >
        <Text block size="20px" bold>
          {roomInfo.title}
        </Text>
        <Grid
          is_flex
          border="2px solid #6195CF"
          radius="5px"
          padding="5px"
          justify="center"
        >
          <Text bold>{roomInfo.startLocation}</Text>
          <Image src={arrow} width="20px" height="10px" margin="0 10px" />
          <Text bold color="#6195CF">
            {roomInfo.endLocation}
          </Text>
        </Grid>
        <Grid is_flex justify="space-between">
          <Grid is_flex bg="#6195CF" radius="5px" padding="4px 8px">
            <Image
              src={calendar}
              width="11px"
              height="11px"
              margin="0 5px 0 0"
            />
            <Text size="12px" color="#FFF">
              {roomInfo.date}
            </Text>
          </Grid>
          <Grid is_flex bg="#6195CF" radius="5px" padding="4px 8px">
            <Image src={clock} width="11px" height="11px" margin="0 5px 0 0" />
            <Text size="12px" color="#FFF">
              {roomInfo.time}
            </Text>
          </Grid>
          <Grid is_flex bg="#6195CF" radius="5px" padding="4px 8px">
            <Image src={person} width="11px" height="11px" margin="0 5px 0 0" />
            <Text size="12px" color="#FFF">
              {roomInfo.memberNum}명
            </Text>
          </Grid>
          <Grid is_flex bg="#6195CF" radius="5px" padding="4px 8px">
            <Image src={price} width="11px" height="11px" margin="0 5px 0 0" />
            <Text size="12px" color="#FFF">
              {roomInfo.price}원
            </Text>
          </Grid>
        </Grid>
        <Grid>
          <Text bold>주의사항: {roomInfo.notice}</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default ChatRoomCard;
