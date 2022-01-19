import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";
import produce from "immer";
import { getOneBoardDB } from "./freeboard";

// initialState
const initialState = {
  list: [],
};

// action
const GET_Shorts_Comment = "comment/GET";
const ADD_Shorts_Comment = "comment/ADD";
const UPDATE_Shorts_Comment = "comment/UPDATE";
const DELETE_Shorts_Comment = "comment/DELETE";

// action creater
export const getShortsComment = createAction(GET_Shorts_Comment, (commentList) => ({ commentList }));
export const addShortsComment = createAction(ADD_Shorts_Comment, (comment) => ({ comment }));
export const updateShortsComment = createAction(UPDATE_Shorts_Comment, (comment) => ({ comment }));
export const deleteShortsComment = createAction(DELETE_Shorts_Comment, (videoCommentId) => ({ videoCommentId }));

// thunk middleWare
//게시판 댓글 작성
export const addCommentDB =
  (postId, content) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.addPostComment(postId, content);
      response && dispatch(getOneBoardDB(postId));
    } catch (err) {
      console.log(err);
    }
  };
//게시판 댓글 수정
export const updateCommentDB =
  (postId, commentId, content) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.updatePostComment(commentId, content);
      response && dispatch(getOneBoardDB(postId));
    } catch (err) {
      console.log(err);
    }
  };
//게시판 댓글 삭제
export const deleteCommentDB =
  (postId, commentId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.deletePostComment(commentId);
      response && dispatch(getOneBoardDB(postId));
    } catch (err) {
      console.log(`댓글삭제 실패${err}`);
    }
  };

//동영상 댓글 조회
export const getShortsCommentDB =
  (videoId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.shortsListComment(videoId);
      response && dispatch(getShortsComment(response.data));
    } catch (err) {
      console.log(err);
    }
  };

//동영상 댓글 작성
export const addShortsCommentDB =
  (videoId, content) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.shortsWriteComment(videoId, content);
      response && dispatch(addShortsComment(response.data));
    } catch (err) {
      console.log(err);
    }
  };

//동영상 댓글 수정
export const updateShortsCommentDB =
  (videoCommentId, content) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.shortsUpdateComment(videoCommentId, content);
      response && dispatch(updateShortsComment(response.data));
    } catch (err) {
      console.log(err);
    }
  };

//동영상 댓글 삭제
export const deleteShortsCommentDB =
  (videoCommentId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.shortsDeleteComment(videoCommentId);
      response && dispatch(deleteShortsComment(response.data));
    } catch (err) {
      console.log(`댓글삭제 실패${err}`);
    }
  };

  // reducer
export default handleActions(
  {
    [GET_Shorts_Comment]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.commentList;
        draft.list = draft.list.reduce((prev, now) => {
          if (prev.findIndex((a) => a.shortsCommentId === now.shortsCommentId) === -1) {
            return [...prev, now];
          } else {
            prev[prev.findIndex((a) => a.shortsCommentId === now.shortsCommentId)] = now;
            return prev;
          }
        }, []);
      }),

    [ADD_Shorts_Comment]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.comment);
      }),

    [UPDATE_Shorts_Comment]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.comment;
      }),

    [DELETE_Shorts_Comment]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.postId === Number(action.payload.postId)
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.detail };
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
