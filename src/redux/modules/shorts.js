import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/apis";

//action
const GET_SHORTS = "shorts/GET_SHORTS";
const ADD_SHORTS = "shorts/ADD_SHORTS";
const UPDATE_SHORTS = "shorts/UPDATE_SHORTS";
const DELETE_SHORTS = "shorts/DELETE_SHORTS";
const GET_MY_SHORTS = "shorts/GET_MY_SHORTS";
const LIKE_COUNT = "LIKE_COUNT";

// acrtion creators
const getShorts = createAction(GET_SHORTS, (shortsList) => ({ shortsList }));
const addShorts = createAction(ADD_SHORTS, (shortsDatas) => ({ shortsDatas }));
const updateShorts = createAction(UPDATE_SHORTS, (shortsData) => ({
  shortsData,
}));
const deleteShorts = createAction(DELETE_SHORTS, (shortsId) => ({ shortsId }));
const getMyShorts = createAction(GET_MY_SHORTS, (myList) => ({ myList }));
const likeCount = createAction(LIKE_COUNT, (state) => ({ state }));

// initialState
const initialState = {
  shortsList: [],
  myShortsList: [],
};

// middlewares
// 동영상 조회
const getShortsDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.shortsRandomList();
      const shortsId = response.data.shortsId;

      response && dispatch(getShorts(response.data));
      history.push(`/shorts/${shortsId}`);
    } catch (err) {
      console.log(err);
    }
  };
};

//동영상 작성
const addShortsDB = (videoFile, title) => {
  return async function (dispatch, getState, { history }) {
    let formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append(
      "title",
      new Blob([JSON.stringify(title)], { type: "application/json" })
    );

    try {
      const response = await apis.shortsUpload(formData);
      console.log(response);
      response && dispatch(addShorts(response.data));
      console.log(response);
      history.push("/shorts");
    } catch (err) {
      console.log(err);
    }
  };
};

//동영상 수정
const updateShortsDB = (title) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.shortsUpdate(title);
      response && dispatch(updateShorts(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//동영상 삭제
const deleteShortsDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.shortsDelete();
      response && dispatch(deleteShorts(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//내 동영상 정보
const myShortsDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.myShortsList();
      response && dispatch(getMyShorts(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

// reducer
export default handleActions(
  {
    [GET_SHORTS]: (state, action) =>
      produce(state, (draft) => {
        draft.shortsList = action.payload.shortsList;
      }),

    [ADD_SHORTS]: (state, action) =>
      produce(state, (draft) => {
        draft.shortsList.unshift(action.payload.shortsDatas);
      }),

    [UPDATE_SHORTS]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.shortsList.findIndex(
          (l) => l.shortsId === Number(action.payload.shortsId)
        );
        draft.shortsList[idx] = {
          ...draft.shortsList[idx],
          ...action.payload.shortsData,
        };
      }),

    [DELETE_SHORTS]: (state, action) =>
      produce(state, (draft) => {
        let deleted_list = draft.shortsList.filter(
          (l) => l.shortsId !== action.payload.shortsId
        );
        draft.shortsList = deleted_list;
      }),
    [GET_MY_SHORTS]: (state, action) =>
      produce(state, (draft) => {
        draft.myShortsList.push(...action.payload.myList);
      }),

    [LIKE_COUNT]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.state) {
          draft.shortsList.shortsLikeCnt += 1;
        } else {
          draft.shortsList.shortsLikeCnt -= 1;
        }
      }),
  },
  initialState
);

const shortsActions = {
  likeCount,
  getShortsDB,
  addShortsDB,
  updateShortsDB,
  deleteShortsDB,
  myShortsDB,
};

export { shortsActions };
