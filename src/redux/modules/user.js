import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/apis";
import { deleteCookie } from "../../shared/cookie";

//initialState
const initialState = {
  is_login: false,
  is_sms: false,
  user: {},
};

//action
const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";
const PHONENUM_CHECK = "PHONENUM_CHECK";
const SMS_CHECK = "SMS_CHECK";

//action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logout = createAction(LOGOUT, () => ({}));
const phoneNum = createAction(PHONENUM_CHECK, (num) => ({ num }));
const smsCheck = createAction(SMS_CHECK, (state) => ({ state }));

//middlewares
//핸드폰 인증번호 요청
const isPhoneNumDB = (_phoneNum) => {
  return async (dispatch, getState, { history }) => {
    try {
      await apis.phoneNumCheck(_phoneNum);
      window.alert("인증번호가 전송되었습니다.");
      dispatch(phoneNum(_phoneNum));
    } catch (err) {
      window.alert("이미 전화번호 인증을 완료하셨습니다.");
    }
  };
};

//핸드폰 인증번호 확인
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
      window.alert("인증번호가 틀렸습니다. 다시 입력해 주세요.");
    }
  };
};

//회원 탈퇴
const deleteUserInfoDB = () => {
  return async (dispatch, getState, { history }) => {
    try {
      await apis.deleteUser();
      window.alert("회원탈퇴 요청이 정상적으로 처리되었습니다.");
      history.push("/");
      dispatch(logout());
    } catch (err) {
    }
  };
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
  phoneNum,
  isPhoneNumDB,
  isSmsCheckDB,
  deleteUserInfoDB,
};

export { userActions };
