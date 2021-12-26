import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/apis";

// ACTIONS
// const LOAD = "carpool/LOAD";
const ADD = "carpool/ADD";
const UPDATE = "carpool/UPDATE";
const DELETE = "carpool/DELETE";
const SWITCH_PLACES = "carpool/SWITCH_PLACES";

//initialState
const initialState = {
  list: [],
  startLocName: "",
  endLocName: "",
};

//action creator
const addCarpool = createAction(ADD, (carpoolData) => ({ carpoolData }));
const updateCarpool = createAction(UPDATE, (carpoolData) => ({ carpoolData }));
const deleteCarpool = createAction(DELETE, (carpoolId) => ({ carpoolId }));
const switchPlaces = createAction(SWITCH_PLACES, (placeData) => ({
  placeData,
}));

//middleware

const addCarpoolDB =
  (skiResort, datas) =>
  async (dispatch, getState, { history }) => {
    const data = await apis.writeCarpool(skiResort, datas);
    dispatch(addCarpool(data));
    //   dispatch(loadBoardDB()); 이부분 어떻게 해야할지 잘 모르겠습니다ㅠㅠ
  };

const updateCarpoolDB =
  (carpoolId, datas) =>
  async (dispatch, getState, { history }) => {
    if (!carpoolId) {
      console.log("카풀 정보가 없어요!");
      return;
    }
    const data = await apis.updateCarpool(carpoolId, datas);
    dispatch(updateCarpool(data));
    //   dispatch(loadBoardDB()); 이부분도요!
  };

const deleteCarpoolDB =
  (carpoolId) =>
  async (dispatch, getState, { history }) => {
    apis.deleteCarpool(carpoolId).then((res) => {
      dispatch(deleteCarpool(carpoolId));
    });
  };

//reducer
export default handleActions(
  {
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.carpoolData);
      }),
    [UPDATE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (c) => c.id === Number(action.payload.carpoolId)
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.carpool };
      }),
    [DELETE]: (state, action) => {
      return {
        ...state,
        list: state.list.filter((list) => list.id !== action.payload.carpoolId),
      };
    },
    //위치바꾸기 불완전함!
    [SWITCH_PLACES]: (state, action) =>
      produce(state, (draft) => {
        draft.startLocName = action.payload.startLocName;
        draft.endLocName = action.payload.endLocName;
      }),
  },
  initialState
);

const carpoolCreators = {
  addCarpoolDB,
  updateCarpoolDB,
  deleteCarpoolDB,
  switchPlaces,
};

export { carpoolCreators };
