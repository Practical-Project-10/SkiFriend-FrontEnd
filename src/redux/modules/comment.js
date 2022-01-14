import { apis } from "../../shared/apis";
import { getOneBoardDB } from "./freeboard";

// thunk middleWare
export const addCommentDB = (postId, content) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.addPostComment(postId, content);
      response && dispatch(getOneBoardDB(postId));
    } catch(err) {
      console.log(err);
    }
  };

export const updateCommentDB = (postId, commentId, content) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.updatePostComment(commentId, content);
      response && dispatch(getOneBoardDB(postId));
    } catch(err) {
      console.log(err);
    }
  };

export const deleteCommentDB = (postId, commentId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.deletePostComment(commentId);
      response && dispatch(getOneBoardDB(postId));
    } catch(err) {
      console.log(`댓글삭제 실패${err}`);
    }
  };

const commentCreators = {
  addCommentDB,
  updateCommentDB,
  deleteCommentDB,
};

export { commentCreators };
