import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";

import produce from "immer";

// initialState
const initialState = {
  list: [
    {
      nickname: "jaewoo",
      createdAt: 2021,
      title: "설원",
      likeCnt: 2,
      commentCnt: 3,
    },
    {
      nickname: "gildong",
      createdAt: 2022,
      title: "hello",
      likeCnt: 5,
      commentCnt: 4,
    },
  ],
};

// action
const LOAD = "freeboard/LOAD";
const ADD = "freeboard/POST";
const UPDATE = "freeboard/UPDATE";
const DELETE = "freeboard/DELETE";

// action creater
export const loadBoard = createAction(LOAD, (postList) => ({
  postList,
}));
export const addBoard = createAction(ADD, (postData) => ({ postData }));
export const updateBoard = createAction(UPDATE, (postData) => ({ postData }));
export const deleteBoard = createAction(DELETE, (postId) => ({ postId }));

// thunk
export const loadBoardDB =
  (skiResort) =>
  async (dispatch, getState, { history }) => {
    const data = await apis.getPost(skiResort);
    dispatch(loadBoard(data.data));
  };

export const addBoardDB =
  (skiResort, datas) =>
  async (dispatch, getState, { history }) => {
    const data = await apis.writeFreePost(skiResort, datas);
    dispatch(addBoard(data));
    dispatch(loadBoardDB());
  };

export const updateBoardDB =
  (postId, datas) =>
  async (dispatch, getState, { history }) => {
    if (!postId) {
      console.log("게시물 정보가 없어요!");
      return;
    }
    const data = await apis.updateFreePost(postId, datas);
    dispatch(updateBoard(data));
    dispatch(loadBoardDB());
  };

export const deleteBoardDB =
  (postId) =>
  async (dispatch, getState, { history }) => {
    apis.deleteFreePost(postId).then((res) => {
      dispatch(deleteBoard(postId));
    });
  };

// reducer
export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.postList);
      }),

    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.postData);
      }),

    [UPDATE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.id === Number(action.payload.userId)
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),

    [DELETE]: (state, action) => {
      return {
        ...state,
        list: state.list.filter((list) => list.id !== action.payload.postId),
      };
    },
  },
  initialState
);

const boardCreators = {
  addBoardDB,
  loadBoardDB,
  updateBoardDB,
  deleteBoardDB,
};

export { boardCreators };
