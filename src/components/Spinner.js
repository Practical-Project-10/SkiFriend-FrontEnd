import React from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = (props) => {
  return (
    <Outter>
      <CircularProgress style={{ color: "#FFF", fontSize: "400px" }} />
    </Outter>
  );
};

const Outter = styled.div`
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Spinner;
