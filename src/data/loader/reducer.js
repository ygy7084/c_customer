import {
  WAITING as AUTH_WAITING,
  SUCCESS as AUTH_SUCCESS,
  FAILURE as AUTH_FAILURE,
} from './../auth/actions';
const initialState = false;
const loading = (state, action) => {
  switch (action.type) {
    case AUTH_WAITING:
      return true;
    case AUTH_SUCCESS:
    case AUTH_FAILURE:
      return false;
    default:
      return state;
  }
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return loading(state, action);
  }
};