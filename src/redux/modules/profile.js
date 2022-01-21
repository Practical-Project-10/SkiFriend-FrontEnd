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
      // console.log("getProfileDB", err);
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
