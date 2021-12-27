import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/apis";

//action
const SET_CARPOOL = 'SET_CARPOOL';
const ADD_CARPOOL = 'ADD_CARPOOL';
const EDIT_CARPOOL = 'EDIT_CARPOOL';
const DELETE_CARPOOL = 'DELETE_CARPOOL';

// acrtion creators
const setCarpool = createAction(SET_CARPOOL, (list) => ({list}));
const addCarpool = createAction(ADD_CARPOOL, (carpool) => ({carpool}));
const editCarpool = createAction(EDIT_CARPOOL, (postId, carpool) => ({postId, carpool}));
const deleteCarpool = createAction(DELETE_CARPOOL, (postId) => ({postId}));

// middlewares
const getCarpoolDB = (skiResort) => {
  return async function(dispatch) {
    console.log(skiResort)

    try {
      const response = await apis.getCarpool(skiResort);
      const carpool_list = response.data;
      console.log(response.data);

      response && dispatch(setCarpool(carpool_list));
    } catch(err) {
      console.log(err);
    }
  };
};

const addCarpoolDB = (skiResort, carpool) => {
  return async function(dispatch, getState, {history}) {
    console.log(skiResort, carpool)

    const carpool_form = {
      carpoolType: carpool.carpoolType,
      startLocation: carpool.startLocation,
      endLocation: carpool.endLocation,
      date: carpool.date,
      time: carpool.time,
      price: carpool.price,
      memberNum: carpool.memberNum,
      notice: carpool.notice,
    }

    try {
      await apis.addCarpool(skiResort, carpool_form);

      history.push('/');
    } catch(err) {
      console.log(err);
    }
  }
}

const editCarpoolDB = (skiResort, carpool) => {
  return async function(dispatch, getState, {history}) {
    console.log(skiResort, carpool)

    const carpool_form = {
      carpoolType: carpool.carpoolType,
      startLocation: carpool.startLocation,
      endLocation: carpool.endLocation,
      date: carpool.date,
      time: carpool.time,
      price: carpool.price,
      memberNum: carpool.memberNum,
      notice: carpool.notice,
    }

    try {
      await apis.editCarpool(skiResort, carpool_form);

      history.goBack();
    } catch(err) {
      console.log(err);
    }
  };
};

const deleteCarpoolDB = (postId) => {
  return async function(dispatch, getState, {history}) {
    console.log(postId);

    try {
      await apis.deleteCarpool(postId);

      history.push('/');
    } catch(err) {
      console.log(err);
    }
  }
}

// initialState
const initialState = {
  list: [
    {
      postId: '',
      userId: '',
      nickname: '',
      createdAt: '',
      carpoolType: '',
      startLocation: '',
      endLocation: '',
      skiResort: '',
      date: '',
      time: '',
      price: '',
      memberNum: '',
      notice: '',
      status: true,
    }
  ]
}

// reducer
export default handleActions(
  {
    [SET_CARPOOL]: (state, action) => 
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),

    // [ADD_CARPOOL]: (state, action) => 
    //   produce(state, (draft) => {
    //     draft.list.push(action.payload.carpool);
    //   }),

    // [EDIT_CARPOOL]: (state, action) => 
    //   produce(state, (draft) => {
    //     const idx = draft.list.findIndex(l => l.postId === action.payload.postId)
    //     console.log(idx);

    //     draft.list[idx] = {...draft.list[idx], ...action.payload.carpool};
    //   }),

    // [DELETE_CARPOOL]: (state, action) => 
    //   produce(state, (draft) => {
    //     let deleted_list = draft.list.filter(
    //       (l) => l.postId !== action.payload.postId
    //     );

    //     draft.list = deleted_list;
    //   }),
  },
  initialState
)

const carpoolActions = {
  setCarpool,
  addCarpool,
  editCarpool,
  deleteCarpool,
  getCarpoolDB,
  addCarpoolDB,
  editCarpoolDB,
  deleteCarpoolDB,
}

export {carpoolActions};