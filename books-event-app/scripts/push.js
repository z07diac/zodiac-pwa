/*****************************************************************************
 *
 * Listener for noticifacation
 *
 ****************************************************************************/
const messaging = firebase.messaging();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./serviceworker_push.js")
    .then(registration => {
      console.log(registration);
      messaging.useServiceWorker(registration);
    })
    .catch(error => {
      console.error(error);
    });
}

window.addEventListener(
  "online",
  e => {
    console.log("online");
  },
  false
);

window.addEventListener(
  "offline",
  e => {
    console.log("offline");
  },
  false
);

// ���ץ꤬�ե������饦��ɤˤ�����˥ץå������Τ��Ϥ������˥�����
// https://firebase.google.com/docs/cloud-messaging/js/receive?hl=ja
messaging.onMessage(payload => {
  console.log(payload);
});

// �ܥ��󲡲��Υ����ߥ󥰤ǥ桼�������θ��¤����
function requestPermission() {
  messaging
    .requestPermission()
    .then(() => {
      messaging
        .getToken()
        .then(token => {
          console.log(token);
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
}
