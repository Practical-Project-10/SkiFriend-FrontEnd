import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";
import axios from "axios";

import produce from "immer";

// initialState
const initialState = {
  list: [],
  likedPostList: [],
};

// action
const LOAD = "freeboard/LOAD";
const ADD = "freeboard/POST";
const UPDATE = "freeboard/UPDATE";
const DELETE = "freeboard/DELETE";

// action creater
export const loadBoard = createAction(LOAD, (postList, liked) => ({
  postList,
  liked,
}));
export const addBoard = createAction(ADD, (postData) => ({ postData }));
export const updateBoard = createAction(UPDATE, (postData) => ({ postData }));
export const deleteBoard = createAction(DELETE, (postId) => ({ postId }));

// thunk
export const addBoardDB = (data) => {
  return function (dispatch, getState, { history }) {
    dispatch(addBoard(data));
    dispatch(loadBoardDB());
  };
};

export const loadBoardDB =
  () =>
  async (dispatch, getState, { history }) => {
    const data = await apis.getPost();
    dispatch(loadBoard(data.data.posts, data.data.likedPostList));
  };

export const updateBoardDB =
  (post_id = null, content = {}, location, formData) =>
  async (dispatch, getState, { history }) => {
    try {
      if (!post_id) {
        console.log("게시물 정보가 없어요!");
        return;
      }
      const image_url = getState().image.preview;

      const accessToken = document.cookie.split("=")[1];

      const _post = {
        ...initialState,
        content: content,
        location: location,
        image: image_url,
      };

      axios({
        method: "put",
        url: `http://52.78.31.61/api/board/detail/${post_id}`,
        data: formData,
        _post,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-AUTH-TOKEN": `${accessToken}`,
        },
      })
        .then((response) => {
          window.alert("게시물 수정 완료");

          dispatch(
            updateBoard(post_id, { ...content, ...location, image: image_url })
          );
          // dispatch(imageActions.setPreview(null));
          history.replace("/");
        })
        .catch((err) => {
          window.alert("게시물 수정 실패");
          console.log(err);
        });
    } catch (err) {
      window.alert("");
      console.log(err);
    }
  };

export const deleteBoardDB =
  (postId) =>
  (dispatch, getState, { history }) => {
    apis.deletePost(postId).then((res) => {
      dispatch(deleteBoard(postId));
    });
  };

// reducer
export default handleActions(
  {
    [LOAD]: (state, action) => {
      return {
        ...state,
        list: action.payload.postList,
        likedPostList: action.payload.liked,
      };
    },
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.postData);
      }),
    [DELETE]: (state, action) => {
      return {
        ...state,
        list: state.list.filter((list) => list.id !== action.payload.postId),
      };
    },
  },
  initialState
);

const userCreators = {
  addBoardDB,
  loadBoardDB,
  updateBoardDB,
  deleteBoardDB,
};

export { userCreators };
