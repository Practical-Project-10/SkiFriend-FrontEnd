import React from "react";
import { Grid, Button } from "../elements/SharedCSS";

const FloatButton = () => {
  return (
    <React.Fragment>
      <Grid align="end">
        <Button floatBtn>+</Button>
      </Grid>
    </React.Fragment>
  );
};
export default FloatButton;
