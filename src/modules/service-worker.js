/* global self */
self.addEventListener('push', (event) => {
  console.log(event);
  event.waitUntil(
    self.registration.showNotification('ServiceWorker Cookbook', {
      body: 'Alea iacta est',
    })
  );
});
