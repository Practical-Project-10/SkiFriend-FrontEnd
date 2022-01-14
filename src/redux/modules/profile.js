import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { imageActions } from "./image";
import { apis } from "../../shared/apis";
import { userActions } from "../modules/user";

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
      dispatch(getProfile(response.data));
    } catch (err) {
      console.log("getProfileDB", err);
    }
  };
};

const addProfileDB = (profile) => {
  return async (dispatch, getState, { history }) => {
    const new_profile = {
      gender: profile.gender,
      ageRange: profile.ageRange,
      career: profile.career,
      selfIntro: profile.selfIntro,
    };

    const formData = new FormData();
    formData.append("profileImg", profile.profileImg);
    formData.append("vacImg", profile.vacImg);
    formData.append(
      "requestDto",
      new Blob([JSON.stringify(new_profile)], { type: "application/json" })
    );
    try {
      const response = await apis.addProfile(formData);

      const _profile = response.data;
      response && history.push("/mypage");
      window.alert("정상적으로 프로필이 등록되었습니다.");
      dispatch(addProfile(_profile));
      dispatch(imageActions.setPreview(null));
    } catch (err) {
      window.alert("프로필을 다시 확인해 주세요!");
      console.log("addProfileDB", err);
    }
  };
};

const editProfileDB = (profile) => {
  return async (dispatch, getState, { history }) => {
    const new_profile = {
      nickname: profile.nickname,
      career: profile.career,
      selfIntro: profile.selfIntro,
    };
    const formData = new FormData();
    formData.append("profileImg", profile.profileImg);
    formData.append("vacImg", profile.vacImg);
    formData.append(
      "requestDto",
      new Blob([JSON.stringify(new_profile)], { type: "application/json" })
    );

    try {
      const response = await apis.editProfile(formData);
      
      response && history.push("/mypage");
      window.alert("정상적으로 프로필이 수정되었습니다.");
      dispatch(editProfile(response.data));
      dispatch(imageActions.setPreview(null));
      localStorage.setItem('nickname', response.data.nickname);
    } catch (err) {
      window.alert("프로필을 다시 확인해 주세요!");
      console.log("addProfileDB", err);
      // const error = {...err};
      // console.log(error.response.data.error);
    }
  };
};

const changePwdDB = (password, newPassword) => {
  return async (dispatch, getState, { history }) => {
    try {
      await apis.changePwd(password, newPassword);
      window.alert(
        "비밀번호가 정상적으로 변경되었습니다. 변경된 비밀번호로 다시 로그인 해주시기 바랍니다."
      );
      dispatch(userActions.logout());
      history.push(`/login`);
    } catch (err) {
      window.alert("비밀번호를 잘못입력하셨습니다.");
      console.log(err);
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
          localStorage.setItem("is_profile", true);
        }
      }),
    [ADD_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user_profile = action.payload.profile;
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
