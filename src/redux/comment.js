import { apis } from "../components/shared/apis";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import alert from "sweetalert";
import { loadPostDB } from "./post";

// initialState
const initialState = {
  list: [],
};

// action
const LOAD = "comment/LOAD";
const COMMENT = "comment/COMMENT";
const DELETE = "comment/DELETE";

// action create
const addComment = createAction(COMMENT, (comment, store) => ({
  comment,
  store,
}));
const loadComment = createAction(LOAD, (comment) => ({ comment }));
const deleteComment = createAction(DELETE, (commentId) => ({ commentId }));

// thunk middleWare
export const addCommentDB =
  (postId, content) =>
  (dispatch, getState, { history }) => {
    const state = getState().post.list;
    apis
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
  (dispatch, getState, { history }) => {
    apis.getComment(postId).then((res) => {
      dispatch(loadComment(res.data));
    });
  };

export const deleteCommentDB =
  (postId, commentId) =>
  (dispatch, getState, { history }) => {
    apis.deleteComment(postId, commentId).then((res) => {
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
    [COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.comment);
        draft.list.push((action.payload.store.numOfComments += 1));
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
