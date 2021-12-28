import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { apis } from "../../shared/apis";

//action
const GET_PROFILE = 'GET_PROFILE';
const ADD_PROFILE = 'ADD_PROFILE';
const EDIT_PROFILE = 'EDIT_PROFILE';

//action creators
const getProfile = createAction(GET_PROFILE, (profile) => ({profile}));
const addProfile = createAction(ADD_PROFILE, (profile) => ({profile}));
const editProfile = createAction(EDIT_PROFILE, (profile) => ({profile}));

//middlewares
const getProfileDB = () => {
  return async (dispatch, getState, {history}) => {
    try {
      const response = await apis.getProfile();
      console.log(response.data);

      response && dispatch(getProfile(response.data));
      if(response.data.profileImg) {
        localStorage.setItem('is_profile', true);
      };
    } catch(err) {
      console.log('getProfileDB', err);
    }
  }
}

const addProfileDB = (profile) => {
  return async (dispatch, getState, {history}) => {
    console.log(profile.selfIntro);

    const new_profile = {
      gender: profile.gender,
      ageRange: profile.ageRange,
      career: profile.career,
      selfIntro: profile.selfIntro,
    }

    const formData = new FormData();
    formData.append('profileImg', profile.profileImg);
    formData.append('vacImg', profile.vacImg);
    formData.append('requestDto', new Blob([JSON.stringify(new_profile)], { type: "application/json" }));

    try {
      const response = await apis.addProfile(formData);
      const _profile = response.data;

      response && history.push('/mypage');
      dispatch(addProfile(_profile));
    } catch(err) {
      console.log('addProfileDB', err)
    }
  }
}

const editProfileDB = (profile) => {
  return async (dispatch, getState, {history}) => {
    const _profile = getState().myProfile.user_profile;
    console.log(_profile);

    const edit_profile = {
      //phoneNum
      password: profile.password,
      nickname: profile.nickname,
      profileImg: profile.profileImg,
      vacImg: profile.vacImg,
      career: profile.career,
      selfIntro: profile.selfIntro,
    }

    try {
      const response = await apis.editProfile(edit_profile);

      response && dispatch(editProfile(edit_profile))
    } catch(err) {
      console.log('addProfileDB', err)
    }
  }
}

//initialState
const initialState = {
  user_profile: {
    username: '',
    nickname: '',
    password: '',
    phoneNum: '',
    profileImg: '',
    vacImg: '',
    gender: '',
    ageRange: '',
    career: '',
    selfIntro: '',
  },
}

//reducer
export default handleActions(
  {
    [GET_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user_profile = action.payload.profile;
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
)

const ProfilieActions = {
  getProfile,
  addProfile,
  editProfile,
  getProfileDB,
  addProfileDB,
  editProfileDB,
}

export { ProfilieActions };