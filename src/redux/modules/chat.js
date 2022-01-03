import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";
import { socket } from "../../shared/socket";
import produce from "immer";

// initialState
const initialState = {
  list: [],
};

// action
const GET = "chat/GET";
const ADD = "chat/POST";
// const LOADING = "chat/LOADING";
// const NEXT = "chat/NEXT";

// action creater
export const getChatList = createAction(GET, (chatList) => ({ chatList }));
export const addChatRoom = createAction(ADD, (chatData) => ({ chatData }));
// export const loadingBoard = createAction(LOADING, (state) => ({ state }));
// export const nextBoard = createAction(NEXT, (state) => ({ state }));

// thunk
// 상대방에게 채팅걸기
export const makeRoomChatDB =
  (postId) =>
  async (dispatch, getState, { history }) => {
    await apis
      .chatRoom(postId)
      .then((res) => {
        localStorage.setItem("roomId", res.data.roomId);
        const nickname = localStorage.getItem("nickname");
        const datas = { ...res.data, nickname: nickname };
        dispatch(addChatRoom(datas));
        history.push(`/chatroom/${datas.roomName}`);
      })
      .catch((error) => {
        console.log(`불러오기 실패${error}`);
      });
  };

//채팅목록 정보 가져오기
export const getListChatDB =
  () =>
  async (dispatch, getState, { history }) => {
    await apis
      .chatRoomList()
      .then((res) => {
        console.log("요청 성공");
        console.log(res);
        dispatch(getChatList(res.data));
      })
      .catch((error) => {
        console.log(`불러오기 실패${error}`);
      });
  };

//채팅방 내용 가져오기
export const getContentChatDB =
  (roomId) =>
  async (dispatch, getState, { history }) => {
    await apis
      .chatMSG(roomId)
      .then((res) => {
        console.log("요청 성공");
        console.log(res);
        dispatch(getChatList(res));
      })
      .catch((error) => {
        console.log(`불러오기 실패${error}`);
      });
  };

//대화연결
export const connectChatDB =
  (roomId) =>
  async (dispatch, getState, { history }) => {
    await socket.chatConnect(() => {
      socket
        .chatRoomSubscribe(roomId)
        .then((res) => {
          console.log("요청 성공");
          console.log(res);
        })
        .catch((error) => {
          console.log(`불러오기 실패${error}`);
        });
    });
  };

// reducer
export default handleActions(
  {
    [GET]: (state, action) =>
      produce(state, (draft) => {
        // draft.page += 1
        draft.list.push(...action.payload.chatList);

        draft.list = draft.list.reduce((prev, now) => {
          if (prev.findIndex((a) => a.roomId === now.roomId) === -1) {
            console.log(draft.list);
            console.log(prev);
            console.log(now);
            return [...prev, now];
          } else {
            prev[prev.findIndex((a) => a.roomId === now.roomId)] = now;
            return prev;
          }
        }, []);
      }),

    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.chatData);
      }),
    // [LOADING]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.is_loading = action.payload.state;
    //   }),

    // [NEXT]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.is_next = action.payload.state;
    //   }),
  },
  initialState
);

const chatCreators = {
  makeRoomChatDB,
  getListChatDB,
  getContentChatDB,
  connectChatDB,
};

export { chatCreators };
