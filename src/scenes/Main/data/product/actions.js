/* global fetch, document */
import * as loader from '../../../../data/loader/actions';
import configure from '../../../../modules/configure';

export const RETRIEVE_ONE_WAITING = 'Main/data/product/RETRIEVE_ONE_WAITING';
export const RETRIEVE_ONE_SUCCESS = 'Main/data/product/RETRIEVE_ONE_SUCCESS';
export const RETRIEVE_ONE_FAILURE = 'Main/data/product/RETRIEVE_ONE_FAILURE';
export const RETRIEVE_MANY_WAITING = 'Main/data/product/RETRIEVE_MANY_WAITING';
export const RETRIEVE_MANY_SUCCESS = 'Main/data/product/RETRIEVE_MANY_SUCCESS';
export const RETRIEVE_MANY_FAILURE = 'Main/data/product/RETRIEVE_MANY_FAILURE';


const retrieveOneWaiting = () => {
  return {
    type: RETRIEVE_ONE_WAITING,
  };
};
const retrieveOneSuccess = (product) => {
  return {
    type: RETRIEVE_ONE_SUCCESS,
    product,
  };
};
const retrieveOneFailure = (error) => {
  return {
    type: RETRIEVE_ONE_FAILURE,
    error,
  };
};
export const retrieveOneRequest = (_id) => {
  return (dispatch) => {
    dispatch(loader.on());
    dispatch(retrieveOneWaiting());
    return fetch(`${configure.API}/product/${_id}`, {
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
          return dispatch(retrieveOneSuccess(res.data));
        }
        return dispatch(retrieveOneFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(retrieveOneFailure(e)));
  };
};
const retrieveManyWaiting = () => {
  return {
    type: RETRIEVE_MANY_WAITING,
  };
};
const retrieveManySuccess = (products) => {
  return {
    type: RETRIEVE_MANY_SUCCESS,
    products,
  };
};
const retrieveManyFailure = (error) => {
  return {
    type: RETRIEVE_MANY_FAILURE,
    error,
  };
};
export const retrieveManyRequest = () => {
  return (dispatch) => {
    dispatch(loader.on());
    dispatch(retrieveManyWaiting());
    return fetch(`${configure.API}/product`, {
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
          return dispatch(retrieveManySuccess(res.data));
        }
        return dispatch(retrieveManyFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(retrieveManyFailure(e)));
  };
};
