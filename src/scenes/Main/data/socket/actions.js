import io from 'socket.io-client';
import { push } from 'react-router-redux';
import { changeStatus } from '../order/actions';

export const CONNECTION_WAITING = 'Main/data/socket/CONNECTION_WAITING';
export const CONNECTION_SUCCESS = 'Main/data/socket/CONNECTION_SUCCESS';
export const CONNECTION_FAILURE = 'Main/data/socket/CONNECTION_FAILURE';

const connectionWaiting = () => ({
  type: CONNECTION_WAITING,
});
const connectionSuccess = socket => ({
  type: CONNECTION_SUCCESS,
  socket,
});
const connectionFailure = () => ({
  type: CONNECTION_FAILURE,
});
export const connectionRequest = (url) => {
  return (dispatch) => {
    dispatch(connectionWaiting());
    const socket = io(url);
    socket.on('connect', () => {
      // 이벤트 등록 프로세스
      // 이전 이벤트 삭제 (중복 방지)
      socket.off('orderStatusChange');
      // 이벤트 추가
      socket.on('orderStatusChange', ({ _id, status }) => {
        dispatch(changeStatus({ _id, status }));
        dispatch(push('/order'));
      });
      dispatch(connectionSuccess(socket));
    });
    socket.on('disconnect', () => {
      dispatch(connectionFailure());
    });
  };
};

export const DISCONNECT = 'Main/data/socket/DISCONNECT';
export const disconnect = () => (
  (dispatch, getState) => {
    const { socket } = getState().main.data.socket.connection;
    if (socket) {
      socket.disconnect();
    }
    dispatch({
      type: DISCONNECT,
    });
  }
);
