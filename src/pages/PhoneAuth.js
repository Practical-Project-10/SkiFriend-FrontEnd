import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";

import Header from "../components/Header";
import { phoneNumExp } from "../shared/validation";

import { Grid, Button, Input, Image } from "../elements";
import logo from "../assets/login/logo.svg"

const PhoneAuth = (props) => {
  const history = props.history;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const phoneNumInput = React.useRef("");
  const smsNumInput = React.useRef("");

  //사용자 휴대폰번호 전송
  const numSend = () => {
    const phoneNum = phoneNumInput.current.value;
    if (!phoneNumExp.test(phoneNum)) {
      window.alert("핸드폰 번호를 올바르게 입력해주세요.");
      return null;
    } else {
      dispatch(userActions.isPhoneNumDB(phoneNum));
    }
  };

  //회원가입 페이지로 넘어가기 위해 인증번호 확인
  const certification = () => {
    const smsNum = smsNumInput.current.value;

    if (smsNum === "") {
      window.alert("인증번호를 입력해주세요");
      return null;
    } else {
      dispatch(userActions.isSmsCheckDB(userInfo.phoneNum, smsNum));
    }
  };

  return (
    <Grid>
      <Header goBack>휴대폰 인증</Header>
      <Grid
        minHeight="calc( 100vh - 55px )"
        display="flex"
        direction="column"
        justify="space-between"
        padding='160px 16px 16px'
      >
        <Grid display='flex' direction='column' gap='41px'>
          <Grid>
            <Input
              dupButton
              type="tel" //tel로 입력해야한다(모바일 사용위해) 숫자키보드가 나올수 있다.
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
              pattern="[0-9]*"
              inputMode="numeric"
              autocomplete="one-time-code" //autocomplete one-time-code 문자가 오면 클릭했을 시 바로 입력이 된다. (모바일에 편리하다) html5기능
              ref={smsNumInput}
              label="인증번호"
            />
          </Grid>
        </Grid>
        <Grid>
          <Button _onClick={certification}>인증</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PhoneAuth;
