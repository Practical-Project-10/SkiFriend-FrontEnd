import {createAction, handleActions} from 'redux-actions'
import {produce} from 'immer'

import { apis } from '../../shared/apis';

//action
const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';
const UPDATE_USER = 'UPDATE_USER';
const ID_CHECK = 'ID_CHECK';
const NICKNAME_CHECK = 'NICKNAME_CHEKCK';
const SMS_CHECK = 'SMS_CHECK';

//action creators
const setUser = (SET_USER, user => ({user}));
const logout = (LOGOUT, () => ({}));
const updateUserInfo = (UPDATE_USER, (userInfo) => ({userInfo}));
const idCheck = (ID_CHECK => (state) => ({state}));
const nicknameCheck = (NICKNAME_CHECK => (state) => ({state}));
// const smsCheck = (SMS_CHECK, (state) => ({state}));

//[회원가입, 회원탈퇴, 비밀번호수정, 문자인증]은 서버에서 처리 리덕스에서 할거 없음

//middlewares
// const isSmsCheckDB = (smsNum) => {
//   return async (dispatch, getState, {history}) => {
//     try {
//       const response = await apis.smsCheck(smsNum);

//       response && dispatch(smsCheck(true));
//     } catch(err) {
//       console.log(err);
//     }
//   };
// };

const signupDB = (userInfo) => {
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

      response && history.push('/');
    } catch (err) {
      console.log(err);
    }
  };
};

const isIdDB = (id) => {
  return async (dispatch,) => {
    try{
      await apis.idCheck(id);

      dispatch(idCheck(true));
    } catch(err) {
      console.log(err);
    }
  };  
};

const isNicknameDB = (nickname) => {
  return async (dispatch,) => {
    try{
      await apis.nicknameCheck(nickname);

      dispatch(nicknameCheck(true));
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
    [UPDATE_USER]: (state, action) =>
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
    // [SMS_CHECK]: (state, action) =>
    //   produce(state, draft => {
    //     draft.sms = action.payload.state;
    //   }),
  },
  initialState
);

const userActions = {
  setUser,
  logout,
  updateUserInfo,
  idCheck,
  nicknameCheck,
  signupDB,
  isIdDB,
  isNicknameDB,
  loginDB,
  deleteUserInfoDB,
}

export {userActions}