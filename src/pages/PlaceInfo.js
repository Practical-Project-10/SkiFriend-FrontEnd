import React from "react";
import { Grid, Button } from "../elements/index";

const PlaceInfo = () => {
  return (
    <React.Fragment>
      <Grid header>스키장정보</Grid>
      <Grid align="center">
        <Button placeBtn>하이윈</Button>
        <Button placeBtn>용평</Button>
        <Button placeBtn>비발디</Button>
        <Button placeBtn>휘닉스</Button>
        <Button placeBtn>윌리휠리</Button>
        <Button placeBtn>곤지암</Button>
      </Grid>
    </React.Fragment>
  );
};
export default PlaceInfo;
