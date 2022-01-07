import React, { useState } from "react";

import { Grid, Text, Input, Button } from "../elements/index";

import Header from "../components/Header";

import { idRegExp, pwdRegExp } from "../shared/validation";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";

const SignupOne = (props) => {
  const dispatch = useDispatch();

  // 유효성검사 상태
  const [checkId, setCheckId] = useState(true);
  const [checkNick, setCheckNick] = useState(true);
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
        setCheckId(false);
      } else {
        setCheckId(true);
      }
    }

    if (name === "nickname") {
      if (nickname.length <= 7) {
        setCheckNick(true);
      } else {
        setCheckNick(false);
      }
    }

    if (name === "pwd") {
      if (!pwdRegExp.test(pwd)) {
        setCheckPwd(false);
      } else {
        setCheckPwd(true);
      }
    }

    if (name === "rePwd") {
      if (pwd !== rePwd) {
        setCheckRePwd(false);
      } else {
        setCheckRePwd(true);
      }
    }
  };

  const handleClick = (e) => {
    const { name } = e.target;

    if (name === "id") {
      if (checkId && id !== "") {
        dispatch(userActions.isIdDB(id));
      } else {
        window.alert("올바른 아이디를 입력해주세요.");
      }
    }

    if (name === "nickname") {
      if (checkNick && nickname !== "") {
        dispatch(userActions.isNicknameDB(nickname));
      } else {
        window.alert("올바른 닉네임을 입력해주세요.");
      }
    }
  };

  const join = () => {
    const userInfo = {
      id: id,
      password: pwd,
      nickname: nickname,
    };

    if (checkId && checkNick && checkPwd && checkRePwd) {
      dispatch(userActions.signupDB(userInfo));
    }
  };

  return (
    <Grid>
      <Header goBack>회원가입</Header>
      <Grid
        phoneSize
        minHeight="calc( 100vh - 55px )"
        display="flex"
        direction="column"
        justify="space-between"
      >
        <Grid
          margin="132px 0 195px"
          display="flex"
          direction="column"
          gap="33px"
        >
          <Input
            more4
            dupButton
            buttonText="중복확인"
            _name="id"
            label="아이디"
            type="text"
            placeholder="영소문자, 숫자를 포함한 5자리 이상"
            _onBlur={handleBlur}
            _onChange={handleChange}
            _onClick={handleClick}
          />
          {!checkId && (
            <Text color="red" margin="-20px 5px">
              올바른 형식의 아이디가 아닙니다.
            </Text>
          )}

          <Input
            more4
            dupButton
            buttonText="중복확인"
            _name="nickname"
            label="닉네임"
            type="text"
            placeholder="1자리 이상 7자리 이하"
            _onBlur={handleBlur}
            _onChange={handleChange}
            _onClick={handleClick}
          />
          {!checkNick && (
            <Text color="red" margin="-20px 5px">
              올바른 형식의 닉네임이 아닙니다.
            </Text>
          )}

          <Input
            more4
            _name="pwd"
            _onBlur={handleBlur}
            _onChange={handleChange}
            label="비밀번호"
            type="password"
            placeholder="영대소문자와 특수문자를 포함한 8자리 이상"
          />
          {!checkPwd &&
            <Text color="red" margin="-20px 5px">
              올바른 형식의 비밀번호가 아닙니다.
            </Text>
          }

          <Input
            more4
            _name="rePwd"
            _onBlur={handleBlur}
            _onChange={handleChange}
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
          />
          {!checkRePwd &&
            <Text color="red" margin="-20px 5px">
              비밀번호가 일치하지 않습니다.
            </Text>
          }
        </Grid>

        <Grid padding="0 0 16px">
          <Button _onClick={join}>가입</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignupOne;
