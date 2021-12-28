import React from "react";
import { Grid, Button } from "../elements/index";

const FloatButton = (props) => {
  const {
    _onClick,
  } = props;

  return (
    <React.Fragment>
      <Grid align="end">
        <Button floatBtn _onClick={_onClick}>+</Button>
      </Grid>
    </React.Fragment>
  );
};



export default FloatButton;
