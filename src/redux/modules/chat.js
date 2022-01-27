import { handleActions, createAction } from "redux-actions";
import { apis } from "../../shared/apis";
import produce from "immer";

// initialState
const initialState = {
  chatList: [],
  roomList: [],
  profileList: [],
  phoneInfoList: [],
  roomInfoList: [],
  alarm: [],
};

// action
const GET_CHATLIST = "chat/GET_CHATLIST";
const GET_ROOMLIST = "chat/GET_ROOMLIST";
const GET_PROFILELIST = "chat/GET_PROFILELIST";
const GET_PHONE_INFO = "chat/GET_PHONE_INFO";
const GET_ROOM_INFO = "chat/GET_ROOM_INFO";
const ADD = "chat/ADD";
const GET_ALARM = "chat/GET_ALARM";
const DELETE_ALARM = "chat/DELETE_ALARM";
const RESET = "chat/RESET";

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
export const getPhoneInfo = createAction(GET_PHONE_INFO, (phoneInfo) => ({
  phoneInfo,
}));
export const getRoomInfo = createAction(GET_ROOM_INFO, (roomInfo) => ({
  roomInfo,
}));
export const addChat = createAction(ADD, (chatData) => ({ chatData }));
const getAlarm = createAction(GET_ALARM, (newChat) => ({ newChat }));
const deleteAlarm = createAction(DELETE_ALARM, () => ({}));
const reset = createAction(RESET, () => ({}));

// thunk
// 채팅방 만들기(연락하기)
export const makeRoomChatDB =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.chatRoom(postId);
      response &&
        history.push(
          `/chatroom/${response.data.roomId}/${response.data.roomName}`
        );
    } catch (err) {
      window.alert("이미 나간 채팅방이므로 연락하기가 불가능합니다.");
    }
  };

//채팅목록 정보 가져오기
export const getListChatDB =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.chatRoomList();

      response && dispatch(getChatRoomList(response.data));
    } catch (err) {}
  };

//채팅방 내용 가져오기//
export const getContentChatDB =
  (roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.chatMSG(roomId);
      response && dispatch(getChatList(response.data));
    } catch (err) {}
  };

//프로필 정보
export const getProfileInfoDB =
  (roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.chatShowProfile(roomId);

      response && dispatch(getProfileList(response.data));
    } catch (err) {}
  };

//전화번호 가져오기
export const getPhoneNumDB =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.chatPhoneNum();

      response && dispatch(getPhoneInfo(response.data));
    } catch (err) {}
  };

//대화방 삭제
export const chatRoomDeleteDB =
  (roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.chatRoomDelete(roomId);
      response && dispatch(getListChatDB());
    } catch (err) {}
  };

//카풀정보 가져오기
export const getRoomInfoDB =
  (roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.chatRoomInfo(roomId);

      response && dispatch(getRoomInfo(response.data));
    } catch (err) {}
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

    [GET_PHONE_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.phoneInfoList = action.payload.phoneInfo;
      }),

    [GET_ROOM_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.roomInfoList = action.payload.roomInfo;
      }),

    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.chatList.unshift(action.payload.chatData);
      }),

    [GET_ALARM]: (state, action) =>
      produce(state, (draft) => {
        draft.alarm.push(action.payload.newChat);
      }),

    [DELETE_ALARM]: (state, action) =>
      produce(state, (draft) => {
        draft.alarm = [];
      }),
    [RESET]: (state, action) =>
      produce(state, (draft) => {
        draft.chatList = [];
      }),
  },
  initialState
);

const chatCreators = {
  addChat,
  getPhoneInfo,
  getRoomInfo,
  getAlarm,
  deleteAlarm,
  reset,
  makeRoomChatDB,
  getListChatDB,
  getContentChatDB,
  getProfileInfoDB,
  getPhoneNumDB,
  getRoomInfoDB,
  chatRoomDeleteDB,
};

export { chatCreators };
