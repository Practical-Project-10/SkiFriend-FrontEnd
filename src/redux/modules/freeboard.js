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
    try {
      const data = await apis.getFreePost(skiResort);
      dispatch(loadBoard(data.data));
    } catch (error) {
      console.log(`불러오기 실패${error}`);
    }
  };

export const addBoardDB =
  (skiResort, formdata) =>
  async (dispatch, getState, { history }) => {
    console.log(skiResort);
    console.log(formdata);
    console.log(formdata.image);
    console.log(formdata.requestDto);
    try {
      const data = await apis.writeFreePost(skiResort, formdata);
      console.log(data);
      console.log("등록 완료~");
      dispatch(addBoard(data));
      dispatch(loadBoardDB());
    } catch (error) {
      console.log(`오류 발생!${error}`);
    }
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
        console.log(draft);
        console.log(action);
        console.log(action.payload);
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
