import {createAction, handleActions} from 'redux-actions'
import {produce} from 'immer'

import { apis } from '../../shared/apis';

//action
const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';
const EDIT_USER = 'EDIT_USER';
const ID_CHECK = 'ID_CHECK';
const NICKNAME_CHECK = 'NICKNAME_CHEKCK';
const PHONENUM_CHECK = 'PHONENUM_CHECK';
const SMS_CHECK = 'SMS_CHECK';

//action creators
const setUser = (SET_USER, user => ({user}));
const logout = (LOGOUT, () => ({}));
const editUserInfo = (EDIT_USER, (userInfo) => ({userInfo}));
const idCheck = (ID_CHECK => (state) => ({state}));
const nicknameCheck = (NICKNAME_CHECK => (state) => ({state}));
const phoneNumCheck = (PHONENUM_CHECK, (num) => ({num}));
const smsCheck = (SMS_CHECK, (state) => ({state}));

//[회원가입, 회원탈퇴, 비밀번호수정, 문자인증]은 서버에서 처리 리덕스에서 할거 없음

//middlewares
const signup1DB = (userInfo) => {
  return async (dispatch, getState, {history}) => {
    const _userInfo = {
      username: userInfo.username,
      nickname: userInfo.nickname,
      password: userInfo.password,
      phoneNum: userInfo.phoneNum,
    };

    const userData = {
      username: userInfo.username,
      nickname: userInfo.nickname,
      password: userInfo.password,
      phoneNum: userInfo.phoneNum,
      profileImg: userInfo.profileImg,
      vacImg: userInfo.vacImg, 
      gender: userInfo.gender,
      ageRange: userInfo.ageRange,
      career: userInfo.career,
      selfIntro: userInfo.selfIntro,
    }

    try {
      const response = await apis.signup(userData);

      
      response && window.alert('회원가입이 완료되었습니다.');
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };
};

const signup2DB = (userInfo) => {
  return async (dispatch, getState, {history}) => {
    

    const userData = {
      username: userInfo.username,
      nickname: userInfo.nickname,
      password: userInfo.password,
      phoneNum: userInfo.phoneNum,
      profileImg: userInfo.profileImg,
      vacImg: userInfo.vacImg, 
      gender: userInfo.gender,
      ageRange: userInfo.ageRange,
      career: userInfo.career,
      selfIntro: userInfo.selfIntro,
    }

    try {
      const response = await apis.signup(userData);

      
      response && window.alert('회원가입이 완료되었습니다.');
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };
};

const isIdDB = (id) => {
  return async (dispatch) => {
    console.log(id)
    try{
      await apis.idCheck(id);

      window.alert('사용 가능한 아이디 입니다.')
      dispatch(idCheck(true));
    } catch(err) {
      window.alert('이미 사용중인 아이디 입니다.')
      console.log(err);
    }
  };  
};

const isNicknameDB = (nickname) => {
  return async (dispatch,) => {
    console.log(nickname)
    try{
      await apis.nicknameCheck(nickname);

      window.alert('사용 가능한 닉네임 입니다.')
      dispatch(nicknameCheck(true));
    } catch(err) {
      window.alert('이미 사용중인 닉네임 입니다.')
      console.log(err);
    }
  };  
};

const isPhoneNumCheckDB = (phoneNum) => {
  return async (dispatch, getState, {history}) => {
    try {
      await apis.phoneNumCheck(phoneNum);
    } catch(err) {
      console.log(err);
    }
  };
};

const isSmsCheckDB = (phoneNum, randomNum) => {
  return async (dispatch, getState, {history}) => {
    try {
      await apis.smsCheck(phoneNum, randomNum);

      dispatch(smsCheck(true));
    } catch(err) {
      console.log(err);
    }
  };
};

const loginDB = (id, pwd) => {
  return async (dispatch, getState, {history}) => {
    try {
      const response = await apis.login(id, pwd);
      const user = response.data;

      response && history.push('/');
      dispatch(setUser(user));
    } catch(err) {
      console.log(err);
    }
  }
}

const editUserInfoDB = (userInfo) => {
  return async (dispatch, getState, {history}) => {
    try {
      const oldUserInfo = getState().user.user;
      const newUserInfo = {...oldUserInfo, userInfo};
      const response = await apis.editUserInfo(newUserInfo);
      const _userInfo = response.data

      response && history.push('/freeboarddetail');
      dispatch(editUserInfo(_userInfo));
    } catch(err) {
      console.log(err);
    }
  }
}

const deleteUserInfoDB = () => {
  return async (dispatch, getState, {history}) => {
    try {
      await apis.deleteUser();

      history.push('/');
      dispatch(logout());
    } catch(err) {
      console.log(err);
    }
  };
};

const initialState = {
  is_login: false,
  is_id: false,
  is_nickname: false,
  is_sms: false,
  user: {},
}

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, draft => {
        draft.is_login = true;
        draft.user = action.payload.user
      }),
    [LOGOUT]: (state, action) =>
      produce(state, draft => {
        draft.is_login = false;
        draft.user = {};
      }),
    [EDIT_USER]: (state, action) =>
      produce(state, draft => {
        draft.user = action.payload.userInfo;
      }),
    [ID_CHECK]: (state, action) =>
      produce(state, draft => {
        draft.is_id = action.payload.state;
      }),
    [NICKNAME_CHECK]: (state, action) =>
      produce(state, draft => {
        draft.is_nickname = action.payload.state;
      }),
    [SMS_CHECK]: (state, action) =>
      produce(state, draft => {
        draft.is_sms = action.payload.state;
      }),
  },
  initialState
);

const userActions = {
  setUser,
  logout,
  idCheck,
  nicknameCheck,
  // signupDB,
  isIdDB,
  isNicknameDB,
  isPhoneNumCheckDB,
  isSmsCheckDB,
  loginDB,
  editUserInfoDB,
  deleteUserInfoDB,
}

export {userActions}