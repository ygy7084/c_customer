import update from 'react-addons-update';
import {
  RETRIEVE_ONE_WAITING,
  RETRIEVE_ONE_SUCCESS,
  RETRIEVE_ONE_FAILURE,
  RETRIEVE_MANY_WAITING,
  RETRIEVE_MANY_SUCCESS,
  RETRIEVE_MANY_FAILURE,
} from './actions';

const initialState = {
  retrieveOne: {
    status: 'INIT',
    product: undefined,
  },
  retrieveMany: {
    status: 'INIT',
    products: [],
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
          product: { $set: action.product },
        },
      });
    case RETRIEVE_ONE_FAILURE:
      return update(state, {
        retrieveOne: {
          status: { $set: 'FAILURE' },
          product: { $set: undefined }
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
          products: { $set: action.products },
        },
      });
    case RETRIEVE_MANY_FAILURE:
      return update(state, {
        retrieveMany: {
          status: { $set: 'FAILURE' },
          products: { $set: [] },
        },
      });
    default:
      return state;
  }
};
