import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";
import { boardCreators as boardActions } from "./freeboard";
import { shortsActions } from "./shorts";
import produce from "immer";

// initialState
const initialState = {
  list: [],
  shortsLikeList: "",
};

// action
const GET_LIKE = "like/GET_LIKE";
const GET_SHORTS_LIKE = "like/GET_SHORTS_LIKE";

// action creater
export const getLike = createAction(GET_LIKE, (likeList) => ({ likeList }));
export const getShortsLike = createAction(GET_SHORTS_LIKE, (likeList) => ({
  likeList,
}));

// thunk
//자유게시글 좋아요
export const addLikeDB =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.changeLike(postId);
      response &&
        dispatch(getLike(response.data)) &&
        dispatch(boardActions.getOneBoardDB(postId));
    } catch (err) {
      // console.log(`좋아요 변경 실패${err}`);
    }
  };

//동영상 좋아요
export const addShortsLikeDB =
  (shortsId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.shortsLike(shortsId);
      const state = response.data;
      console.log(state);
      response &&
        dispatch(getShortsLike(state)) &&
        dispatch(shortsActions.likeCount(state));
    } catch (err) {
      // console.log(`좋아요 변경 실패${err}`);
    }
  };

// reducer
export default handleActions(
  {
    [GET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.likeList;
      }),
    [GET_SHORTS_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.shortsLikeList = action.payload.likeList;
      }),
  },
  initialState
);

const likeCreators = {
  addLikeDB,
  addShortsLikeDB,
};
export { likeCreators };
