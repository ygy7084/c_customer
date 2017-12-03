/* global navigator, window */
let endPoint;
let keys = {};
function register() {
  navigator.serviceWorker.register('./service-worker.js')
    .then((registration) => {
      console.log(registration);
      return registration.pushManager.getSubscription()
        .then((subscription) => {
          if (subscription) {
            return subscription;
          }
          console.log(registration);
          console.log(subscription);
          return registration.pushManager.subscribe({userVisibleOnly: true});
        });
    }).then((subscription) => {
      keys.p256dh = window.base64UrlToUint8Array(subscription.getKey('p256dh'));
      keys.auth = Array.from(new Uint8Array(subscription.getKey('auth')));
      console.log(keys.p256dh);
      endPoint = subscription.endpoint;
    });
}
export { register, endPoint, keys };
