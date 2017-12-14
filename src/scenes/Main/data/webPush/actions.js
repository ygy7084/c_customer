/* global
 window,
 ServiceWorkerRegistration,
 navigator,
 Notification,
 btoa
*/

function getSubscription(option) {
  return navigator.serviceWorker.ready
    .then((registration) => {
      return registration.pushManager.getSubscription()
        .then((subscription) => {
          if (subscription) {
            // 이미 구독 데이터 있음
            return subscription;
          }
          if (option && option.makeNew) {
            // 신규 구독
            return registration.pushManager.subscribe({
              userVisibleOnly: true,
            });
          }
          return null;
        });
    })
    .then((subscription) => {
      if (!subscription) {
        return null;
      }
      // 구독 데이터 binary -> string
      const rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
      const key = rawKey ?
        btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : '';
      const rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
      const authSecret = rawAuthSecret ?
        btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : '';
      const endpoint = subscription.endpoint;
      return {
        endpoint,
        keys: {
          key,
          authSecret,
        },
      };
    });
}

export const SUPPORTED = 'Main/data/webPush/SUPPORTED';
export const UNSUPPORTED = 'Main/data/webPush/UNSUPPORTED';
export const DENIED = 'Main/data/webPush/DENIED';
export const GRANTED = 'Main/data/webPush/GRANTED';
export const PROMPT = 'Main/data/webPush/PROMPT';
export const IDLE = 'Main/data/webPush/IDLE';
export const ERROR = 'Main/data/webPush/ERROR';
export const SUBSCRIBED = 'Main/data/webPush/SUBSCRIBED';
export const UNSUBSCRIBED = 'Main/data/webPush/UNSUBSCRIBED';

const supported = () => ({
  type: SUPPORTED,
});
const unsupported = () => ({
  type: UNSUPPORTED,
});
const denied = () => ({
  type: DENIED,
});
const granted = () => ({
  type: GRANTED,
});
const prompt = () => ({
  type: PROMPT,
});
const idle = () => ({
  type: IDLE,
});
const error = () => ({
  type: ERROR,
});
const subscribed = (endpoint, keys) => ({
  type: SUBSCRIBED,
  endpoint,
  keys,
});
const unsubscribed = () => ({
  type: UNSUBSCRIBED,
});

export const isWebPushSupported = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      if (
        !('serviceWorker' in navigator) ||
        !('PushManager' in window) ||
        !('showNotification' in ServiceWorkerRegistration.prototype)
      ) {
        // 웹 푸시 지원 X
        return resolve(dispatch(unsupported()));
      }
      // 서비스 워커 초기화 타임 아웃 시, Unsupported
      console.log('starttimer');
      const timer = setTimeout(() => {
        resolve(dispatch(unsupported()));
      }, 5000);
      return navigator.serviceWorker.ready
        .then(() => {
          clearTimeout(timer);
          return resolve(dispatch(supported()));
        })
        .catch((e) => {
          return resolve(dispatch(unsupported()));
        });
    });
  };
};
export const initWebPush = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return getSubscription()
        .then((subscription) => {
          if (subscription) {
            // 구독 완료
            return resolve(dispatch(subscribed(subscription.endpoint, subscription.keys)));
          }
          return resolve();
        })
        .catch(err => reject(err));
    });
  };
};
export const subscribeWebPush = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // 웹 푸시 구독 프로세스 시작
      if (
        !('serviceWorker' in navigator) ||
        !('PushManager' in window) ||
        !('showNotification' in ServiceWorkerRegistration.prototype)
      ) {
        // 웹 푸시 지원 X
        return resolve(dispatch(unsupported()));
      }
      // 웹 푸시 알림 권한
      const { permission } = Notification;
      console.log(permission);
      if (permission === 'default') {
        // 초기 상태 시, 허용 요청 띄우기
        dispatch(prompt());
        // 웹 푸시 알림 인지를 위한 시간 차
        return setTimeout(() =>
          Notification.requestPermission((result) => {
            if (result === 'default') {
              // 아무 버튼 선택 안함 -> 재요청 가능하도록 (chrome 에선 3번 같은 경우 시, 자동 denied)
              return resolve(dispatch(idle()));
            } else if (result === 'denied') {
              // 거부 선택
              return resolve(dispatch(denied()));
            }
            // 허용 선택
            dispatch(granted());
            return getSubscription({ makeNew: true })
              .then((subscription) => {
                // 구독 완료
                return resolve(dispatch(subscribed(subscription.endpoint, subscription.keys)));
              })
              .catch(err => reject(err));
          }), 1500);
      } else if (permission === 'denied') {
        // 이미 거부된 상태
        return resolve(dispatch(denied()));
      }
      // 이미 허용된 상태
      dispatch(granted());
      return getSubscription({ makeNew: true })
        .then((subscription) => {
          // 구독 완료
          return resolve(dispatch(subscribed(subscription.endpoint, subscription.keys)));
        })
        .catch(err => reject(err));
    })
      .catch(err => dispatch(error()));
  };
};
export const unsubscribeWebPush = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      navigator.serviceWorker.ready
        .then((serviceWorkerRegistration) => {
          return serviceWorkerRegistration.pushManager.getSubscription();
        })
        .then((pushSubscription) => {
          if (!pushSubscription) {
            return resolve(dispatch(unsubscribed()));
          }
          return pushSubscription.unsubscribe();
        })
        .then(() => {
          return resolve(dispatch(unsubscribed()));
        })
        .catch((err) => {
          console.error('Error thrown while revoking push notifications. ' +
            'Most likely because push was never registered', err);
          reject(err);
        });
    });
  };
};
export const denyWebPush = () => {
  return (dispatch) => {
    return dispatch(denied());
  };
};
