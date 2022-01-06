import React from "react";

import styled from "styled-components";
import write from "../assets/freeBoard/write_icon.png";

const FloatButton = (props) => {
  const { _onClick } = props;

  return (
    <React.Fragment>
      <Float onClick={_onClick}>
      </Float>
    </React.Fragment>
  );
};

const Float = styled.div`
  position: absolute;
  bottom: 90px;
  right: 16px;
  width: 53px;
  height: 53px;
  border-radius: 50%;
  background: url(${write}) no-repeat center;
  background-color: #474D56;
  background-size: 25px;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default FloatButton;

// import React from "react";

// import styled from "styled-components";
// import { Grid, Button, Image } from "../elements/index";

// import { BiPencil } from "react-icons/bi";

// const FloatButton = (props) => {
//   const { _onClick } = props;

//   return (
//     <React.Fragment>
//       <Grid
//         position="fixed"
//         width="55px"
//         height="55px"
//         radius="50%"
//         bg="#474D56"
//         align="center"
//         color="white"
//         cursor="pointer"
//         hoverOpacity="0.8"
//         padding="5px 0"
//         margin="150px 0 0 350px"
//         _onClick={_onClick}
//       >
//         <BiPencil size="43" />
//       </Grid>
//     </React.Fragment>
//   );
// };

// export default FloatButton;
