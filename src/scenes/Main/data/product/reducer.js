import update from 'react-addons-update';
import {
  WAITING,
  SUCCESS,
  FAILURE,
} from './actions';

const initialState = {
  status: 'INIT',
  products: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WAITING:
      return update(state, {
        status: { $set: 'WAITING' },
      });
    case SUCCESS:
      return update(state, {
        status: { $set: 'SUCCESS' },
        products: { $set: action.products },
      });
    case FAILURE:
      return update(state, {
        status: { $set: 'FAILURE' },
        products: { $set: [] },
      });
    default:
      return state;
  }
};
