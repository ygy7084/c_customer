/* global fetch */
import * as loader from '../../../../data/loader/actions';

export const GET_CUSTOMER_WAITING = 'Main/data/customer/GET_CUSTOMER_WAITING';
export const GET_CUSTOMER_SUCCESS = 'Main/data/customer/GET_CUSTOMER_SUCCESS';
export const GET_CUSTOMER_FAILURE = 'Main/data/customer/GET_CUSTOMER_FAILURE';
const getCustomerWaiting = () => {
  return {
    type: GET_CUSTOMER_WAITING,
  };
};
const getCustomerSuccess = (customer) => {
  return {
    type: GET_CUSTOMER_SUCCESS,
    customer,
  };
};
const getCustomerFailure = (error) => {
  return {
    type: GET_CUSTOMER_FAILURE,
    error,
  };
};
export const getCustomerRequest = (customerId) => {
  return (dispatch) => {
    dispatch(loader.on());
    dispatch(getCustomerWaiting());
    return fetch(`/api/customer/${customerId}`, {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache',
      },
    })
      .then((res) => {
        dispatch(loader.off());
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((res) => {
        if (res.data) {
          return dispatch(getCustomerSuccess(res.data));
        }
        return dispatch(getCustomerFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(getCustomerFailure(e)));
  };
};

export const INPUT_CUSTOMER_PHONE_WAITING = 'Main/data/customer/INPUT_CUSTOMER_PHONE_WAITING';
export const INPUT_CUSTOMER_PHONE_SUCCESS = 'Main/data/customer/INPUT_CUSTOMER_PHONE_SUCCESS';
export const INPUT_CUSTOMER_PHONE_FAILURE = 'Main/data/customer/INPUT_CUSTOMER_PHONE_FAILURE';
const inputCustomerPhoneWaiting = () => {
  return {
    type: INPUT_CUSTOMER_PHONE_WAITING,
  };
};
const inputCustomerPhoneSuccess = (customer) => {
  return {
    type: INPUT_CUSTOMER_PHONE_SUCCESS,
    customer,
  };
};
const inputCustomerPhoneFailure = (error) => {
  return {
    type: INPUT_CUSTOMER_PHONE_FAILURE,
    error,
  };
};
export const inputCustomerPhoneRequest = (phone) => {
  return (dispatch) => {
    dispatch(loader.on());
    dispatch(inputCustomerPhoneWaiting());
    return fetch('/api/customer/inputphone', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: {
          phone,
        },
      }),
    })
      .then((res) => {
        dispatch(loader.off());
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((res) => {
        if (res.data) {
          return dispatch(inputCustomerPhoneSuccess(res.data));
        }
        return dispatch(inputCustomerPhoneFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(inputCustomerPhoneFailure(e)));
  };
};
