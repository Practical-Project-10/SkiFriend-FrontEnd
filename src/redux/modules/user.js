import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/apis";
import { deleteCookie } from "../../shared/cookie";

//action
const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";
const EDIT_USER = "EDIT_USER";
const PHONENUM_CHECK = "PHONENUM_CHECK";
const SMS_CHECK = "SMS_CHECK";

//action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logout = createAction(LOGOUT, () => ({}));
const editUserInfo = createAction(EDIT_USER, (userInfo) => ({ userInfo }));
const phoneNum = createAction(PHONENUM_CHECK, (num) => ({ num }));
const smsCheck = createAction(SMS_CHECK, (state) => ({ state }));

//[회원가입, 회원탈퇴, 비밀번호수정, 문자인증]은 서버에서 처리 리덕스에서 할거 없음

//middlewares

const isPhoneNumDB = (_phoneNum) => {
  return async (dispatch, getState, { history }) => {
    try {
      await apis.phoneNumCheck(_phoneNum);
      window.alert("인증번호가 전송되었습니다.");
      dispatch(phoneNum(_phoneNum));
    } catch (err) {
      window.alert("이미 전화번호 인증을 완료하셨습니다.");
      console.log(err);
    }
  };
};

const isSmsCheckDB = (phoneNum, randomNum) => {
  return async (dispatch, getState, { history }) => {
    try {
      const response = await apis.smsNumCheck(phoneNum, randomNum);
      response && window.alert("인증이 완료되었습니다.");
      localStorage.setItem("phoneNum", phoneNum);
      localStorage.setItem("certification", response.data);
      history.goBack();
      dispatch(smsCheck(response.data));
    } catch (err) {
      window.alert("인증번호가 일치하지 않습니다.");
      // window.alert(err.errorMessage);
      console.log(err);
    }
  };
};

// const editUserInfoDB = (userInfo) => {
//   return async (dispatch, getState, { history }) => {
//     try {
//       const oldUserInfo = getState().user.user;
//       const newUserInfo = { ...oldUserInfo, userInfo };
//       const response = await apis.editUserInfo(newUserInfo);
//       const _userInfo = response.data;
//       response && history.push("/freeboarddetail");
//       dispatch(editUserInfo(_userInfo));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

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
  is_sms: false,
  user: {},
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = true;
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

    [PHONENUM_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.user.phoneNum = action.payload.num;
      }),

    [SMS_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.user.is_sms = action.payload.state;
      }),
  },
  initialState
);

const userActions = {
  setUser,
  logout,
  editUserInfo,
  phoneNum,
  isPhoneNumDB,
  isSmsCheckDB,
  deleteUserInfoDB,
  // editUserInfoDB,
};

export { userActions };
