/* global fetch, document */
import * as loader from '../../../../data/loader/actions';

export const WAITING = 'Main/data/product/WAITING';
export const SUCCESS = 'Main/data/product/SUCCESS';
export const FAILURE = 'Main/data/product/FAILURE';

const waiting = () => {
  return {
    type: WAITING,
  };
};
const success = (products) => {
  return {
    type: SUCCESS,
    products,
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
    return fetch('/api/product', {
      method: 'GET',
      headers: {
        pragma: 'no-cache',
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

