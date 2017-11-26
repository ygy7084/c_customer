/* global fetch */
import * as loader from '../../../../data/loader/actions';

export const WAITING = 'Main/data/shop/WAITING';
export const SUCCESS = 'Main/data/shop/SUCCESS';
export const FAILURE = 'Main/data/shop/FAILURE';

const waiting = () => {
  return {
    type: WAITING,
  };
};
const success = (shop) => {
  return {
    type: SUCCESS,
    shop,
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
    return fetch('/api/shop', {
      method: 'GET',
      credentials: 'include',
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
