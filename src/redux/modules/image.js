import { createAction, handleActions } from "redux-actions";
import produce from 'immer';

//action
const SET_PREVIEW = 'SET_PREVIEW';

//action creators
const setPreview = createAction(SET_PREVIEW, (url) => ({url}));

//initialState
const initialState = {
  preview: '',
};

//reducer
export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.url;
      })
  },
  initialState
)

const imageActions = {
  setPreview
};

export {imageActions};