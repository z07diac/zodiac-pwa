importScripts("/__/firebase/4.6.2/firebase-app.js");
importScripts("/__/firebase/4.6.2/firebase-messaging.js");
importScripts("/__/firebase/init.js");

const cacheName = "v1";
const messaging = firebase.messaging();

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(["./", "./serviceworker_push.js"]).then(() => {
        self.skipWaiting();
      });
    })
  );
});

self.addEventListener("activate", event => {
  console.log("activate");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// ���ץ꤬�Хå����饦��ɤˤ�����˥ץå������Τ��Ϥ������˥�����
// https://firebase.google.com/docs/cloud-messaging/js/receive?hl=ja
messaging.setBackgroundMessageHandler(payload => {
  console.log(payload);
  const title = "Broadcast Message ";
  const options = {
    body: "Bello."
  };

  return self.registration.showNotification(title, options);
});
