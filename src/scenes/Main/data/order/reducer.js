import update from 'react-addons-update';
import {
  CHANGE_STATUS,
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
    ordered: [],
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATUS: {
      const { ordered } = state.getOrdered;
      const foundIndex = ordered.findIndex(o => o._id === action._id);
      if (foundIndex > -1) {
        const updatedTarget = update(ordered[foundIndex], {
          status: { $set: action.status },
        });
        return update(state, {
          getOrdered: {
            ordered: { $splice: [[foundIndex, 1, updatedTarget]] },
          },
        });
      }
      return state;
    }
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
          ordered: { $set: [] },
        },
      });
    default:
      return state;
  }
};
