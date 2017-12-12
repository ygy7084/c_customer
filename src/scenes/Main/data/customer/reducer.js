import update from 'react-addons-update';
import {
  GET_WAITING,
  GET_SUCCESS,
  GET_FAILURE,
  MAKE_NON_MEMBER_WAITING,
  MAKE_NON_MEMBER_SUCCESS,
  MAKE_NON_MEMBER_FAILURE,
  INPUT_PHONE_WAITING,
  INPUT_PHONE_SUCCESS,
  INPUT_PHONE_FAILURE,
  ADD_WEB_PUSH_WAITING,
  ADD_WEB_PUSH_SUCCESS,
  ADD_WEB_PUSH_FAILURE,
  REMOVE_WEB_PUSH_WAITING,
  REMOVE_WEB_PUSH_SUCCESS,
  REMOVE_WEB_PUSH_FAILURE,
} from './actions';

const initialState = {
  get: {
    status: 'INIT',
    data: null,
  },
  makeNonMember: {
    status: 'INIT',
  },
  inputPhone: {
    status: 'INIT',
  },
  addWebPush: {
    status: 'INIT',
  },
  removeWebPush: {
    status: 'INIT',
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WAITING:
      return update(state, {
        get: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_SUCCESS:
      return update(state, {
        get: {
          status: { $set: 'SUCCESS' },
          data: { $set: action.data },
        },
      });
    case GET_FAILURE:
      return update(state, {
        get: {
          status: { $set: 'FAILURE' },
          data: { $set: null },
        },
      });
    case MAKE_NON_MEMBER_WAITING:
      return update(state, {
        makeNonMember: {
          status: { $set: 'WAITING' },
        },
      });
    case MAKE_NON_MEMBER_SUCCESS:
      return update(state, {
        makeNonMember: {
          status: { $set: 'SUCCESS' },
        },
      });
    case MAKE_NON_MEMBER_FAILURE:
      return update(state, {
        makeNonMember: {
          status: { $set: 'FAILURE' },
        },
      });
    case INPUT_PHONE_WAITING:
      return update(state, {
        inputPhone: {
          status: { $set: 'WAITING' },
        },
      });
    case INPUT_PHONE_SUCCESS:
      return update(state, {
        inputPhone: {
          status: { $set: 'SUCCESS' },
          data: { $set: action.data },
        },
      });
    case INPUT_PHONE_FAILURE:
      return update(state, {
        inputPhone: {
          status: { $set: 'FAILURE' },
          data: { $set: null },
        },
      });
    case ADD_WEB_PUSH_WAITING:
      return update(state, {
        addWebPush: {
          status: { $set: 'WAITING' },
        },
      });
    case ADD_WEB_PUSH_SUCCESS:
      return update(state, {
        get: {
          data: {
            webPush: { $push: [action.data] },
          },
        },
        addWebPush: {
          status: { $set: 'SUCCESS' },
        },
      });
    case ADD_WEB_PUSH_FAILURE:
      return update(state, {
        addWebPush: {
          status: { $set: 'FAILURE' },
        },
      });
    case REMOVE_WEB_PUSH_WAITING:
      return update(state, {
        removeWebPush: {
          status: { $set: 'WAITING' },
        },
      });
    case REMOVE_WEB_PUSH_SUCCESS:
      return update(state, {
        removeWebPush: {
          status: { $set: 'SUCCESS' },
        },
      });
    case REMOVE_WEB_PUSH_FAILURE:
      return update(state, {
        removeWebPush: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
