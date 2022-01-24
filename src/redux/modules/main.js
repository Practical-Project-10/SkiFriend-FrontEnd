import produce from "immer";
import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";

// initialState
const initialState = {
  list: [],
  rank: [],
};

// action
const LOAD = "main/LOAD";

// action creater
export const loadPosts = createAction(LOAD, (postList) => ({
  postList,
}));

// thunk
export const hotPostsDB =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.hotPosts();
      response && dispatch(loadPosts(response));
    } catch (err) {
    }
  };

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.postList.data;
      }),
  },
  initialState
);

const mainCreators = {
  hotPostsDB,
  loadPosts,
};
export { mainCreators };
