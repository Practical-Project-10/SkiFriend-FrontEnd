import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";
import { socket } from "../../shared/socket";
import produce from "immer";

// initialState
const initialState = {
  chatList: [],
  roomList: [],
  profileList: [],
};

// action
const GET_CHATLIST = "chat/GET_CHATLIST";
const GET_ROOMLIST = "chat/GET_ROOMLIST";
const GET_PROFILELIST = "chat/GET_PROFILELIST";
const ADD = "chat/ADD";

// action creater
export const getChatList = createAction(GET_CHATLIST, (chatList) => ({
  chatList,
}));
export const getChatRoomList = createAction(GET_ROOMLIST, (roomList) => ({
  roomList,
}));
export const getProfileList = createAction(GET_PROFILELIST, (profile) => ({
  profile,
}));
export const addChat = createAction(ADD, (chatData) => ({ chatData }));

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
        history.push(`/chatroom/${res.data.roomId}/${res.data.longRoomId}`);
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
        dispatch(getChatList(...res.data));
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

//프로필 정보
export const getProfileInfoDB =
  (longRoomId) =>
  async (dispatch, getState, { history }) => {
    await apis
      .chatShowProfile(longRoomId)
      .then((res) => {
        dispatch(getProfileList(res.data));
      })
      .catch((error) => {
        console.log(`불러오기 실패${error}`);
      });
  };

// reducer
export default handleActions(
  {
    [GET_CHATLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.chatList = action.payload.chatList;
      }),

    [GET_ROOMLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList = action.payload.roomList;
      }),

    [GET_PROFILELIST]: (state, action) =>
      produce(state, (draft) => {
        draft.profileList = action.payload.profile;
      }),

    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.chatList.unshift(action.payload.chatData);
      }),
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
  getProfileInfoDB,
};

export { chatCreators };
