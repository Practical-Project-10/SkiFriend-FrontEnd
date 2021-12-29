import { apis } from "../../shared/apis";
import { getOneBoardDB } from "./freeboard";

// thunk middleWare
export const addCommentDB =
  (postId, content) =>
  async (dispatch, getState, { history }) => {
    await apis
      .addPostComment(postId, content)
      .then((res) => {
        console.log("댓글달기 성공");
        console.log(res);
        dispatch(getOneBoardDB(postId));
      })
      .catch((e) => console.log(e));
  };

export const updateCommentDB =
  (postId, commentId, content) =>
  async (dispatch, getState, { history }) => {
    await apis
      .updatePostComment(commentId, content)
      .then((res) => {
        console.log("댓글수정 성공");
        dispatch(getOneBoardDB(postId));
      })
      .catch((error) => {
        console.log(`댓글수정 실패${error}`);
      });
  };

export const deleteCommentDB =
  (postId, commentId) =>
  async (dispatch, getState, { history }) => {
    await apis
      .deletePostComment(commentId)
      .then((res) => {
        dispatch(getOneBoardDB(postId));
        console.log("댓글 삭제");
      })
      .catch((error) => {
        console.log(`댓글삭제 실패${error}`);
      });
  };

const commentCreators = {
  addCommentDB,
  updateCommentDB,
  deleteCommentDB,
};

export { commentCreators };
