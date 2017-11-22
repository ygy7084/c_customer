import { ON, OFF } from './actions';

const initialState = true;
const loading = (state, action) => {
  switch (action.type) {
    case ON:
      return true;
    case OFF:
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
