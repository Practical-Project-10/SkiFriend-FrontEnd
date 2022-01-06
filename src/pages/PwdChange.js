import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { profileActions } from "../redux/modules/profile";

import { Grid, Input, Button, Text } from "../elements";

import Header from "../components/Header";

import { pwdRegExp } from "../shared/validation";

const PwdChange = (props) => {
  const dispatch = useDispatch();
  const [checkPwd, setCheckPwd] = useState(null);
  const [checkRePwd, setCheckRePwd] = useState(null);
  const [form, setForm] = useState({
    pwd: "",
    newPwd: "",
    reNewPwd: "",
  });
  const { pwd, newPwd, reNewPwd } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    if (name === "newPwd") {
      if (!pwdRegExp.test(newPwd)) {
        setCheckPwd(
          <Text color="red" margin="-20px 5px">
            올바른 형식의 비밀번호가 아닙니다.
          </Text>
        );
        return null;
      } else {
        setCheckPwd(
          <Text color="green" margin="-20px 5px">
            사용가능한 비밀번호입니다.
          </Text>
        );
      }
    }

    if (name === "reNewPwd") {
      if (newPwd !== reNewPwd) {
        setCheckRePwd(
          <Text color="red" margin="-20px 5px">
            비밀번호가 일치하지 않습니다.
          </Text>
        );
        return null;
      } else {
        setCheckRePwd(
          <Text color="green" margin="-20px 5px">
            비밀번호가 일치합니다.
          </Text>
        );
      }
    }
  };

  const changePwd = () => {
    if (checkPwd && checkRePwd) {
      const ask = window.confirm("정말 비밀번호를 변경하시겠습니까?");
      if (ask) {
        dispatch(profileActions.changePwdDB(pwd, newPwd));
      }
    }
  };

  return (
    <Grid>
      <Header goBack>비밀번호 변경</Header>
      <Grid
        phoneSize
        margin="0 0 70px 0"
        minHeight="calc( 100vh - 124px )"
        display="flex"
        direction="column"
        justify="space-between"
      >
        <Grid margin="139px 0 0" display="flex" direction="column" gap="40px">
          <Grid>
            <Input
              signup
              type="password"
              label="기존 비밀번호"
              placeholder="기존 비밀번호"
              _name="pwd"
              _onChange={handleChange}
            />
          </Grid>

          <Grid>
            <Input
              signup
              type="password"
              label="새 비밀번호"
              placeholder="새 비밀번호 (영소문자, 숫자를 포함한 5자리 이상)"
              _name="newPwd"
              _onChange={handleChange}
              _onBlur={handleBlur}
            />
          </Grid>
          {checkPwd}
          <Grid>
            <Input
              signup
              type="password"
              label="새 비밀번호 확인"
              placeholder="새 비밀번호 확인 (영소문자, 숫자를 포함한 5자리 이상)"
              _name="reNewPwd"
              _onChange={handleChange}
              _onBlur={handleBlur}
            />
          </Grid>
          {checkRePwd}
        </Grid>
        <Grid padding="0 0 16px">
          <Button _onClick={changePwd}>변경하기</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PwdChange;
