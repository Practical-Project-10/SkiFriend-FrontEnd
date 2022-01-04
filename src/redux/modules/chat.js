import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";
import { socket } from "../../shared/socket";
import produce from "immer";

// initialState
const initialState = {
  chatList: [],
  roomList: [],
};

// action
const GET_CHATLIST = "chat/GET";
const GET_ROOMLIST = "chat/GET";
const ADD = "chat/POST";
// const LOADING = "chat/LOADING";
// const NEXT = "chat/NEXT";

// action creater
export const getChatList = createAction(GET_CHATLIST, (chatList) => ({
  chatList,
}));
export const getChatRoomList = createAction(GET_ROOMLIST, (roomList) => ({
  roomList,
}));
export const addChat = createAction(ADD, (chatData) => ({ chatData }));
// export const loadingBoard = createAction(LOADING, (state) => ({ state }));
// export const nextBoard = createAction(NEXT, (state) => ({ state }));

// thunk
// 채팅방 만들기(연락하기)
export const makeRoomChatDB =
  (postId) =>
  async (dispatch, getState, { history }) => {
    await apis
      .chatRoom(postId)
      .then((res) => {
        // const nickname = localStorage.getItem("nickname");
        // const datas = { ...res.data, nickname: nickname };
        // dispatch(addChat(datas));
        history.push(`/chatroom/${res.data.roomId}`);
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
        dispatch(getChatRoomList(res.data));
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
        dispatch(getChatList(res.data));
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
      socket.chatRoomSubscribe(roomId);
    });
  };

//메세지 보내기
export const sendChatDB =
  (roomId, message) =>
  async (dispatch, getState, { history }) => {
    const content = JSON.stringify({
      type: "TALK",
      rommId: roomId,
      message: message,
    });
    await socket.chatSendMSG(content);
  };

// reducer
export default handleActions(
  {
    [GET_CHATLIST]: (state, action) =>
      produce(state, (draft) => {
        // draft.page += 1
        draft.chatList.push(...action.payload.chatList);

        draft.chatList = draft.chatList.reduce((prev, now) => {
          if (prev.findIndex((a) => a.roomId === now.roomId) === -1) {
            return [...prev, now];
          } else {
            prev[prev.findIndex((a) => a.roomId === now.roomId)] = now;
            return prev;
          }
        }, []);
      }),

    [GET_ROOMLIST]: (state, action) =>
      produce(state, (draft) => {
        // draft.page += 1
        draft.roomList.push(...action.payload.roomList);

        draft.roomList = draft.roomList.reduce((prev, now) => {
          if (prev.findIndex((a) => a.roomId === now.roomId) === -1) {
            return [...prev, now];
          } else {
            prev[prev.findIndex((a) => a.roomId === now.roomId)] = now;
            return prev;
          }
        }, []);
      }),

    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.chatList.unshift(action.payload.chatData);
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
  addChat,
  makeRoomChatDB,
  getListChatDB,
  getContentChatDB,
  connectChatDB,
  sendChatDB,
};

export { chatCreators };
