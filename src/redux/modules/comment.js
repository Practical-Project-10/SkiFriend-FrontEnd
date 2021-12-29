import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/apis";
import { getOneBoardDB } from "./freeboard";

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
    await apis
      .addPostComment(postId, content)
      .then((res) => {
        console.log("댓글달기 성공");
        console.log(res);
        // dispatch(addComment(res));
        dispatch(getOneBoardDB(postId));
      })
      .catch((e) => console.log(e));
  };

export const updateCommentDB =
  (commentId, content) =>
  async (dispatch, getState, { history }) => {
    await apis.updatePostComment(commentId, content).then((res) => {
      dispatch(loadComment(res.data));
    });
  };

export const deleteCommentDB =
  (postId, commentId) =>
  async (dispatch, getState, { history }) => {
    await apis
      .deletePostComment(commentId)
      .then((res) => {
        dispatch(getOneBoardDB(postId));
        // deleteComment(commentId);
        console.log("댓글 삭제");
      })
      .catch((error) => {
        console.log(`댓글삭제 실패${error}`);
      });
  };

// reducer
export default handleActions(
  {
    [LOAD]: (state, action) => {
      return {
        ...state,
        list: action.payload.postData.commentDtoList,
      };
    },
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.postData.commentDtoList);
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

const commentCreators = {
  loadComment,
  addCommentDB,
  updateCommentDB,
  deleteCommentDB,
};

export { commentCreators };
