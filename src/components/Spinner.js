import React from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = (props) => {
  return (
    <Outter>
      영상 업로드 중
      <CircularProgress style={{ color: "orange", fontSize: "300px" }} />
    </Outter>
  );
};

const Outter = styled.div`
  background: #fff;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Spinner;
