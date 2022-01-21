import produce from "immer";
import { handleActions, createAction } from "redux-actions";
import axios from "axios";
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
      // http://3.34.19.50:8080/    https://seongeunyang.shop
      const response = await axios.get("https://seongeunyang.shop/main");
      response && dispatch(loadPosts(response));
    } catch (err) {
      // console.log(`게시물 가져오기 실패${err}`);
    }
  };

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.postList;
      }),
  },
  initialState
);

const mainCreators = {
  hotPostsDB,
  loadPosts,
};
export { mainCreators };
