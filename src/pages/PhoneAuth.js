import React from 'react';

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/modules/user';

import { phoneNumExp } from '../shared/validation';

const PhoneAuth = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.user);
  // const isSms = useSelector(state => state.user.is_sms);
  console.log(userInfo);
  const phoneNumInput = React.useRef('');
  const smsNumInput = React.useRef('');

  const numSend = () => {
    const phoneNum = phoneNumInput.current.value;

    if(!phoneNumExp.test(phoneNum)) {
      console.log('실패');
      return null;
    } else {
      console.log('성공');
      dispatch(userActions.isPhoneNumDB(phoneNum))
    }
  }

  const nextStep = () => {
    const smsNum = smsNumInput.current.value;

    if(smsNum === "") {
      console.log('인증번호를 입력해주세요');
      return null;
    } else {
      console.log('성공')
      dispatch(userActions.isSmsCheckDB(userInfo.phoneNum, smsNum));
    }
  }

  return(
    <React.Fragment>
      <input type='text' ref={phoneNumInput}/>
      <button onClick={numSend}>인증번호 전송</button>
      <input type='text' ref={smsNumInput}/>
      <button onClick={nextStep}>다음</button>
    </React.Fragment>
  );
};



export default PhoneAuth;