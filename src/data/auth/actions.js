/* global fetch, document */
import getCookie from '../../modules/getCookie';
import * as loader from '../../data/loader/actions';

export const WAITING = 'data/auth/WAITING';
export const SUCCESS = 'data/auth/SUCCESS';
export const FAILURE = 'data/auth/FAILURE';

const waiting = () => {
  return {
    type: WAITING,
  };
};
const success = (order) => {
  return {
    type: SUCCESS,
    order,
  };
};
const failure = (error) => {
  return {
    type: FAILURE,
    error,
  };
};
export const request = () => {
  return (dispatch) => {
    dispatch(loader.on());
    dispatch(waiting());
    return fetch('/auth', {
      method: 'GET',
      headers: {
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        Authorization: `Bearer ${getCookie('order')}`
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
