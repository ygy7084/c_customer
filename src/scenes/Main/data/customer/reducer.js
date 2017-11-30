import update from 'react-addons-update';
import {
  GET_CUSTOMER_WAITING,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAILURE,
  INPUT_CUSTOMER_PHONE_WAITING,
  INPUT_CUSTOMER_PHONE_SUCCESS,
  INPUT_CUSTOMER_PHONE_FAILURE,
} from './actions';

const initialState = {
  getCustomer: {
    status: 'INIT',
    customer: undefined,
  },
  inputCustomerPhone: {
    status: 'INIT',
    customer: undefined,
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_WAITING:
      return update(state, {
        getCustomer: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_CUSTOMER_SUCCESS:
      return update(state, {
        getCustomer: {
          status: { $set: 'SUCCESS' },
          customer: { $set: action.customer },
        },
      });
    case GET_CUSTOMER_FAILURE:
      return update(state, {
        getCustomer: {
          status: { $set: 'FAILURE' },
          customer: { $set: undefined },
        },
      });
    case INPUT_CUSTOMER_PHONE_WAITING:
      return update(state, {
        inputCustomerPhone: {
          status: { $set: 'WAITING' },
        },
      });
    case INPUT_CUSTOMER_PHONE_SUCCESS:
      return update(state, {
        inputCustomerPhone: {
          status: { $set: 'SUCCESS' },
          customer: { $set: action.customer },
        },
      });
    case INPUT_CUSTOMER_PHONE_FAILURE:
      return update(state, {
        inputCustomerPhone: {
          status: { $set: 'FAILURE' },
          customer: { $set: undefined },
        },
      });
    default:
      return state;
  }
};
