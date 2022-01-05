import produce from "immer";
import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";
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
    await axios
      .get("http://3.34.52.2:8080/main")
      // .hotPost
      .then((res) => {
        console.log(res);
        console.log(`hot게시물 가져오기 성공`);
        dispatch(loadPosts(res));
      })
      .catch((error) => {
        console.log(`게시물 가져오기 실패${error}`);
      });
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
