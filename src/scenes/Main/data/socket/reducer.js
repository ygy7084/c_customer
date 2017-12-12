import update from 'react-addons-update';
import {
  CONNECTION_WAITING,
  CONNECTION_SUCCESS,
  CONNECTION_FAILURE,
  DISCONNECT,
} from './actions';

const initialState = {
  connection: {
    status: 'INIT',
    socket: null
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTION_WAITING:
      return update(state, {
        connection: {
          status: { $set: 'WAITING' },
        },
      });
    case CONNECTION_SUCCESS:
      return update(state, {
        connection: {
          status: { $set: 'SUCCESS' },
          socket: { $set: action.socket },
        },
      });
    case CONNECTION_FAILURE:
      return update(state, {
        connection: {
          status: { $set: 'FAILURE' },
        },
      });
    case DISCONNECT:
      return update(state, {
        connection: {
          status: { $set: 'FAILURE' },
          socket: { $set: null },
        },
      });
    default:
      return state;
  }
};
