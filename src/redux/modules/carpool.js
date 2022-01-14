import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/apis";

//action
const GET_CARPOOL = "GET_CARPOOL";
const ADD_CARPOOL = "ADD_CARPOOL";
const EDIT_CARPOOL = "EDIT_CARPOOL";
const DELETE_CARPOOL = "DELETE_CARPOOL";
const FILTER_CARPOOL = "FILTER_CARPOOL";
const GET_MYCARPOOL = "GET_MYCARPOOL";
const COMPLETE_CARPOOL = "COMPLETE_CARPOOL";
const IMAGE_RESORT = "IMAGE_RESORT";
const IS_LOADING = "IS_LOADING";
const IS_NEXT = "IS_NEXT";
const RESET = "RESET";

// acrtion creators
const getCarpool = createAction(GET_CARPOOL, (skiResort, list) => ({
  skiResort,
  list,
}));
const addCarpool = createAction(ADD_CARPOOL, (skiResort, carpool) => ({
  skiResort,
  carpool,
}));
const editCarpool = createAction(
  EDIT_CARPOOL,
  (skiResort, page, postId, carpool) => ({
    skiResort,
    page,
    postId,
    carpool,
  })
);
const deleteCarpool = createAction(
  DELETE_CARPOOL,
  (skiResort, page, postId) => ({
    skiResort,
    page,
    postId,
  })
);
const getMyCarpool = createAction(GET_MYCARPOOL, (myCarpools) => ({
  myCarpools,
}));
const completeMycarpool = createAction(
  COMPLETE_CARPOOL,
  (skiResort, page, postId, carpool) => ({
    skiResort,
    page,
    postId,
    carpool,
  })
);
const filterCarpool = createAction(FILTER_CARPOOL, (carpool) => ({ carpool }));
const imageResort = createAction(IMAGE_RESORT, (url) => ({ url }));
const isLoading = createAction(IS_LOADING, (state) => ({ state }));
const isNext = createAction(IS_NEXT, (state) => ({ state }));
const reset = createAction(RESET, (skiResort) => ({ skiResort }));

// middlewares
const imageResortDB = (skiResort) => {
  return async function (dispatch) {
    try {
      const response = await apis.imageResort(skiResort);
      response && dispatch(imageResort(response.data.resortImg));
    } catch (err) {}
  };
};

const getCarpoolDB = (skiResort, page) => {
  return async function (dispatch) {
    dispatch(isLoading(true));
    try {
      const response = await apis.getCarpool(skiResort, page);
      // response && dispatch(getCarpool(skiResort, response.data));
      if (response.data.length === 4) {
        dispatch(getCarpool(skiResort, response.data));
        dispatch(isNext(true));
      } else {
        dispatch(getCarpool(skiResort, response.data));
        dispatch(isNext(false));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const addCarpoolDB = (skiResort, carpool) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.addCarpool(skiResort, carpool);
      response && history.push(`/carpool/${skiResort}`);
      dispatch(addCarpool(skiResort, response.data));
    } catch (err) {
      window.alert("모든 사항을 기재해 주세요.");
    }
  };
};

const editCarpoolDB = (skiResort, postId, carpool) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.editCarpool(postId, carpool);
      response && history.goBack();
      dispatch(editCarpool(skiResort, postId, response.data));
    } catch (err) {}
  };
};

const deleteCarpoolDB = (skiResort, page, postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      await apis.deleteCarpool(postId);
      dispatch(deleteCarpool(skiResort, page, postId));
      // history.push(`/carpool/${skiResort}`);
    } catch (err) {
      console.log(err);
    }
  };
};

const completeCarpoolDB = (skiResort, page, postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.completeCarpool(postId);

      response &&
        dispatch(completeMycarpool(skiResort, page, postId, response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

const filterCarpoolDB = (skiResort, form) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.filterCarpool(skiResort, form);
      if (response.data.length === 0) {
        window.alert("필터에 맞는 정보가 없습니다");
        return null;
      } else {
        dispatch(filterCarpool(response.data));
        history.push(`/filter/${skiResort}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const getMyCarpoolDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.getMyCarpool();
      response && dispatch(getMyCarpool(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

// initialState
const initialState = {
  resortImg: "",
  list: {
    HighOne: [],
    YongPyong: [],
    VivaldiPark: [],
    Phoenix: [],
    WellihilliPark: [],
    Konjiam: [],
  },
  myList: [],
  filterList: [],
  page: 1,
  is_loading: false,
  is_next: false,
};

// reducer
export default handleActions(
  {
    [GET_CARPOOL]: (state, action) =>
      produce(state, (draft) => {
        const skiResort = action.payload.skiResort;
        draft.is_loading = false;
        draft.page += 1;
        draft.list[skiResort].push(...action.payload.list);
      }),

    [ADD_CARPOOL]: (state, action) =>
      produce(state, (draft) => {
        // const skiResort = action.payload.skiResort;
        // draft.list[skiResort].unshift(action.payload.carpool);
      }),

    [EDIT_CARPOOL]: (state, action) =>
      produce(state, (draft) => {
        const skiResort = action.payload.skiResort;
        const page = action.payload.page;
        const idx = draft.list[skiResort].findIndex(
          (l) => l.postId === Number(action.payload.postId)
        );
        draft.list[skiResort][idx] = {
          ...draft.list[skiResort][idx],
          ...action.payload.carpool,
        };

        if(page === "myPage") {
          const idx = draft.myList.findIndex(
            (l) => l.postId === Number(action.payload.postId)
          );
          draft.myList[idx] = {
            ...draft.myList[idx],
            ...action.payload.carpool,
          };
        }
      }),

    [DELETE_CARPOOL]: (state, action) =>
      produce(state, (draft) => {
        const page = action.payload.page;
        const skiResort = action.payload.skiResort;

        let deleted_list = draft.list[skiResort].filter(
          (l) => l.postId !== action.payload.postId
        );
        draft.list[skiResort] = deleted_list;

        if (page === "myPage") {
          let deleted_myList = draft.myList.filter(
            (l) => l.postId !== action.payload.postId
          );
          draft.myList = deleted_myList;
        }
      }),

    [FILTER_CARPOOL]: (state, action) =>
      produce(state, (draft) => {
        draft.filterList = action.payload.carpool;
      }),

    [GET_MYCARPOOL]: (state, action) =>
      produce(state, (draft) => {
        draft.myList = action.payload.myCarpools;
      }),

    [COMPLETE_CARPOOL]: (state, action) =>
      produce(state, (draft) => {
        const page = action.payload.page;
        const skiResort = action.payload.skiResort;

        const idx = draft.list[skiResort].findIndex(
          (l) => l.postId === Number(action.payload.postId)
        );
        draft.list[skiResort][idx] = {
          ...draft.list[skiResort][idx],
          ...action.payload.carpool,
        };

        if (page === "myPage") {
          const idx = draft.myList.findIndex(
            (l) => l.postId === Number(action.payload.postId)
          );
          draft.myList[idx] = {
            ...draft.myList[idx],
            ...action.payload.carpool,
          };
        }
      }),

    [IMAGE_RESORT]: (state, action) =>
      produce(state, (draft) => {
        draft.resortImg = action.payload.url;
      }),

    [IS_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.state;
      }),

    [IS_NEXT]: (state, action) =>
      produce(state, (draft) => {
        draft.is_next = action.payload.state;
      }),

    [RESET]: (state, action) =>
      produce(state, (draft) => {
        const skiResort = action.payload.skiResort;
        draft.resortImg = "";
        draft.list[skiResort] = [];
        draft.page = 1;
      }),
  },
  initialState
);

const carpoolActions = {
  getCarpool,
  addCarpool,
  editCarpool,
  deleteCarpool,
  reset,
  getCarpoolDB,
  addCarpoolDB,
  editCarpoolDB,
  deleteCarpoolDB,
  completeCarpoolDB,
  filterCarpoolDB,
  getMyCarpoolDB,
  imageResortDB,
};

export { carpoolActions };
