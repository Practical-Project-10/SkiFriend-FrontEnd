import {createAction, handleActions} from 'redux-actions'
import {produce} from 'immer'

//action
const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';
const UPDATE_USER = 'UPDATE_USER';
const USERNAME_CHECK = 'USERNAME_CHECK';
const NICKNAME_CHEKCK = 'NICKNAME_CHEKCK';
const SMS_CHECK = 'SMS_CHECK';

//action creators
const setUser = (SET_USER, username => ({username}));
const logout = (LOGOUT, () => ({}));
const updateUserInfo = (UPDATE_USER, (userInfo) => ({userInfo}));
const usernameCheck = (USERNAME_CHECK => (state) => ({state}));
const nicknameCheck = (NICKNAME_CHEKCK => (state) => ({state}));
const smsCheck = (SMS_CHECK, (state) => ({state}));

//[회원가입, 회원탈퇴, 비밀번호수정, 문자인증]은 서버에서 처리 리덕스에서 할거 없음
//중복확인은 안하는지?

//middlewares
// const isUsername = (username) => {
//   return async (dispatch, getState, {history}) => {
//     try{
//       const resonse = await.apis.
//     }
// }

const isSmsDB = (phoneNum) => {
  return async (dispatch, getState, {history}) => {
    // try {
    //   await apis.sms(phoneNum);
    // } catch(err) {
    //   console.log(err);
    // }
  };
};

const isSmsCheckDB = (smsNum) => {
  return async (dispatch, getState, {history}) => {
    // try {
    //   const response = await apis.smsCheck(smsNum);

    //   response && dispatch(smsCheck(true));
    // } catch(err) {
    //   console.log(err);
    // }
  };
};

const signupDB = (userInfo) => {
  return async (dispatch, getState, {history}) => {
    const userData = {
      username: userInfo.username,
      nickname: userInfo.nickname,
      password: userInfo.password,
      phoneNum: userInfo.phoneNum,
      profileImg: userInfo.profileImg,
      vacImg: userInfo.vacImg, //  ???
      gender: userInfo.gender,
      ageRange: userInfo.ageRange,
      career: userInfo.career,
      selfIntro: userInfo.selfIntro,
    }

    // try {
    //   const response = await apis.signup(userData);

    //   response && history.push('/');
    // } catch (err) {
    //   console.log(err);
    // }
  };
};

const loginDB = (id, pwd) => {
  return async (dispatch, getState, {history}) => {
    // try {
    //   const response = await apis.login(id, pwd);

    //   response && dispatch(setUser(response.data));
    // } catch(err) {
    //   console.log(err);
    // }
  }
}

const initialState = {
  is_login: false,
  is_username: false,
  is_nickname: false,
  is_sms: false,
  user: {},
}

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, draft => {
        draft.is_login = true;
        draft.user = action.payload.username
      }),
    [LOGOUT]: (state, action) =>
      produce(state, draft => {
        draft.is_login = false;
      }),
    [UPDATE_USER]: (state, action) =>
      produce(state, draft => {
        draft.user = action.payload.userInfo;
      }),
    // [USERNAME_CHECK]: (state, action) =>
    //   produce(state, draft => {
    //     draft.is_username = action.payload.state;
    //   }),
    // [USERNAME_CHECK]: (state, action) =>
    //   produce(state, draft => {
    //     draft.is_nickname = action.payload.state;
    //   }),
    [SMS_CHECK]: (state, action) =>
      produce(state, draft => {
        draft.sms = action.payload.state;
      }),
  },
  initialState
);