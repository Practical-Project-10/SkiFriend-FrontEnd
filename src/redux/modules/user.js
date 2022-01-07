import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/apis";
import { setCookie, deleteCookie } from "../../shared/cookie";

//action
const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";
const EDIT_USER = "EDIT_USER";
const ID_CHECK = "ID_CHECK_";
const NICKNAME_CHECK = "NICKNAME_CHEKCK";
const PHONENUM_CHECK = "PHONENUM_CHECK";
// const SMS_CHECK = "SMS_CHECK";

//action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logout = createAction(LOGOUT, () => ({}));
const editUserInfo = createAction(EDIT_USER, (userInfo) => ({ userInfo }));
const idCheck = createAction(ID_CHECK, (state) => ({ state }));
const nicknameCheck = createAction(NICKNAME_CHECK, (state) => ({ state }));
const phoneNum = createAction(PHONENUM_CHECK, (num) => ({ num }));
// const smsCheck = createAction(SMS_CHECK, (state) => ({state}));

//[회원가입, 회원탈퇴, 비밀번호수정, 문자인증]은 서버에서 처리 리덕스에서 할거 없음

//middlewares
const signupDB = (userInfo) => {
  return async (dispatch, getState, { history }) => {
    const _phoneNum = getState().user.user.phoneNum;
    const _userInfo = {
      username: userInfo.id,
      password: userInfo.password,
      phoneNum: _phoneNum,
      nickname: userInfo.nickname,
    };
    try {
      await apis.signup(_userInfo);
      window.alert("회원가입이 완료되었습니다.");
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
};

const isIdDB = (id) => {
  return async (dispatch) => {
    try {
      await apis.idCheck(id);
      window.alert("사용 가능한 아이디 입니다.");
      dispatch(idCheck(true));
    } catch (err) {
      window.alert("이미 사용중인 아이디 입니다.");
      // dispatch(idCheck(true));
      console.log(err);
    }
  };
};

const isNicknameDB = (nickname) => {
  return async (dispatch) => {
    try {
      await apis.nicknameCheck(nickname);
      window.alert("사용 가능한 닉네임 입니다.");
      dispatch(nicknameCheck(true));
    } catch (err) {
      window.alert("이미 사용중인 닉네임 입니다.");
      console.log(err);
    }
  };
};

const isPhoneNumDB = (_phoneNum) => {
  return async (dispatch, getState, { history }) => {
    try {
      const response = await apis.phoneNumCheck(_phoneNum);
      console.log(response);
      window.alert("인증번호가 전송되었습니다.");
      dispatch(phoneNum(_phoneNum));
    } catch (err) {
      window.alert("입력하신 번호가 올바르지 않습니다.");
      console.log(err);
    }
  };
};

const isSmsCheckDB = (phoneNum, randomNum) => {
  return async (dispatch, getState, { history }) => {
    try {
      await apis.smsNumCheck(phoneNum, randomNum);
      window.alert("인증이 완료되었습니다.");
      history.push("/signup");
      // dispatch(smsCheck(true));
    } catch (err) {
      window.alert("인증번호가 일치하지 않습니다.");
      console.log(err);
    }
  };
};

const loginDB = (id, pwd) => {
  return async (dispatch, getState, { history }) => {
    try {
      const response = await apis.login(id, pwd);
      const user = response.data;
      const token = response.headers.authorization;
      response && history.push("/");
      setCookie("token", token);
      localStorage.setItem("nickname", response.data.nickname);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("is_profile", response.data.profile);
      localStorage.setItem("is_login", true);
      dispatch(setUser(user));
    } catch (err) {
      window.alert("아이디와 비밀번호를 확인해주세요.");
      console.log(err);
    }
  };
};

const editUserInfoDB = (userInfo) => {
  return async (dispatch, getState, { history }) => {
    try {
      const oldUserInfo = getState().user.user;
      const newUserInfo = { ...oldUserInfo, userInfo };
      const response = await apis.editUserInfo(newUserInfo);
      const _userInfo = response.data;
      response && history.push("/freeboarddetail");
      dispatch(editUserInfo(_userInfo));
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteUserInfoDB = () => {
  return async (dispatch, getState, { history }) => {
    try {
      await apis.deleteUser();
      window.alert("회원탈퇴 요청이 정상적으로 처리되었습니다.");
      history.push("/");
      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {
  is_login: false,
  is_id: false,
  is_nickname: false,
  // is_sms: false,
  user: {},
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = true;
        console.log(action.payload.user);
        draft.user = action.payload.user;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("token");
        localStorage.clear();
        draft.is_login = false;
        draft.user = {};
      }),
    [EDIT_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.userInfo;
      }),
    [ID_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.is_id = action.payload.state;
      }),
    [NICKNAME_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.is_nickname = action.payload.state;
      }),
    [PHONENUM_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.user.phoneNum = action.payload.num;
      }),
    // [SMS_CHECK]: (state, action) =>
    //   produce(state, draft => {
    //     draft.is_sms = action.payload.state;
    //   }),
  },
  initialState
);

const userActions = {
  signupDB,
  setUser,
  logout,
  editUserInfo,
  // idCheck,
  // nicknameCheck,
  phoneNum,
  // smsCheck,
  // signupDB,
  isIdDB,
  isNicknameDB,
  isPhoneNumDB,
  isSmsCheckDB,
  loginDB,
  editUserInfoDB,
  deleteUserInfoDB,
};

export { userActions };
