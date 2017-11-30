/* global fetch */
import * as loader from '../../../../data/loader/actions';

export const GET_NFC_WAITING = 'Main/data/nfc/GET_NFC_WAITING';
export const GET_NFC_SUCCESS = 'Main/data/nfc/GET_NFC_SUCCESS';
export const GET_NFC_FAILURE = 'Main/data/nfc/GET_NFC_FAILURE';
const getNfcWaiting = () => {
  return {
    type: GET_NFC_WAITING,
  };
};
const getNfcSuccess = (nfc) => {
  return {
    type: GET_NFC_SUCCESS,
    nfc,
  };
};
const getNfcFailure = (error) => {
  return {
    type: GET_NFC_FAILURE,
    error,
  };
};
export const getNfcRequest = (nfcId) => {
  return (dispatch) => {
    if (!nfcId) {
      return new Promise((resolve) => {
        resolve(dispatch(getNfcFailure({
          error: null,
          message: '클라이언트 NFC 정보 제거 완료',
        })));
      });
    }
    dispatch(loader.on());
    dispatch(getNfcWaiting());
    return fetch(`/api/nfc/${nfcId}`, {
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
          return dispatch(getNfcSuccess(res.data));
        }
        return dispatch(getNfcFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(getNfcFailure(e)));
  };
};

