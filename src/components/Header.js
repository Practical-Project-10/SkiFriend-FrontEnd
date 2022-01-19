import React from "react";

import { history } from "../redux/ConfigStore";

import styled from "styled-components";
import { Image, Text } from "../elements";
import back from "../assets/back.svg";

const Header = (props) => {
  const {
    complete,
    goBack,
    children,
    _onClick,
    phone,
    fixed,
    push,
    login,
    logout,
    page
  } = props;
  
  const goMain = () => {
    history.goBack();
  }

  if (goBack) {
    return (
      <GoBack>
        <Back>
          {push ? (
            <Image
              src={back}
              _onClick={page === 'hotpost'? goMain: _onClick}
              width="20px"
              height="17px"
              cursor="pointer"
            />
          ) : (
            <Image
              src={back}
              _onClick={() => history.goBack()}
              width="20px"
              height="17px"
              cursor="pointer"
            />
          )}
        </Back>
        <Text bold size="18px" line='54px'>
          {children}
        </Text>
        {/* {complete ? <Button onClick={_onClick}>완료</Button> : null}
        {phone ? <Button onClick={_onClick}>전화번호 공개</Button> : null} */}
      </GoBack>
    );
  }

  return (
    <Head>
      {login ? <Button onClick={_onClick}>로그인</Button> : null}
      {logout ? <Button onClick={_onClick}>로그아웃</Button> : null}
      <Text bold size="22px" line="50px">
        {children}
      </Text>
    </Head>
  );
};

const Head = styled.div`
  width: 100%;
  height: 54px;
  padding: 0 16px;
  box-sizing: border-box;
  position: relative;
  background-color: #d9e3ee;
  position: relative;
`;

const GoBack = styled.div`
  width: 100%;
  height: 54px;
  padding: 0 16px;
  background-color: #d9e3ee;
  text-align: center;
  position: relative;
`;

const Button = styled.div`
  height: 23px;
  padding: 0 7px;
  font-weight: 700;
  padding: 0 7px;
  color: #fff;
  background: #6195cf;
  border-radius: 140px;
  text-align: center;
  line-height: 23px;
  position: absolute;
  top: 17px;
  right: 16px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Back = styled.div`
  height: 17px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
`

export default Header;
