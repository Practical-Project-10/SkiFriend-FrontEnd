import React, {useState} from "react";

import {Grid, Text, Input, Button} from '../elements/SignupOneCSS';

import { idRegExp, pwdRegExp } from "../shared/validation";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";

const SignupOne = (props) => {
  const dispatch = useDispatch();
  const joinState = useSelector(state => state.user);
  console.log(joinState);

  // 유효성검사 상태
  const [checkId, setCheckId] = useState(true);
  const [checkPwd, setCheckPwd] = useState(true);
  const [checkRePwd, setCheckRePwd] = useState(true);
  const [inputs, setInputs] = useState({
    id: '',
    nickname: '',
    pwd: '',
    rePwd: '',
  });

  const {id, nickname, pwd, rePwd} = inputs;

  const handleChange = e => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const handleBlur = (e) => {
    const {name} = e.target;

    console.log(name)
    if(name === 'id') {
      if (!idRegExp.test(id)) {
        console.log('실패');
        setCheckId(false);
        return null;
      } else {
        console.log(inputs)
        console.log('성공');
        dispatch(userActions.isIdDB(id))
        setCheckId(true);
      }
    }

    if(name === 'nickname') {
      console.log(nickname)
      console.log('성공');
      dispatch(userActions.isNicknameDB(nickname));
    }
    
    if(name === 'pwd') {
      if(!pwdRegExp.test(pwd)) {
        console.log(inputs);
        console.log('실패');
        setCheckPwd(false);
        return null;
      } else {
        console.log('성공');
        setCheckPwd(true);
      }
    }
    
    if(name === 'rePwd') {
      if(pwd !== rePwd) {
        console.log('실패');
        setCheckRePwd(false);
      } else {
        console.log('성공');
        setCheckRePwd(true);
      }
    }
    
  }

  const join = () => {
    const userInfo = {
      id: id,
      password: pwd,
      nickname: nickname,
    }

    dispatch(userActions.imsy(userInfo))
    // if(joinState.is_id && joinState.is_nickname) {
      
    // }
  }
 

  return (
    <React.Fragment>
        <Grid>
          <Grid className='title'>
            <Text className='pageTitle'>회원가입</Text>
          </Grid>
          <Grid className='signupBox'>
            <Grid className='dup'>
              <Input _name='id' _onBlur={handleBlur} _onChange={handleChange} label='로그인' type='text'/>
              <Button className='dupButton'>중복확인</Button>
            </Grid>
            <Grid className='dup'>
              <Input _name='nickname' _onBlur={handleBlur} _onChange={handleChange} label='닉네임' type='text'/>
              <Button className='dupButton'>중복확인</Button>
            </Grid>
            <Input _name='pwd' _onBlur={handleBlur} _onChange={handleChange} label='비밀번호' type='password'/>
            <Input _name='rePwd' _onBlur={handleBlur} _onChange={handleChange} label='비밀번호 확인' type='password'/>
          </Grid>
          <Grid className='buttonGroup'>
            <Button _onClick={join}>가입</Button>
          </Grid>
        </Grid>
    </React.Fragment>
  )
};

export default SignupOne;