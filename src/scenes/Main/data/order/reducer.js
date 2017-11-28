import update from 'react-addons-update';
import {
  ORDER_WAITING,
  ORDER_SUCCESS,
  ORDER_FAILURE,
} from './actions';

const initialState = {
  order: {
    status: 'INIT',
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_WAITING:
      return update(state, {
        order: {
          status: { $set: 'WAITING' }
        },
      });
    case ORDER_SUCCESS:
      return update(state, {
        order: {
          status: { $set: 'SUCCESS' },
        },
      });
    case ORDER_FAILURE:
      return update(state, {
        order: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
