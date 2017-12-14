import update from 'react-addons-update';
import {
  SUPPORTED,
  UNSUPPORTED,
  DENIED,
  GRANTED,
  PROMPT,
  IDLE,
  ERROR,
  SUBSCRIBED,
  UNSUBSCRIBED,
} from './actions';

const initialState = {
  status: 'INIT',
  endpoint: null,
  keys: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUPPORTED:
      return update(state, {
        status: { $set: SUPPORTED },
      });
    case UNSUPPORTED:
      return update(state, {
        status: { $set: UNSUPPORTED },
        endpoint: { $set: null },
        keys: { $set: null },
      });
    case DENIED:
      return update(state, {
        status: { $set: DENIED },
        endpoint: { $set: null },
        keys: { $set: null },
      });
    case GRANTED:
      return update(state, {
        status: { $set: GRANTED },
      });
    case PROMPT:
      return update(state, {
        status: { $set: PROMPT },
      });
    case IDLE:
      return update(state, {
        status: { $set: IDLE },
      });
    case ERROR:
      return update(state, {
        status: { $set: ERROR },
      });
    case SUBSCRIBED:
      return update(state, {
        status: { $set: SUBSCRIBED },
        endpoint: { $set: action.endpoint },
        keys: { $set: action.keys },
      });
    case UNSUBSCRIBED:
      return update(state, {
        status: { $set: UNSUBSCRIBED },
        endpoint: { $set: null },
        keys: { $set: null },
      });
    default:
      return state;
  }
};
