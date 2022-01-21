import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { imageActions } from "./image";
import { apis } from "../../shared/apis";
import { userStorage } from "../../shared/userStorage";

//action
const GET_PROFILE = "GET_PROFILE";
// const ADD_PROFILE = "ADD_PROFILE";
const ADD_PROFILE = "ADD_PROFILE";

//action creators
const getProfile = createAction(GET_PROFILE, (profile) => ({ profile }));
// const addProfile = createAction(ADD_PROFILE, (profile) => ({ profile }));
const addProfile = createAction(ADD_PROFILE, (profile) => ({ profile }));

//middlewares
const getProfileDB = () => {
  return async (dispatch, getState, { history }) => {
    try {
      const response = await apis.getProfile();
      response && dispatch(getProfile(response.data));
      // const userInfo = {
      //   nickname: localStorage.getItem('nickname'),
      //   profileImg: localStorage.getItem('profileImg'),
      //   gender: localStorage.getItem('gender'),
      //   ageRange: localStorage.getItem('ageRange'),
      //   career: localStorage.getItem('career') !== "null"? localStorage.getItem('career'): null,
      //   selfIntro: localStorage.getItem('selfIntro') !== "null"? localStorage.getItem('selfIntro'): null,
      //   phoneNum: localStorage.getItem('phoneNum') !== "null"? localStorage.getItem('phoneNum'): null,
      // };

      // dispatch(getProfile(userInfo));
    } catch (err) {
      console.log("getProfileDB", err);
    }
  };
}

const addProfileDB = (profile) => {
  return async (dispatch, getState, { history }) => {
    const new_profile = {
      nickname: profile.nickname,
      career: profile.career,
      selfIntro: profile.selfIntro,
    };
    const formData = new FormData();
    formData.append("profileImg", profile.profileImg);
    formData.append(
      "requestDto",
      new Blob([JSON.stringify(new_profile)], { type: "application/json" })
    );

    try {
      const response = await apis.addProfile(formData);
      
      response && userStorage(response.data);
      history.push("/mypage");
      window.alert("정상적으로 프로필이 수정되었습니다.");
      dispatch(addProfile(response.data));
      dispatch(imageActions.setPreview(null));
    } catch (err) {
      window.alert("프로필을 다시 확인해 주세요!");
      console.log("addProfileDB", err);
      // const error = {...err};
      // console.log(error.response.data.error);
    }
  };
};

// const isPhoneNumDB = (_phoneNum) => {
//   return async (dispatch, getState, { history }) => {
//     try {
//       await apis.phoneNumCheck(_phoneNum);
//       window.alert("인증번호가 전송되었습니다.");
//     } catch (err) {
//       window.alert('이미 전화번호 인증을 완료하셨습니다.')
//       console.log(err);
//     }
//   };
// };

// const isSmsCheckDB = (phoneNum, randomNum) => {
//   return async (dispatch, getState, { history }) => {
//     try {
//       const response = await apis.smsNumCheck(phoneNum, randomNum);
//       response && window.alert("인증이 완료되었습니다.");
//       history.goBack();
//       localStorage.setItem("phoneNum", phoneNum);
//       localStorage.setItem('certification', response.data)
//       // dispatch(smsCheck(response.data));
//     } catch (err) {
//       window.alert('인증번호가 일치하지 않습니다.')
//       // window.alert(err.errorMessage);
//       console.log(err);
//     }
//   };
// };

// const changePwdDB = (password, newPassword) => {
//   return async (dispatch, getState, { history }) => {
//     try {
//       await apis.changePwd(password, newPassword);
//       window.alert(
//         "비밀번호가 정상적으로 변경되었습니다. 변경된 비밀번호로 다시 로그인 해주시기 바랍니다."
//       );
//       dispatch(userActions.logout());
//       history.push(`/login`);
//     } catch (err) {
//       window.alert("비밀번호를 잘못입력하셨습니다.");
//       console.log(err);
//     }
//   };
// };

//initialState
const initialState = {
  user_profile: {},
};

//reducer
export default handleActions(
  {
    [GET_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user_profile = action.payload.profile;
      }),
    // [ADD_PROFILE]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.user_profile = action.payload.profile;
    //   }),
    [ADD_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user_profile = action.payload.profile;
      }),
  },
  initialState
);

const profileActions = {
  getProfile,
  // addProfile,
  addProfile,
  getProfileDB,
  // addProfileDB,
  addProfileDB,
  // isPhoneNumDB,
  // isSmsCheckDB,
  // changePwdDB,
};

export { profileActions };
