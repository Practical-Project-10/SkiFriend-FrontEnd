import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";
import axios from "axios";
import produce from "immer";

// initialState
const initialState = {
  list: [],
  detail: [],
};

// token
const accessToken = document.cookie.split("=")[1];
const token = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `${accessToken}`,
  },
};

// action
const LOAD = "freeboard/LOAD";
const ADD = "freeboard/POST";
const GETONE = "freeboard/GETONE";
const UPDATE = "freeboard/UPDATE";
const DELETE = "freeboard/DELETE";

// action creater
export const loadBoard = createAction(LOAD, (postList) => ({
  postList,
}));
export const addBoard = createAction(ADD, (postData) => ({ postData }));
export const getOneBoard = createAction(GETONE, (postData) => ({ postData }));
export const updateBoard = createAction(UPDATE, (postData) => ({ postData }));
export const deleteBoard = createAction(DELETE, (postId) => ({ postId }));

// thunk
// 자유 게시판 목록 불러오기
export const loadBoardDB =
  (skiResort) =>
  async (dispatch, getState, { history }) => {
    await apis
      .getFreePost(skiResort)
      .then((res) => {
        console.log(res.data);
        dispatch(loadBoard(res.data));
      })
      .catch((error) => {
        console.log(`불러오기 실패${error}`);
      });
  };

// 게시글 등록하기
export const addBoardDB =
  (skiResort, image, datas) =>
  async (dispatch, getState, { history }) => {
    let formdata = new FormData();
    formdata.append("image", image);
    formdata.append(
      "requestDto",
      new Blob([JSON.stringify(datas)], { type: "application/json" })
    );

    await axios
      .post(
        `http://13.125.249.172/board/${skiResort}/freeBoard`,
        formdata,
        token
      )
      // await apis
      //   .writeFreePost(skiResort, formdata)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log("등록 완료~");
        dispatch(addBoard(res.config.data));
        history.push(`/freeboardlist/${skiResort}`);
      })
      .catch((error) => {
        console.log(`오류 발생!${error}`);
      });
  };

export const getOnePostDB =
  (postId) =>
  async (dispatch, getState, { history }) => {
    await apis
      .getOneFreePost(postId)
      .then((res) => {
        console.log("데이터 가져오기 성공");
        console.log(res.data);
        dispatch(getOneBoard(res.data));
      })
      .catch((error) => {
        console.log(`오류 발생!${error}`);
      });
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

    [GETONE]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = action.payload.postData;
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
  getOnePostDB,
  updateBoardDB,
  deleteBoardDB,
};

export { boardCreators };
