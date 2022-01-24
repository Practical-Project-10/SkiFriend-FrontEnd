import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";
import produce from "immer";
import { getOneBoardDB } from "./freeboard";
import { shortsActions } from "./shorts";

// initialState
const initialState = {
  shortsList: [],
};

// action
const GET_SHORTS_COMMENT = "comment/GET";
const ADD_SHORTS_COMMENT = "comment/ADD";
const UPDATE_SHORTS_COMMENT = "comment/UPDATE";
const DELETE_SHORTS_COMMENT = "comment/DELETE";

// action creater
export const getShortsComment = createAction(
  GET_SHORTS_COMMENT,
  (commentList) => ({ commentList })
);
export const addShortsComment = createAction(ADD_SHORTS_COMMENT, (comment) => ({
  comment,
}));
export const updateShortsComment = createAction(
  UPDATE_SHORTS_COMMENT,
  (shortsCommentId, comment) => ({ shortsCommentId, comment })
);
export const deleteShortsComment = createAction(
  DELETE_SHORTS_COMMENT,
  (shortsCommentId) => ({ shortsCommentId })
);

// thunk middleWare
//게시판 댓글 작성
export const addCommentDB =
  (postId, content) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.addPostComment(postId, content);
      response && dispatch(getOneBoardDB(postId));
    } catch (err) {}
  };
//게시판 댓글 수정
export const updateCommentDB =
  (postId, commentId, content) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.updatePostComment(commentId, content);
      response && dispatch(getOneBoardDB(postId));
    } catch (err) {}
  };
//게시판 댓글 삭제
export const deleteCommentDB =
  (postId, commentId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.deletePostComment(commentId);
      response && dispatch(getOneBoardDB(postId));
    } catch (err) {}
  };

//동영상 댓글 조회
export const getShortsCommentDB =
  (shortsId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.shortsListComment(shortsId);
      response && dispatch(getShortsComment(response.data));
      dispatch(shortsActions.CommentCount(true, response.data.length));
    } catch (err) {}
  };

//동영상 댓글 작성
export const addShortsCommentDB =
  (shortsId, content) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.shortsWriteComment(shortsId, content);
      response && dispatch(addShortsComment(response.config.data));
    } catch (err) {}
  };

//동영상 댓글 수정
export const updateShortsCommentDB =
  (shortsCommentId, content) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.shortsUpdateComment(shortsCommentId, content);
      response &&
        dispatch(updateShortsComment(shortsCommentId, response.config.data));
    } catch (err) {}
  };

//동영상 댓글 삭제
export const deleteShortsCommentDB =
  (shortsCommentId) =>
  async (dispatch, getState, { history }) => {
    try {
      await apis.shortsDeleteComment(shortsCommentId);
      dispatch(deleteShortsComment(shortsCommentId));
      dispatch(shortsActions.CommentCount(false));
    } catch (err) {}
  };

// reducer
export default handleActions(
  {
    [GET_SHORTS_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.shortsList = action.payload.commentList;
      }),

    [ADD_SHORTS_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.shortsList.unshift(action.payload.comment);
      }),

    [UPDATE_SHORTS_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.shortsList.findIndex(
          (p) => p.shortsCommentId === Number(action.payload.shortsCommentId)
        );
        draft.shortsList[idx] = action.payload.comment;
      }),

    [DELETE_SHORTS_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.shortsList = state.shortsList.filter(
          (list) => list.shortsCommentId !== action.payload.shortsCommentId
        );
      }),
  },
  initialState
);

const commentCreators = {
  addCommentDB,
  updateCommentDB,
  deleteCommentDB,
  getShortsCommentDB,
  addShortsCommentDB,
  updateShortsCommentDB,
  deleteShortsCommentDB,
};

export { commentCreators };
