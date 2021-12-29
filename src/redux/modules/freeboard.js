import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";
import axios from "axios";
import produce from "immer";
import { commentCreators as commentActions } from "./comment";

// initialState
const initialState = {
  list: [],
  detail: [],
};

// action
const LOAD = "freeboard/LOAD";
const ADD = "freeboard/POST";
const GETONE = "freeboard/GETONE";
const UPDATE = "freeboard/UPDATE";
const DELETE = "freeboard/DELETE";

// action creater
export const loadBoard = createAction(LOAD, (postList) => ({
  postList,
}));
export const addBoard = createAction(ADD, (postData) => ({ postData }));
export const getOneBoard = createAction(GETONE, (postData) => ({ postData }));
export const updateBoard = createAction(UPDATE, (postData) => ({ postData }));
export const deleteBoard = createAction(DELETE, (postId) => ({ postId }));

// thunk
// 자유 게시판 목록 불러오기
export const loadBoardDB =
  (skiResort) =>
  async (dispatch, getState, { history }) => {
    await apis
      .getFreePost(skiResort)
      .then((res) => {
        dispatch(loadBoard(res.data));
      })
      .catch((error) => {
        console.log(`불러오기 실패${error}`);
      });
  };

// 게시글 등록하기
export const addBoardDB =
  (skiResort, image, datas) =>
  async (dispatch, getState, { history }) => {
    // token
    const accessToken = document.cookie.split("=")[1];
    const token = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${accessToken}`,
      },
    };

    let formdata = new FormData();
    formdata.append("image", image);
    formdata.append(
      "requestDto",
      new Blob([JSON.stringify(datas)], { type: "application/json" })
    );
    //formdata 객체 내용 확인
    for (let pair of formdata.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    await axios
      .post(
        `http://13.125.249.172/board/${skiResort}/freeBoard`,
        formdata,
        token
      )
      // await apis
      //   .writeFreePost(skiResort, formdata)
      .then((res) => {
        console.log("등록 완료~");
        dispatch(addBoard(res.config.data));
        history.push(`/freeboardlist/${skiResort}`);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(`오류 발생!${error}`);
      });
  };

export const getOneBoardDB =
  (postId) =>
  async (dispatch, getState, { history }) => {
    await apis
      .getOneFreePost(postId)
      .then((res) => {
        console.log(res);
        console.log("데이터 가져오기 성공");
        dispatch(getOneBoard(res.data));
        // dispatch(commentActions.loadComment(res.data));
      })
      .catch((error) => {
        console.log(`오류 발생!${error}`);
      });
  };

export const updateBoardDB =
  (skiResort, postId, image, datas) =>
  async (dispatch, getState, { history }) => {
    if (!postId) {
      console.log("게시물 정보가 없어요!");
      return;
    }
    // token
    const accessToken = document.cookie.split("=")[1];
    const token = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${accessToken}`,
      },
    };

    let formdata = new FormData();
    formdata.append("image", image);
    formdata.append(
      "requestDto",
      new Blob([JSON.stringify(datas)], { type: "application/json" })
    );
    //formdata 객체 내용 확인
    for (let pair of formdata.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    await axios
      .put(`http://13.125.249.172/board/freeBoard/${postId}`, formdata, token)
      // await apis
      //   .updateFreePost(postId, formdata)
      .then((res) => {
        console.log("수정 완료~");
        dispatch(updateBoard(res.config.data));
        history.push(`/freeboarddetail/${skiResort}/${postId}`);
      })
      .catch((error) => {
        console.log(`오류 발생!${error}`);
      });
  };

export const deleteBoardDB =
  (postId, skiresort) =>
  async (dispatch, getState, { history }) => {
    await apis
      .deleteFreePost(postId)
      .then((res) => {
        console.log("삭제 성공!!");
        window.alert("게시물이 정상적으로 삭제되었습니다.");
        dispatch(deleteBoard(postId));
        history.push(`/freeboardlist/${skiresort}`);
      })
      .catch((error) => {
        console.log(`삭제요청 실패${error}`);
      });
  };

// reducer
export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.postList);

        draft.list = draft.list.reduce((prev, now) => {
          if (prev.findIndex((a) => a.postId === now.postId) === -1) {
            return [...prev, now];
          } else {
            prev[prev.findIndex((a) => a.postId === now.postId)] = now;
            return prev;
          }
        }, []);
      }),

    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.postData);
      }),

    [GETONE]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = action.payload.postData;
      }),

    [UPDATE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.postId === Number(action.payload.postId)
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.detail };
      }),

    [DELETE]: (state, action) => {
      return {
        ...state,
        list: state.list.filter(
          (list) => list.postId !== action.payload.postId
        ),
      };
    },
  },
  initialState
);

const boardCreators = {
  addBoardDB,
  loadBoardDB,
  getOneBoardDB,
  updateBoardDB,
  deleteBoardDB,
};

export { boardCreators };
