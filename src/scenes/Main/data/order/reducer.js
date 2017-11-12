import update from 'react-addons-update';
import {
  RETRIEVE_ONE_WAITING,
  RETRIEVE_ONE_SUCCESS,
  RETRIEVE_ONE_FAILURE,
  RETRIEVE_MANY_WAITING,
  RETRIEVE_MANY_SUCCESS,
  RETRIEVE_MANY_FAILURE,
  MODIFY_ONE_WAITING,
  MODIFY_ONE_SUCCESS,
  MODIFY_ONE_FAILURE,
  CREATE_ONE_WAITING,
  CREATE_ONE_SUCCESS,
  CREATE_ONE_FAILURE,
  REMOVE_ONE_WAITING,
  REMOVE_ONE_SUCCESS,
  REMOVE_ONE_FAILURE,
  REMOVE_MANY_WAITING,
  REMOVE_MANY_SUCCESS,
  REMOVE_MANY_FAILURE,
} from './actions';

const initialState = {
  retrieveOne: {
    status: 'INIT',
    account: {},
  },
  retrieveMany: {
    status: 'INIT',
    accounts: [],
  },
  modifyOne: {
    status: 'INIT',
  },
  createOne: {
    status: 'INIT',
  },
  removeOne: {
    status: 'INIT',
  },
  removeMany: {
    status: 'INIT',
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_ONE_WAITING:
      return update(state, {
        retrieveOne: {
          status: { $set: 'WAITING' }
        },
      });
    case RETRIEVE_ONE_SUCCESS:
      return update(state, {
        retrieveOne: {
          status: { $set: 'SUCCESS' },
          account: { $set: action.account },
        },
      });
    case RETRIEVE_ONE_FAILURE:
      return update(state, {
        retrieveOne: {
          status: { $set: 'FAILURE' },
          account: { $set: {} }
        },
      });
    case RETRIEVE_MANY_WAITING:
      return update(state, {
        retrieveMany: {
          status: { $set: 'WAITING' },
        },
      });
    case RETRIEVE_MANY_SUCCESS:
      return update(state, {
        retrieveMany: {
          status: { $set: 'SUCCESS' },
          accounts: { $set: action.accounts },
        },
      });
    case RETRIEVE_MANY_FAILURE:
      return update(state, {
        retrieveMany: {
          status: { $set: 'FAILURE' },
          accounts: { $set: [] },
        },
      });
    case MODIFY_ONE_WAITING:
      return update(state, {
        modifyOne: {
          status: { $set: 'WAITING' }
        },
      });
    case MODIFY_ONE_SUCCESS:
      return update(state, {
        modifyOne: {
          status: { $set: 'SUCCESS' }
        },
      });
    case MODIFY_ONE_FAILURE:
      return update(state, {
        modifyOne: {
          status: { $set: 'FAILURE' }
        },
      });
    case CREATE_ONE_WAITING:
      return update(state, {
        createOne: {
          status: { $set: 'WAITING' }
        },
      });
    case CREATE_ONE_SUCCESS:
      return update(state, {
        createOne: {
          status: { $set: 'SUCCESS' }
        },
      });
    case CREATE_ONE_FAILURE:
      return update(state, {
        createOne: {
          status: { $set: 'FAILURE' }
        },
      });
    case REMOVE_ONE_WAITING:
      return update(state, {
        removeOne: {
          status: { $set: 'WAITING' }
        },
      });
    case REMOVE_ONE_SUCCESS:
      return update(state, {
        removeOne: {
          status: { $set: 'SUCCESS' }
        },
      });
    case REMOVE_ONE_FAILURE:
      return update(state, {
        removeOne: {
          status: { $set: 'FAILURE' }
        },
      });
    case REMOVE_MANY_WAITING:
      return update(state, {
        removeMany: {
          status: { $set: 'WAITING' }
        },
      });
    case REMOVE_MANY_SUCCESS:
      return update(state, {
        removeMany: {
          status: { $set: 'SUCCESS' }
        },
      });
    case REMOVE_MANY_FAILURE:
      return update(state, {
        removeMany: {
          status: { $set: 'FAILURE' }
        },
      });
    default:
      return state;
  }
};
