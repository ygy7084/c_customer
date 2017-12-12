/* global navigator, window, ServiceWorkerRegistration */

export function isAlive() {
  if ('serviceWorker' in navigator) {
    const { serviceWorker } = navigator;
    if (
      serviceWorker &&
      serviceWorker.controller &&
      serviceWorker.controller.state === 'activated' &&
      window.PushManager &&
      ServiceWorkerRegistration.prototype.showNotification
    ) {
      return true;
    }
  }
  return false;
}
