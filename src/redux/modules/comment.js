import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import alert from "sweetalert";
import { apis } from "../components/shared/apis";
import { loadPostDB } from "./post";

// initialState
const initialState = {
  list: [],
};

// action
const LOAD = "comment/LOAD";
const ADD = "comment/ADD";
const UPDATE = "comment/UPDATE";
const DELETE = "comment/DELETE";

// action create
const loadComment = createAction(LOAD, (comment) => ({ comment }));
const addComment = createAction(ADD, (comment, store) => ({
  comment,
  store,
}));
const updateComment = createAction(UPDATE, (content) => ({ content }));
const deleteComment = createAction(DELETE, (commentId) => ({ commentId }));

// thunk middleWare
export const addCommentDB =
  (postId, content) =>
  async (dispatch, getState, { history }) => {
    const state = getState().freeboard.list.resortPosts;
    await apis
      .addComment(postId, content)
      .then((res) => {
        let index;
        for (let i = 0; i < state.length; i++) {
          if (state[i].id === postId) {
            index = i;
          }
        }
        alert("댓글달기 성공!");
        dispatch(addComment(res.data, state[index]));
        dispatch(loadPostDB()).then(console.log("갯수추가 완료"));
        dispatch(loadCommentDB(postId))
          .then(console.log("댓글로딩완료"))
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

export const loadCommentDB =
  (postId) =>
  async (dispatch, getState, { history }) => {
    await apis.getComment(postId).then((res) => {
      dispatch(loadComment(res.data));
    });
  };

export const updateCommentDB =
  (commentId, content) =>
  async (dispatch, getState, { history }) => {
   await apis.updateComment(commentId, content).then((res) => {
      dispatch(loadComment(res.data));
    });
  };

export const deleteCommentDB =
  (postId, commentId) =>
  async (dispatch, getState, { history }) => {
    await apis.deleteComment(postId, commentId).then((res) => {
      dispatch(loadCommentDB(postId));
      deleteComment(commentId);
      alert("댓글 삭제");
    });
  };

// reducer
export default handleActions(
  {
    [LOAD]: (state, action) => {
      return {
        ...state,
        list: action.payload.comment,
      };
    },
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.comment);
        draft.list.push((action.payload.store.numOfComments += 1));
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
        list: state.list.filter((list) => list.id !== action.payload.commentId),
      };
    },
  },
  initialState
);
