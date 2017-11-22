/* global fetch */
import * as loader from '../../../../data/loader/actions';

export const WAITING = 'Main/data/order/WAITING';
export const SUCCESS = 'Main/data/order/SUCCESS';
export const FAILURE = 'Main/data/order/FAILURE';

const waiting = () => {
  return {
    type: WAITING,
  };
};
const success = () => {
  return {
    type: SUCCESS,
  };
};
const failure = (error) => {
  return {
    type: FAILURE,
    error,
  };
};
export const request = (order) => {
  return (dispatch) => {
    dispatch(loader.on());
    dispatch(waiting());
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
          return dispatch(success(res.data));
        }
        return dispatch(failure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(failure(e)));
  };
};
