import update from 'react-addons-update';
import {
  GET_NFC_WAITING,
  GET_NFC_SUCCESS,
  GET_NFC_FAILURE,
} from './actions';

const initialState = {
  getNfc: {
    status: 'INIT',
    nfc: undefined,
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NFC_WAITING:
      return update(state, {
        getNfc: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_NFC_SUCCESS:
      return update(state, {
        getNfc: {
          status: { $set: 'SUCCESS' },
          nfc: { $set: action.nfc },
        },
      });
    case GET_NFC_FAILURE:
      return update(state, {
        getNfc: {
          status: { $set: 'FAILURE' },
          nfc: { $set: undefined },
        },
      });
    default:
      return state;
  }
};
