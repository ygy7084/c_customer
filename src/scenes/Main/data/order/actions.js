/* global fetch */
import * as loader from '../../../../data/loader/actions';
import getCookie from '../../../../modules/getCookie';

export const ORDER_WAITING = 'Main/data/order/ORDER_WAITING';
export const ORDER_SUCCESS = 'Main/data/order/ORDER_SUCCESS';
export const ORDER_FAILURE = 'Main/data/order/ORDER_FAILURE';
const orderWaiting = () => {
  return {
    type: ORDER_WAITING,
  };
};
const orderSuccess = () => {
  return {
    type: ORDER_SUCCESS,
  };
};
const orderFailure = (error) => {
  return {
    type: ORDER_FAILURE,
    error,
  };
};
export const orderRequest = (order) => {
  return (dispatch) => {
    dispatch(loader.on());
    dispatch(orderWaiting());
    return fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: order,
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
          return dispatch(orderSuccess(res.data));
        }
        return dispatch(orderFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(orderFailure(e)));
  };
};

export const GET_ORDERED_WAITING = 'Main/data/order/GET_ORDERED_WAITING';
export const GET_ORDERED_SUCCESS = 'Main/data/order/GET_ORDERED_SUCCESS';
export const GET_ORDERED_FAILURE = 'Main/data/order/GET_ORDERED_FAILURE';
const getOrderedWaiting = () => {
  return {
    type: GET_ORDERED_WAITING,
  };
};
const getOrderedSuccess = (ordered) => {
  return {
    type: GET_ORDERED_SUCCESS,
    ordered,
  };
};
const getOrderedFailure = (error) => {
  return {
    type: GET_ORDERED_FAILURE,
    error,
  };
};
export const getOrderedRequest = () => {
  return (dispatch) => {
    dispatch(getOrderedWaiting());
    return fetch(`/api/order/${getCookie('order')}`, {
      method: 'GET',
      headers: {
        pragma: 'no-cache',
        'cache-control': 'no-cache',
      },
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((res) => {
        if (res.data) {
          return dispatch(getOrderedSuccess(res.data));
        }
        return dispatch(getOrderedFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(getOrderedFailure(e)));
  };
};
