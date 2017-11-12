import update from 'react-addons-update';
import {
  WAITING,
  SUCCESS,
  FAILURE,
} from './actions';

const initialState = {
  status: 'INIT',
  ordered: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WAITING:
      return update(state, {
        status: { $set: 'WAITING' }
      });
    case SUCCESS:
      return update(state, {
        status: { $set: 'SUCCESS' },
        ordered: { $set: action.ordered },
      });
    case FAILURE:
      return update(state, {
        status: { $set: 'FAILURE' },
        ordered: { $set: {} },
      });
    default:
      return state;
  }
};
