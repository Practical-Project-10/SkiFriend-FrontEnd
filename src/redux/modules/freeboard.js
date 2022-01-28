import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";
import produce from "immer";
import { imageActions } from "./image";

// initialState
const initialState = {
  list: [],
  detail: [],
};

// action
const LOAD = "freeboard/LOAD";
const ADD = "freeboard/POST";
const GETONE = "freeboard/GETONE";
const UPDATE = "freeboard/UPDATE";

// action creater
export const loadBoard = createAction(LOAD, (postList) => ({ postList }));
export const addBoard = createAction(ADD, (postData) => ({ postData }));
export const getOneBoard = createAction(GETONE, (postData) => ({ postData }));
export const updateBoard = createAction(UPDATE, (postData) => ({ postData }));

// thunk
// 자유 게시판 목록 불러오기
export const loadBoardDB =
  (skiResort, page) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.getFreePost(skiResort, page);
      response && dispatch(loadBoard(response.data));
    } catch (err) {}
  };

// 게시글 등록하기
export const addBoardDB =
  (skiResort, images, datas) =>
  async (dispatch, getState, { history }) => {
    let formData = new FormData();
    if (images === null) {
      formData.append("image", images);
    } else {
      for (let i = 0; i < images.length; i++) {
        formData.append("image", images[i]);
      }
    }
    formData.append(
      "requestDto",
      new Blob([JSON.stringify(datas)], { type: "application/json" })
    );
    try {
      const response = await apis.writeFreePost(skiResort, formData);
      response && history.push(`/freeboardlist/${skiResort}`);
      history.push(`/freeboardlist/${skiResort}`);
      dispatch(addBoard(response.data));
      dispatch(imageActions.setPreview(null));
    } catch (err) {}
  };

//상세페이지 게시글 정보 가져오기
export const getOneBoardDB =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.getOneFreePost(postId);
      response && dispatch(getOneBoard(response.data));
    } catch (err) {}
  };

//게시글 수정
export const updateBoardDB =
  (skiResort, postId, images, datas) =>
  async (dispatch, getState, { history }) => {
    if (!postId) {
      window.alert("게시물 정보가 없어요!");
      return;
    }
    let formdata = new FormData();
    if (images === null) {
      formdata.append("image", images);
    } else {
      for (let i = 0; i < images.length; i++) {
        formdata.append("image", images[i]);
      }
    }
    formdata.append(
      "requestDto",
      new Blob([JSON.stringify(datas)], { type: "application/json" })
    );
    try {
      const response = await apis.updateFreePost(postId, formdata);
      response && history.push(`/freeboarddetail/${skiResort}/${postId}`);
      dispatch(updateBoard(response.config.data));
    } catch (err) {}
  };

//게시글 삭제
export const deleteBoardDB =
  (postId, skiresort) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.deleteFreePost(postId);
      response && history.push(`/freeboardlist/${skiresort}`);
      dispatch(loadBoardDB());
    } catch (err) {}
  };

// reducer
export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.postList;
        draft.list = draft.list.reduce((prev, now) => {
          if (prev.findIndex((a) => a.postId === now.postId) === -1) {
            return [...prev, now];
          } else {
            prev[prev.findIndex((a) => a.postId === now.postId)] = now;
            return prev;
          }
        }, []);
      }),

    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.postData);
      }),

    [GETONE]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = action.payload.postData;
      }),

    [UPDATE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.postId === Number(action.payload.postId)
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.detail };
      }),
  },
  initialState
);

const boardCreators = {
  addBoardDB,
  loadBoardDB,
  getOneBoardDB,
  updateBoardDB,
  deleteBoardDB,
};

export { boardCreators };
