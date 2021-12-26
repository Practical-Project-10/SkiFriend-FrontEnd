import React, { useState } from "react";

import { Grid, Text, Input, Button } from "../elements/index";

import { idRegExp, pwdRegExp, phoneNumExp } from "../shared/validation";

import { useDispatch } from "react-redux";
import { userActions } from "../redux/modules/user";

const SignupOne = (props) => {
  const dispatch = useDispatch();
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

    console.log(name);
    if (name === "id") {
      if (!idRegExp.test(id)) {
        console.log("실패");
        setCheckId(false);
        return null;
      } else {
        console.log("성공");
        dispatch(userActions.isIdDB(id));
        setCheckId(true);
      }
    }

    if (name === "nickname") {
      console.log("성공");
      dispatch(userActions.isNicknameDB(nickname));
    }

    if (name === "pwd") {
      if (!pwdRegExp.test(pwd)) {
        console.log("실패");
        setCheckPwd(false);
        return null;
      } else {
        console.log("성공");
        setCheckPwd(true);
      }
    }

    if (name === "rePwd") {
      if (pwd !== rePwd) {
        console.log("실패");
        setCheckRePwd(false);
      } else {
        console.log("성공");
        setCheckRePwd(true);
      }
    }
  };

  return (
    <React.Fragment>
      <Grid width="70%" margin="auto" align="center">
        <Grid margin="10px 0">
          <Text size="20px" weight="bold">
            회원가입
          </Text>
        </Grid>
        <Grid>
          <Grid>
            <Input
              signup
              _name="id"
              _onBlur={handleBlur}
              _onChange={handleChange}
              label="로그인"
              type="text"
            />
            <Button normalBtn>중복확인</Button>
          </Grid>
          <Grid className="dup">
            <Input
              signup
              _name="nickname"
              _onBlur={handleBlur}
              label="닉네임"
              type="text"
            />
            <Button normalBtn>중복확인</Button>
          </Grid>
          <Input
            signup
            _name="pwd"
            _onBlur={handleBlur}
            label="비밀번호"
            type="password"
          />
          <Input
            signup
            _name="rePwd"
            _onBlur={handleBlur}
            label="비밀번호 확인"
            type="password"
          />
        </Grid>
        <Grid margin="15px 0">
          <Button normalBtn>핸드폰번호 인증</Button>
          <Button normalBtn>다음</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SignupOne;
