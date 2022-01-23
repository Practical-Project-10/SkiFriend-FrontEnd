import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/apis";

//action
const GET_SHORTS = "shorts/GET_SHORTS";
const ADD_SHORTS = "shorts/ADD_SHORTS";
const UPDATE_SHORTS = "shorts/UPDATE_SHORTS";
const DELETE_SHORTS = "shorts/DELETE_SHORTS";
const GET_MY_SHORTS = "shorts/GET_MY_SHORTS";
const COMMENT_COUNT = "shorts/COMMENT_COUNT";

// acrtion creators
const getShorts = createAction(GET_SHORTS, (shortsList, is_like) => ({
  shortsList,
  is_like,
}));
const addShorts = createAction(ADD_SHORTS, (shortsDatas) => ({ shortsDatas }));
const updateShorts = createAction(UPDATE_SHORTS, (shortsId, shortsData) => ({
  shortsId,
  shortsData,
}));
const deleteShorts = createAction(DELETE_SHORTS, (shortsId) => ({ shortsId }));
const getMyShorts = createAction(GET_MY_SHORTS, (myList) => ({ myList }));
const CommentCount = createAction(COMMENT_COUNT, (state, commentCnt) => ({
  state,
  commentCnt,
}));

// initialState
const initialState = {
  shortsList: {},
  myShortsList: [],
};

// middlewares
// 동영상 조회
const getShortsDB = () => {
  return async function (dispatch, getState, { history }) {
    const login_userId = localStorage.getItem("userId");

    try {
      const response = await apis.shortsRandomList();
      const shortsId = response.data.shortsId;
      const likeUsers = response.data.shortsLikeResponseDtoList;
      const contain_me = likeUsers.find(
        (l) => l.userId === Number(login_userId)
      );
      const is_like = contain_me ? true : false;
      response && dispatch(getShorts(response.data, is_like));
      if (response) {
        history.push(`/shorts/${shortsId}`);
      } else {
        history.push(`/shorts`);
      }
      // dispatch(likeCreators.getShortsLike(is_like));
    } catch (err) {
      const is_login =
        localStorage.getItem("is_login") === "true" ? true : false;
      const ask = window.confirm(
        "등록된 게시물이 없습니다. 게시물을 작성하러 가시겠습니까?"
      );
      if (ask) {
        if (is_login) {
          return history.push(`/shortsupload`);
        } else {
          if (is_login) {
            return history.push(`/`);
          } else {
            const login_ask = window.confirm(
              "게시물 작성은 회원만 가능합니다. 로그인 페이지로 이동하시겠습니까?"
            );
            if (login_ask) {
              return history.push(`login`);
            } else {
              return history.push(`/`);
            }
          }
        }
      } else {
        return history.push(`/`);
      }
    }
  };
};

//동영상 작성
const addShortsDB = (videoFile, title) => {
  return async function (dispatch, getState, { history }) {
    let formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append(
      "requestDto",
      new Blob([JSON.stringify(title)], { type: "application/json" })
    );

    try {
      const response = await apis.shortsUpload(formData);
      window.alert("shorts가 정상적으로 등록되었습니다.");
      response && dispatch(addShorts(response.data));
      history.push(`/shorts`);
    } catch (err) {
      // console.log(err);
    }
  };
};

//동영상 수정
const updateShortsDB = (shortsId, title) => {
  return async function (dispatch, getState, { history }) {
    let formData = new FormData();
    formData.append(
      "requestDto",
      new Blob([JSON.stringify(title)], { type: "application/json" })
    );
    try {
      const response = await apis.shortsUpdate(shortsId, formData);
      response && history.push("/myPage");
      window.alert("shorts가 정상적으로 수정되었습니다.");
      dispatch(updateShorts(shortsId, response.data));
    } catch (err) {
      // console.log(err);
    }
  };
};

//동영상 삭제
const deleteShortsDB = (shortsId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.shortsDelete(shortsId);
      response && dispatch(deleteShorts(shortsId));
    } catch (err) {
      // console.log(err);
    }
  };
};

//내 동영상 정보
const myShortsDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.myShortsList();
      response && dispatch(getMyShorts(response.data));
    } catch (err) {
      // console.log(err);
    }
  };
};

// reducer
export default handleActions(
  {
    [GET_SHORTS]: (state, action) =>
      produce(state, (draft) => {
        const likeUserList = action.payload.shortsList;
        draft.shortsList = { ...draft.shortsList, ...likeUserList };
        draft.shortsList.shortsLikeCnt = likeUserList.shortsLikeResponseDtoList.length;
        draft.shortsList["is_like"] = action.payload.is_like;
      }),

    [ADD_SHORTS]: (state, action) =>
      produce(state, (draft) => {
        draft.shortsList = action.payload.shortsDatas;
        draft.myShortsList.push(action.payload.shortsDatas);
      }),

    [UPDATE_SHORTS]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.myShortsList.findIndex(
          (l) => l.shortsId === Number(action.payload.shortsId)
        );
        draft.myShortsList[idx] = action.payload.shortsData;
      }),

    [DELETE_SHORTS]: (state, action) =>
      produce(state, (draft) => {
        draft.myShortsList = state.myShortsList.filter(
          (l) => l.shortsId !== action.payload.shortsId
        );
      }),

    [GET_MY_SHORTS]: (state, action) =>
      produce(state, (draft) => {
        draft.myShortsList.push(...action.payload.myList);
      }),

    [COMMENT_COUNT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.state);
        if (action.payload.state) {
          draft.shortsList.shortsCommentCnt = action.payload.commentCnt;
        } else {
          draft.shortsList.shortsCommentCnt -= 1;
        }
      }),
  },
  initialState
);

const shortsActions = {
  getShorts,
  CommentCount,
  getShortsDB,
  addShortsDB,
  updateShortsDB,
  deleteShortsDB,
  myShortsDB,
};

export { shortsActions };
