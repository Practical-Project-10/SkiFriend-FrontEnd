import { apis } from "../components/shared/apis";
import { handleActions } from "redux-actions";

// initialState
const initialState = {
  list: [],
};

// action
// const LOAD = "like/LOAD";
const ADD = "like/LOAD";
const DEL = "like/DEL";

// action create
// const loadLike = createAction(LOAD, (like) => ({ like }));
// const addLike = createAction(ADD, (like) => ({ like }));
// const delLike = createAction(DEL, (like) => ({ like }));

// thunk
export const addLikeDB = (postId) => {
  apis.changeLike(postId).then((res) => {
    console.log(res);
  });
};

export const delLikeDB = () => {};

// reducer
export default handleActions(
  {
    [ADD]: (state, action) => {
      return {
        ...state,
        list: action.payload.like,
      };
    },
    [DEL]: (state, action) => {
      return {
        ...state,
        list: action.payload.like,
      };
    },
  },
  initialState
);
