/* global fetch */
import * as loader from '../../../../data/loader/actions';

// 로그인
export const GET_WAITING = 'Main/data/customer/GET_WAITING';
export const GET_SUCCESS = 'Main/data/customer/GET_SUCCESS';
export const GET_FAILURE = 'Main/data/customer/GET_FAILURE';
const getWaiting = () => {
  return {
    type: GET_WAITING,
  };
};
const getSuccess = (data) => {
  return {
    type: GET_SUCCESS,
    data,
  };
};
const getFailure = (error) => {
  return {
    type: GET_FAILURE,
    error,
  };
};
export const getRequest = (id) => {
  return (dispatch) => {
    if (!id) {
      return dispatch(getFailure({
        error: null,
        message: '계정 정보가 없어 불러올 수 없습니다.',
      }));
    }
    dispatch(loader.on());
    dispatch(getWaiting());
    return fetch('/api/customer/auth', {
      method: 'GET',
      headers: {
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        Authorization: `Bearer ${id}`
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
          return dispatch(getSuccess(res.data));
        }
        return dispatch(getFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(getFailure(e)));
  };
};

// 로그아웃
export const logout = () => {
  return (dispatch) => {
    return dispatch(getFailure({
      error: null,
      message: '로그아웃',
    }));
  };
};

export const MAKE_NON_MEMBER_WAITING = 'Main/data/customer/MAKE_NON_MEMBER_WAITING';
export const MAKE_NON_MEMBER_SUCCESS = 'Main/data/customer/MAKE_NON_MEMBER_SUCCESS';
export const MAKE_NON_MEMBER_FAILURE = 'Main/data/customer/MAKE_NON_MEMBER_FAILURE';
const makeNonMemberWaiting = () => {
  return {
    type: MAKE_NON_MEMBER_WAITING,
  };
};
const makeNonMemberSuccess = (data) => {
  return {
    type: MAKE_NON_MEMBER_SUCCESS,
    data,
  };
};
const makeNonMemberFailure = (error) => {
  return {
    type: MAKE_NON_MEMBER_FAILURE,
    error,
  };
};
export const makeNonMemberRequest = () => {
  return (dispatch) => {
    dispatch(loader.on());
    dispatch(makeNonMemberWaiting());
    return fetch('/api/customer/makenonmember', {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache',
      },
      credentials: 'include',
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
          return dispatch(makeNonMemberSuccess(res.data));
        }
        return dispatch(makeNonMemberFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(makeNonMemberFailure(e)));
  };
};

export const INPUT_PHONE_WAITING = 'Main/data/customer/INPUT_PHONE_WAITING';
export const INPUT_PHONE_SUCCESS = 'Main/data/customer/INPUT_PHONE_SUCCESS';
export const INPUT_PHONE_FAILURE = 'Main/data/customer/INPUT_PHONE_FAILURE';
const inputPhoneWaiting = () => {
  return {
    type: INPUT_PHONE_WAITING,
  };
};
const inputPhoneSuccess = (data) => {
  return {
    type: INPUT_PHONE_SUCCESS,
    data,
  };
};
const inputPhoneFailure = (error) => {
  return {
    type: INPUT_PHONE_FAILURE,
    error,
  };
};
export const inputPhoneRequest = (phone) => {
  return (dispatch) => {
    dispatch(loader.on());
    dispatch(inputPhoneWaiting());
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
          return dispatch(inputPhoneSuccess(res.data));
        }
        return dispatch(inputPhoneFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(inputPhoneFailure(e)));
  };
};

export const ADD_WEB_PUSH_WAITING = 'Main/data/customer/ADD_WEB_PUSH_WAITING';
export const ADD_WEB_PUSH_SUCCESS = 'Main/data/customer/ADD_WEB_PUSH_SUCCESS';
export const ADD_WEB_PUSH_FAILURE = 'Main/data/customer/ADD_WEB_PUSH_FAILURE';
const addWebPushWaiting = () => {
  return {
    type: ADD_WEB_PUSH_WAITING,
  };
};
const addWebPushSuccess = (data) => {
  return {
    type: ADD_WEB_PUSH_SUCCESS,
    data,
  };
};
const addWebPushFailure = (error) => {
  return {
    type: ADD_WEB_PUSH_FAILURE,
    error,
  };
};
export const addWebPushRequest = (_id, endpoint, keys) => {
  return (dispatch) => {
    dispatch(loader.on());
    dispatch(addWebPushWaiting());
    return fetch('/api/customer/webpush/add', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          _id,
          endpoint,
          keys,
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
          return dispatch(addWebPushSuccess(res.data));
        }
        return dispatch(addWebPushFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(addWebPushFailure(e)));
  };
};

export const REMOVE_WEB_PUSH_WAITING = 'Main/data/customer/REMOVE_WEB_PUSH_WAITING';
export const REMOVE_WEB_PUSH_SUCCESS = 'Main/data/customer/REMOVE_WEB_PUSH_SUCCESS';
export const REMOVE_WEB_PUSH_FAILURE = 'Main/data/customer/REMOVE_WEB_PUSH_FAILURE';
const removeWebPushWaiting = () => {
  return {
    type: REMOVE_WEB_PUSH_WAITING,
  };
};
const removeWebPushSuccess = () => {
  return {
    type: REMOVE_WEB_PUSH_SUCCESS,
  };
};
const removeWebPushFailure = (error) => {
  return {
    type: REMOVE_WEB_PUSH_FAILURE,
    error,
  };
};
export const removeWebPushRequest = (_id, endpoint) => {
  return (dispatch) => {
    dispatch(loader.on());
    dispatch(removeWebPushWaiting());
    return fetch('/api/customer/webpush/remove', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          _id,
          endpoint,
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
          return dispatch(removeWebPushSuccess(res.data));
        }
        return dispatch(removeWebPushFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(removeWebPushFailure(e)));
  };
};
