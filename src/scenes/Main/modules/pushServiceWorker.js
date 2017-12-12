/* global navigator, btoa, Notification */

export function setUpPushPermission() {
  return navigator.serviceWorker.ready
    .then((registration) => {
      return registration.pushManager.getSubscription()
        .then((subscription) => {
          if (subscription) {
            return subscription;
          }
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
          });
        });
    })
    .then((subscription) => {
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
    })
    .catch((err) => {
      console.log('setUpPushPermission() ', err);
    });
}
