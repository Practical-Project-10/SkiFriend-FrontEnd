import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { imageActions } from "./image";

import { apis } from "../../shared/apis";

//action
const GET_PROFILE = "GET_PROFILE";
const ADD_PROFILE = "ADD_PROFILE";
const EDIT_PROFILE = "EDIT_PROFILE";

//action creators
const getProfile = createAction(GET_PROFILE, (profile) => ({ profile }));
const addProfile = createAction(ADD_PROFILE, (profile) => ({ profile }));
const editProfile = createAction(EDIT_PROFILE, (profile) => ({ profile }));

//middlewares
const getProfileDB = () => {
  return async (dispatch, getState, { history }) => {
    try {
      const response = await apis.getProfile();
      console.log(response.data);

      dispatch(getProfile(response.data));
    } catch (err) {
      console.log("getProfileDB", err);
    }
  };
};

const addProfileDB = (profile) => {
  // return async (dispatch, getState, { history }) => {
  //   const new_profile = {
  //     gender: profile.gender,
  //     ageRange: profile.ageRange,
  //     career: profile.career,
  //     selfIntro: profile.selfIntro,
  //   };
  //   console.log(new_profile);
  //   console.log(profile);
  //   const formData = new FormData();
  //   formData.append("profileImg", profile.profileImg);
  //   formData.append("vacImg", profile.vacImg);
  //   formData.append(
  //     "requestDto",
  //     new Blob([JSON.stringify(new_profile)], { type: "application/json" })
  //   );
  //   try {
  //     const response = await apis.addProfile(formData);
  //     console.log(response);
  //     const _profile = response.data;
  //     response && history.push("/mypage");
  //     dispatch(addProfile(_profile));
  //     dispatch(imageActions.setPreview(null));
  //   } catch (err) {
  //     console.log("addProfileDB", err);
  //   }
  // };
};

const editProfileDB = (profile) => {
  return async (dispatch, getState, { history }) => {
    const _profile = getState().profile.user_profile;
    console.log(_profile);

    const new_profile = {
      nickname: profile.nickname,
      career: profile.career,
      selfIntro: profile.selfIntro,
    };
    console.log(profile.profileImg);
    console.log(profile.vacImg);

    const formData = new FormData();
    formData.append("profileImg", profile.profileImg);
    formData.append("vacImg", profile.vacImg);
    formData.append(
      "requestDto",
      new Blob([JSON.stringify(new_profile)], { type: "application/json" })
    );

    try {
      const response = await apis.editProfile(formData);
      console.log(response.data);

      response && history.push("/mypage");
      dispatch(editProfile(response.data));
      dispatch(imageActions.setPreview(null));
    } catch (err) {
      console.log("addProfileDB", err);
      // const error = {...err};
      // console.log(error.response.data.error);
    }
  };
};

const changePwdDB = (password, newPassword) => {
  return async (dispatch, getState, { history }) => {
    console.log(password, newPassword);

    try {
      await apis.changePwd(password, newPassword);

      window.alert("비밀번호가 변경되었습니다.");
      history.goBack();
    } catch (err) {
      console.log(err);
      //에러에 따라
      //기존비밀번호가 틀렸는지
      //새비밀번호가 조건에 맞지 않았는지
    }
  };
};

//initialState
const initialState = {
  user_profile: [],
};

//reducer
export default handleActions(
  {
    [GET_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user_profile = action.payload.profile;
        const user_gender = action.payload.profile.gender;

        if (user_gender !== null) {
          localStorage.setItem("profile", true);
        }
      }),
    [ADD_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        console.log("액션1");
        draft.user_profile = action.payload.profile;
        console.log("액션2");
      }),
    [EDIT_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user_profile = action.payload.profile;
      }),
  },
  initialState
);

const profileActions = {
  getProfile,
  addProfile,
  editProfile,
  getProfileDB,
  addProfileDB,
  editProfileDB,
  changePwdDB,
};

export { profileActions };
