import React from "react";

import {history} from "../redux/ConfigStore"

import styled from "styled-components";

import { Grid, Image, Text } from "../elements";
import back from "../assets/carpoolWrite/back.svg";

const Header = (props) => {
  const {complete, goBack, children, _onClick, center} = props;

  if(goBack) {
    return(
      <GoBack >
        <Image src={back} _onClick={() => history.goBack()} width='20px' height='17px'/>
        <Text bold block width='140px' margin='0 0 0 100px' size='18px'>{children}</Text>
        {complete
        ? <Button onClick={_onClick}>완료</Button>
        : null
        }
      </GoBack>
    )
  }

  return (
    <Head>
      <Text bold size='22px' line='50px'>{children}</Text>
    </Head>
  );
};

const Head = styled.div`
  width: 100%;
  height: 54px;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: #D9E3EE;
`;

const GoBack = styled.div`
  width: 100%;
  height: 54px;
  padding: 0 16px;
  background-color: #D9E3EE;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
`

const Button = styled.div`
  width: 50px;
  height: 23px;
  color: #FFF;
  background: #6195CF;
  border-radius: 140px;
  text-align: center;
  line-height: 23px;
  position: absolute;
  top: 17px;
  right: 16px;
`

export default Header;
