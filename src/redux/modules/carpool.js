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
  (skiResort, postId, carpool) => ({
    skiResort,
    postId,
    carpool,
  })
);
const deleteCarpool = createAction(
  DELETE_CARPOOL,
  (skiResort, postId, page) => ({
    skiResort,
    postId,
    page,
  })
);
const getMyCarpool = createAction(GET_MYCARPOOL, (page, myCarpools) => ({
  page, 
  myCarpools,
}));
const completeMycarpool = createAction(
  COMPLETE_CARPOOL,
  (skiResort, postId, carpool, page) => ({
    skiResort,
    postId,
    carpool,
    page,
  })
);
const filterCarpool = createAction(FILTER_CARPOOL, (skiResort, carpool) => ({ skiResort, carpool }));
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
      console.log(err);
    }
  };
};

const editCarpoolDB = (skiResort, postId, carpool) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.editCarpool(postId, carpool);
      response && history.goBack();
      dispatch(editCarpool(skiResort, postId, response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteCarpoolDB = (skiResort, postId, page) => {
  return async function (dispatch, getState, { history }) {
    try {
      await apis.deleteCarpool(postId);
      dispatch(deleteCarpool(skiResort, postId));
      if(page === 'myPage') {
        dispatch(deleteCarpool(skiResort, postId, page));
      }
      // history.push(`/carpool/${skiResort}`);
    } catch (err) {
      console.log(err);
    }
  };
};

const completeCarpoolDB = (skiResort, postId, page) => {
  return async function (dispatch, getState, { history }) {
    console.log(page)
    try {
      const response = await apis.completeCarpool(postId);

      response && dispatch(completeMycarpool(skiResort, postId, response.data));
      if(page === 'myPage') {
        dispatch(completeMycarpool(skiResort, postId, response.data, page));
      }
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
        dispatch(filterCarpool(skiResort, response.data));
        history.push(`/filter/${skiResort}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const getMyCarpoolDB = (page) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.getMyCarpool();
      response && dispatch(getMyCarpool(page, response.data));
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
    myPage: [],
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
        const idx = draft.list[skiResort].findIndex(
          (l) => l.postId === Number(action.payload.postId)
        );
        draft.list[skiResort][idx] = {
          ...draft.list[skiResort][idx],
          ...action.payload.carpool,
        };
      }),

    [DELETE_CARPOOL]: (state, action) =>
      produce(state, (draft) => {
        const skiResort = action.payload.skiResort;
        const page = action.payload.page;

        let deleted_list = draft.list[skiResort].filter(
          (l) => l.postId !== action.payload.postId
        );
        console.log(skiResort)
        draft.list[skiResort] = deleted_list;

        if (page === "myPage") {
          let deleted_list = draft.list[page].filter(
            (l) => l.postId !== action.payload.postId
          );
          draft.list[page] = deleted_list;
        }
      }),

    [FILTER_CARPOOL]: (state, action) =>
      produce(state, (draft) => {
        // draft.filterList = action.payload.carpool;
        const skiResort = action.payload.skiResort;
        draft.list[skiResort] = action.payload.carpool;
      }),

    [GET_MYCARPOOL]: (state, action) =>
      produce(state, (draft) => {
        const page = action.payload.page;
        draft.list[page] = action.payload.myCarpools;
      }),

    [COMPLETE_CARPOOL]: (state, action) =>
      produce(state, (draft) => {
        const skiResort = action.payload.skiResort;
        const page = action.payload.page;
        console.log(page)

        const idx = draft.list[skiResort].findIndex(
          (l) => l.postId === Number(action.payload.postId)
        );

        draft.list[skiResort][idx] = {
          ...draft.list[skiResort][idx],
          ...action.payload.carpool,
        };

        if (page === "myPage") {
          const idx = draft.list[page].findIndex(
            (l) => l.postId === Number(action.payload.postId)
          );
          draft.list[page][idx] = {
            ...draft.list[page][idx],
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
