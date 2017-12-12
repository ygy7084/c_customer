/* global fetch */
export const ON = 'data/noticeDialog/ON';
export const OFF = 'data/noticeDialog/OFF';

export const off = () => {
  return {
    type: OFF,
    open: false,
    title: '',
    text: '',
    onConfirm: null,
  };
};
export const on = ({ title, text, onConfirm }) => {
  return {
    type: ON,
    open: true,
    title,
    text,
    onConfirm,
  };
};
export const error = (e) => {
  const error = e.error || e;
  console.error(error);
  let text = '에러가 발생했습니다.';
  if (error.message && error.message !== '') {
    if (error.message === 'Failed to fetch') {
      text = '서버에 연결할 수 없습니다.';
    } else {
      text = error.message ? error.message : '알수없는에러';
    }
  } else {
    console.error(error);
    text = `에러가 있습니다. ${JSON.stringify(error)}`;
  }
  return {
    type: ON,
    open: true,
    title: 'ERROR',
    text,
  };
};
