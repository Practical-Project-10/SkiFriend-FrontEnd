import React, { useState } from "react";

import { Grid, Text, Input, Button } from "../elements/index";

import { idRegExp, pwdRegExp } from "../shared/validation";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";

const SignupOne = (props) => {
  const dispatch = useDispatch();
  const is_id = useSelector(state => state.user.is_id);
  const is_nickname = useSelector(state => state.user.is_nickname);
  console.log(is_id, is_nickname);

  // 유효성검사 상태
  const [checkId, setCheckId] = useState(true);
  const [checkPwd, setCheckPwd] = useState(true);
  const [checkRePwd, setCheckRePwd] = useState(true);
  const [inputs, setInputs] = useState({
    id: "",
    nickname: "",
    pwd: "",
    rePwd: "",
  });

  const { id, nickname, pwd, rePwd } = inputs;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    if (name === "id") {
      if (!idRegExp.test(id)) {
        console.log("실패");
        setCheckId(false);
        return null;
      } else {
        setCheckId(true);
      };
    };

    // if (name === "nickname") {
    //   console.log("성공");
    //   dispatch(userActions.isNicknameDB(nickname));
    // };

    if (name === "pwd") {
      if (!pwdRegExp.test(pwd)) {
        console.log("실패");
        setCheckPwd(false);
        return null;
      } else {
        console.log("성공");
        setCheckPwd(true);
      };
    };

    if (name === "rePwd") {
      if (pwd !== rePwd) {
        console.log("실패");
        setCheckRePwd(false);
        return null;
      } else {
        console.log("성공");
        setCheckRePwd(true);
      };
    };
  };

  const handleClick = (e) => {
    const {name} = e.target;
    
    if(name === 'id') {
      if(checkId && id !== '') {
        console.log("성공");
        dispatch(userActions.isIdDB(id));
      } else {
        window.alert('올바른 아이디를 입력해주세요.')
      }
    }

    if (name === "nickname") {
      if(nickname !== '') {
        console.log("성공");
        console.log(nickname)
        dispatch(userActions.isNicknameDB(nickname));
      } else {
        window.alert('닉네임을 입력해주세요.')
      }
    };
  }

  const join = () => {
    const userInfo = {
      id: id,
      password: pwd,
      nickname: nickname,
    };

    if(checkId && checkPwd && checkRePwd) {
      dispatch(userActions.signupDB(userInfo));
    };
  };

  return (
    <Grid phoneSize>
        <Grid margin='132px 0 145px'>
          <Input more4 dupButton buttonText='중복확인' _name='id' label='로그인' type='text' placeholder='영소문자, 숫자를 포함한 5자리 이상' _onBlur={handleBlur} _onChange={handleChange} _onClick={handleClick}/>
          {!checkId &&
            <Text color='red'>올바른 형식의 아이디가 아닙니다.</Text>
          }
          
          <Input more4 dupButton buttonText='중복확인'  _name='nickname' label='닉네임' type='text' placeholder='1자리 이상' _onBlur={handleBlur} _onChange={handleChange} _onClick={handleClick}/>
          
          <Input more4 _name='pwd' _onBlur={handleBlur} _onChange={handleChange} label='비밀번호' type='password'/>
          {!checkPwd &&
            <Text color='red'>올바른 형식의 비밀번호가 아닙니다.</Text>
          }

          <Input more4 _name='rePwd' _onBlur={handleBlur} _onChange={handleChange} label='비밀번호 확인' type='password'/>
            {!checkRePwd &&
              <Text color='red'>비밀번호가 일치하지 않습니다.</Text>
            }
        </Grid>
          
        <Grid>
          <Button _onClick={join}>가입</Button>
        </Grid>
    </Grid>
  );
};

export default SignupOne;
