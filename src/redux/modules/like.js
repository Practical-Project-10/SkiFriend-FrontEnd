import { apis } from "../../shared/apis";
import { boardCreators as boardActions } from "./freeboard";

// thunk
export const addLikeDB =
  (postId) =>
  async (dispatch, getState, { history }) => {
    await apis
      .changeLike(postId)
      .then((res) => {
        dispatch(boardActions.getOneBoardDB(postId));
      })
      .catch((error) => {
        console.log(`좋아요 변경 실패${error}`);
      });
  };

export const addListLikeDB =
  (postId, skiresort) =>
  async (dispatch, getState, { history }) => {
    await apis
      .changeLike(postId)
      .then((res) => {
        console.log(`좋아요 성공`);
        dispatch(boardActions.loadBoardDB(skiresort));
      })
      .catch((error) => {
        console.log(`좋아요 변경 실패${error}`);
      });
  };

const likeCreators = {
  addLikeDB,
  addListLikeDB,
};
export { likeCreators };
