import { createAction, handleActions } from "redux-actions";
import produce from 'immer';

//action
const SET_PREVIEW = 'SET_PREVIEW';
const DELETE_PREVIEW = 'DELETE_PREVIEW';

//action creators
const setPreview = createAction(SET_PREVIEW, (url) => ({url}));
const deletePreview = createAction(DELETE_PREVIEW, () => ({}));

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
      }),
    [DELETE_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = '';
      })
  },
  initialState
)

const imageActions = {
  setPreview,
  deletePreview
};

export {imageActions};