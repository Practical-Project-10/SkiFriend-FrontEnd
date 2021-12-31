import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/apis";

//action
const GET_CARPOOL = "GET_CARPOOL";
const ADD_CARPOOL = "ADD_CARPOOL";
const EDIT_CARPOOL = "EDIT_CARPOOL";
const DELETE_CARPOOL = "DELETE_CARPOOL";
const GET_MYCARPOOL = "GET_MYCARPOOL";

// acrtion creators
const getCarpool = createAction(GET_CARPOOL, (list) => ({ list }));
const addCarpool = createAction(ADD_CARPOOL, (carpool) => ({ carpool }));
const editCarpool = createAction(EDIT_CARPOOL, (postId, carpool) => ({
  postId,
  carpool,
}));
const deleteCarpool = createAction(DELETE_CARPOOL, (postId) => ({ postId }));
const getMyCarpool = createAction(GET_MYCARPOOL, (myCarpools) => ({
  myCarpools,
}));

// middlewares
const getCarpoolDB = (skiResort) => {
  return async function (dispatch) {
    console.log(skiResort);
    console.log("성공");
    try {
      const response = await apis.getCarpool(skiResort);
      const carpool_list = response.data;
      console.log(response.data);

      response && dispatch(getCarpool(carpool_list));
    } catch (err) {
      console.log(err);
    }
  };
};

const addCarpoolDB = (skiResort, carpool) => {
  return async function (dispatch, getState, { history }) {
    console.log(skiResort, carpool);

    const carpool_form = {
      carpoolType: carpool.carpoolType,
      startLocation: carpool.startLocation,
      endLocation: carpool.endLocation,
      date: carpool.date,
      time: carpool.time,
      title: carpool.title,
      price: carpool.price,
      memberNum: carpool.memberNum,
      notice: carpool.notice,
    };

    try {
      const response = await apis.addCarpool(skiResort, carpool_form);
      console.log(response.data);

      response && history.push(`/carpool/${skiResort}`);
      dispatch(addCarpool(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

const editCarpoolDB = (postId, carpool) => {
  return async function (dispatch, getState, { history }) {
    console.log(postId, carpool);

    const carpool_form = {
      carpoolType: carpool.carpoolType,
      startLocation: carpool.startLocation,
      endLocation: carpool.endLocation,
      date: carpool.date,
      time: carpool.time,
      title: carpool.title,
      price: carpool.price,
      memberNum: carpool.memberNum,
      notice: carpool.notice,
    };

    try {
      const response = await apis.editCarpool(postId, carpool_form);

      response && history.goBack();
      dispatch(editCarpool(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteCarpoolDB = (skiResort, postId) => {
  return async function (dispatch, getState, { history }) {
    console.log(skiResort, postId);

    try {
      await apis.deleteCarpool(postId);

      dispatch(deleteCarpool(postId));
      history.push(`/carpool/${skiResort}`);
    } catch (err) {
      console.log(err);
    }
  };
};

const completeCarpoolDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      await apis.completeCarpool(postId);
      console.log("모집완료");
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterCarpoolDB =
  (skiResort, datas) =>
  async (dispatch, getState, { history }) => {
    await apis
      .filterCarpool(skiResort, datas)
      .then((res) => {
        console.log("필터요청 성공");
        console.log(res);
        // dispatch(getCarpool(res.data));
        history.push(`/carpool/${skiResort}`);
      })
      .catch((error) => {
        console.log(`불러오기 실패${error}`);
      });
  };

const getMyCarpoolDB = () => {
  return async function (dispatch, getState, { history }) {
    console.log("내가 쓴 카풀");
    try {
      const response = await apis.getMyCarpool();
      console.log(response.data);

      response && dispatch(getMyCarpool(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

// initialState
const initialState = {
  list: [],
  myList: [],
};

// reducer
export default handleActions(
  {
    [GET_CARPOOL]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),

    [ADD_CARPOOL]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.carpool);
        draft.list.unshift(action.payload.carpool);
      }),

    [EDIT_CARPOOL]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (l) => l.postId === action.payload.postId
        );
        console.log(idx);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.carpool };
      }),

    [DELETE_CARPOOL]: (state, action) =>
      produce(state, (draft) => {
        let deleted_list = draft.list.filter(
          (l) => l.postId !== action.payload.postId
        );

        draft.list = deleted_list;
      }),

    [GET_MYCARPOOL]: (state, action) =>
      produce(state, (draft) => {
        draft.myList = action.payload.myCarpools;
      }),
  },
  initialState
);

const carpoolActions = {
  getCarpool,
  addCarpool,
  editCarpool,
  deleteCarpool,
  getCarpoolDB,
  addCarpoolDB,
  editCarpoolDB,
  deleteCarpoolDB,
  completeCarpoolDB,
  filterCarpoolDB,
  getMyCarpoolDB,
};

export { carpoolActions };
