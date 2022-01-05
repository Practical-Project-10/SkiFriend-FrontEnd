import React, {useState} from 'react';

import { useDispatch } from 'react-redux';
import { profileActions } from '../redux/modules/profile';

import { Grid, Input, Button } from '../elements';

import { pwdRegExp } from "../shared/validation";

const PwdChange = (props) => {
  const dispatch = useDispatch();
  const [checkPwd, setCheckPwd] = useState(true);
  const [checkRePwd, setCheckRePwd] = useState(true);
  const [form, setForm] = useState(
    {
      pwd: '',
      newPwd: '',
      reNewPwd: '',
    }
  );
  const {pwd, newPwd, reNewPwd} = form;

  const handleChange = (e) => {
    const {name, value} = e.target;

    setForm(
      {
        ...form,
        [name]: value,
      }
    );
  };
  console.log(form);

  const handleBlur = (e) => {
    const {name} = e.target;
    console.log(name)

    if (name === "newPwd") {
      if (!pwdRegExp.test(newPwd)) {
        console.log("실패");
        setCheckPwd(false);
        return null;
      } else {
        console.log("성공");
        setCheckPwd(true);
      };
    };

    if(name === 'reNewPwd') {
      if(newPwd !== reNewPwd) {
        console.log('실패')
        setCheckRePwd(false);
        return null;
      } else {
        console.log('성공')
        setCheckRePwd(true);
      }
    }
  }
  console.log(checkPwd)

  const changePwd = () => {
    if(checkPwd && checkRePwd) {
      dispatch(profileActions.changePwdDB(pwd, newPwd)) 
    }
  }

  return(
    <Grid phoneSize display='flex' direction='column' gap='40px'>
      <Grid margin='139px 0 230px' display='flex' direction='column' gap='40px'>
        <Grid>
          <Input
            signup
            type='password'
            label='기존 비밀번호'
            placeholder='기존 비밀번호'
            _name='pwd'
            _onChange={handleChange}
          />
        </Grid>
        <Grid>
          <Input
            signup
            type='password'
            label='새 비밀번호'
            placeholder='새 비밀번호'
            _name='newPwd'
            _onChange={handleChange}
            _onBlur={handleBlur}
          />
        </Grid>
        <Grid>
          <Input
            signup
            type='password'
            label='새 비밀번호 확인'
            placeholder='새 비밀번호 확인'
            _name='reNewPwd'
            _onChange={handleChange}
            _onBlur={handleBlur}
          />
        </Grid>
      </Grid>
      <Grid padding='0 0 16px'>
        <Button _onClick={changePwd}>변경하기</Button>
      </Grid>
    </Grid>
  );
};

export default PwdChange;