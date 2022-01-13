import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";
import { boardCreators as boardActions } from "./freeboard";
import produce from "immer";

// initialState
const initialState = {
  list: [],
};

// action
const GET_LIKE = "like/GET_LIKE";

// action creater
export const getLike = createAction(GET_LIKE, (likeList) => ({ likeList }));

// thunk
export const addLikeDB = (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.changeLike(postId);

      response && dispatch(getLike(response.data)) && 
      dispatch(boardActions.getOneBoardDB(postId));
    } catch(err) {
      console.log(`좋아요 변경 실패${err}`);
    }
  };

// reducer
export default handleActions(
  {
    [GET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.likeList;
      }),
  },
  initialState
);

const likeCreators = {
  addLikeDB,
};
export { likeCreators };
