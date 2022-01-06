import React from "react";

import styled from "styled-components";
import { Grid, Button, Input } from "../elements";

import Header from "../components/Header";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";

import { phoneNumExp } from "../shared/validation";

const PhoneAuth = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  // const isSms = useSelector(state => state.user.is_sms);
  console.log(userInfo);
  const phoneNumInput = React.useRef("");
  const smsNumInput = React.useRef("");

  const numSend = () => {
    const phoneNum = phoneNumInput.current.value;
    console.log(phoneNum);
    if (!phoneNumExp.test(phoneNum)) {
      window.alert("핸드폰 번호를 올바르게 입력해주세요.");
      return null;
    } else {
      console.log("성공");
      dispatch(userActions.isPhoneNumDB(phoneNum));
    }
  };

  const nextStep = () => {
    const smsNum = smsNumInput.current.value;

    if (smsNum === "") {
      window.alert("인증번호를 입력해주세요");
      return null;
    } else {
      console.log("성공");
      dispatch(userActions.isSmsCheckDB(userInfo.phoneNum, smsNum));
    }
  };

  return (
    <Grid>
      <Header>회원가입</Header>
      <Grid
        phoneSize
        minHeight="calc( 100vh - 55px )"
        display="flex"
        direction="column"
        justify="space-between"
      >
        <Grid margin="159px 0 0">
          <Grid margin="0 0 41px">
            <Input
              dupButton
              type="text"
              ref={phoneNumInput}
              _onClick={numSend}
              placeholder="'-'를 제외한 숫자를 입력해 주세요."
              label="휴대폰 번호"
              buttonText="인증번호"
            />
          </Grid>
          <Grid>
            <Input
              type="text"
              ref={smsNumInput}
              _onClick={nextStep}
              label="인증번호"
              buttonText="다음"
            />
          </Grid>
        </Grid>
        <Grid padding="0 0 16px">
          <Button _onClick={nextStep}>다음</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PhoneAuth;
