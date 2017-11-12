/* global fetch */
import _ from 'lodash';
import configure from '../../../../modules/configure';

export const RETRIEVE_ONE_WAITING = 'Admin/data/account/RETRIEVE_ONE_WAITING';
export const RETRIEVE_ONE_SUCCESS = 'Admin/data/account/RETRIEVE_ONE_SUCCESS';
export const RETRIEVE_ONE_FAILURE = 'Admin/data/account/RETRIEVE_ONE_FAILURE';
export const RETRIEVE_MANY_WAITING = 'Admin/data/account/RETRIEVE_MANY_WAITING';
export const RETRIEVE_MANY_SUCCESS = 'Admin/data/account/RETRIEVE_MANY_SUCCESS';
export const RETRIEVE_MANY_FAILURE = 'Admin/data/account/RETRIEVE_MANY_FAILURE';
export const MODIFY_ONE_WAITING = 'Admin/data/account/MODIFY_ONE_WAITING';
export const MODIFY_ONE_SUCCESS = 'Admin/data/account/MODIFY_ONE_SUCCESS';
export const MODIFY_ONE_FAILURE = 'Admin/data/account/MODIFY_ONE_FAILURE';
export const CREATE_ONE_WAITING = 'Admin/data/account/CREATE_ONE_WAITING';
export const CREATE_ONE_SUCCESS = 'Admin/data/account/CREATE_ONE_SUCCESS';
export const CREATE_ONE_FAILURE = 'Admin/data/account/CREATE_ONE_FAILURE';
export const REMOVE_ONE_WAITING = 'Admin/data/account/REMOVE_ONE_WAITING';
export const REMOVE_ONE_SUCCESS = 'Admin/data/account/REMOVE_ONE_SUCCESS';
export const REMOVE_ONE_FAILURE = 'Admin/data/account/REMOVE_ONE_FAILURE';
export const REMOVE_MANY_WAITING = 'Admin/data/account/REMOVE_MANY_WAITING';
export const REMOVE_MANY_SUCCESS = 'Admin/data/account/REMOVE_MANY_SUCCESS';
export const REMOVE_MANY_FAILURE = 'Admin/data/account/REMOVE_MANY_FAILURE';

const retrieveOneWaiting = () => {
  return {
    type: RETRIEVE_ONE_WAITING,
  };
};
const retrieveOneSuccess = (account) => {
  return {
    type: RETRIEVE_ONE_SUCCESS,
    account,
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
    dispatch(retrieveOneWaiting());
    return fetch(`${configure.API}/account/${_id}`, {
      method: 'GET',
      credentials: 'include',
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
const retrieveManySuccess = (accounts) => {
  return {
    type: RETRIEVE_MANY_SUCCESS,
    accounts,
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
    dispatch(retrieveManyWaiting());
    return fetch(`${configure.API}/account`, {
      method: 'GET',
      credentials: 'include',
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
const modifyOneWaiting = () => {
  return {
    type: MODIFY_ONE_WAITING,
  };
};
const modifyOneSuccess = () => {
  return {
    type: MODIFY_ONE_SUCCESS,
  };
};
const modifyOneFailure = (error) => {
  return {
    type: MODIFY_ONE_FAILURE,
    error,
  };
};
export const modifyOneRequest = (account) => {
  return (dispatch) => {
    dispatch(modifyOneWaiting());
    return fetch(`${configure.API}/account`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: account,
      }),
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((res) => {
        if (res.data) {
          return dispatch(modifyOneSuccess(res.data));
        }
        return dispatch(modifyOneFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(modifyOneFailure(e)));
  };
};
const createOneWaiting = () => {
  return {
    type: CREATE_ONE_WAITING,
  };
};
const createOneSuccess = () => {
  return {
    type: CREATE_ONE_SUCCESS,
  };
};
const createOneFailure = (error) => {
  return {
    type: CREATE_ONE_FAILURE,
    error,
  };
};
export const createOneRequest = (account) => {
  return (dispatch) => {
    dispatch(createOneWaiting());
    return fetch(`${configure.API}/account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: account,
      }),
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((res) => {
        if (res.data) {
          return dispatch(createOneSuccess(res.data));
        }
        return dispatch(createOneFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(createOneFailure(e)));
  };
};
const removeOneWaiting = () => {
  return {
    type: REMOVE_ONE_WAITING,
  };
};
const removeOneSuccess = () => {
  return {
    type: REMOVE_ONE_SUCCESS,
  };
};
const removeOneFailure = (error) => {
  return {
    type: REMOVE_ONE_FAILURE,
    error,
  };
};
export const removeOneRequest = (account) => {
  return (dispatch) => {
    dispatch(removeOneWaiting());
    return fetch(`${configure.API}/account`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: account,
      }),
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((res) => {
        if (res.data) {
          return dispatch(removeOneSuccess(res.data));
        }
        return dispatch(removeOneFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(removeOneFailure(e)));
  };
};
const removeManyWaiting = () => {
  return {
    type: REMOVE_MANY_WAITING,
  };
};
const removeManySuccess = () => {
  return {
    type: REMOVE_MANY_SUCCESS,
  };
};
const removeManyFailure = (error) => {
  return {
    type: REMOVE_MANY_FAILURE,
    error,
  };
};
export const removeManyRequest = (accounts) => {
  return (dispatch) => {
    dispatch(removeManyWaiting());
    return fetch(`${configure.API}/account`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: accounts,
      }),
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((res) => {
        if (res.data) {
          return dispatch(removeManySuccess(res.data));
        }
        return dispatch(removeManyFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(removeManyFailure(e)));
  };
};
