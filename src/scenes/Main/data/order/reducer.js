import update from 'react-addons-update';
import {
  ORDER_WAITING,
  ORDER_SUCCESS,
  ORDER_FAILURE,
  GET_ORDERED_WAITING,
  GET_ORDERED_SUCCESS,
  GET_ORDERED_FAILURE,
} from './actions';

const initialState = {
  order: {
    status: 'INIT',
  },
  getOrdered: {
    status: 'INIT',
    ordered: undefined,
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_WAITING:
      return update(state, {
        order: {
          status: { $set: 'WAITING' },
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
    case GET_ORDERED_WAITING:
      return update(state, {
        getOrdered: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_ORDERED_SUCCESS:
      return update(state, {
        getOrdered: {
          status: { $set: 'SUCCESS' },
          ordered: { $set: action.ordered },
        },
      });
    case GET_ORDERED_FAILURE:
      return update(state, {
        getOrdered: {
          status: { $set: 'FAILURE' },
          ordered: { $set: undefined },
        },
      });
    default:
      return state;
  }
};
