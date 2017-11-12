/* global fetch */
import getCookie from '../../../../modules/getCookie';

export const WAITING = 'Main/data/getOrdered/WAITING';
export const SUCCESS = 'Main/data/getOrdered/SUCCESS';
export const FAILURE = 'Main/data/getOrdered/FAILURE';

const waiting = () => {
  return {
    type: WAITING,
  };
};
const success = (ordered) => {
  return {
    type: SUCCESS,
    ordered,
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
    dispatch(waiting());
    return fetch(`/api/order/${getCookie('order')}`, {
      method: 'GET',
      headers: {
        'pragma': 'no-cache',
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