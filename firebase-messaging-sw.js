/**
 * CRAD-JOS — Firebase Messaging Service Worker
 * Handles background push notifications when tab is inactive/closed.
 */

// Import Firebase scripts inside Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Initialize Firebase within the service worker
firebase.initializeApp({
  apiKey: "AIzaSyBHMpWikwkR8S17JIUILvnhcrlTt1y9sYU",
  authDomain: "crad-jos.firebaseapp.com",
  projectId: "crad-jos",
  storageBucket: "crad-jos.firebasestorage.app",
  messagingSenderId: "824736236605",
  appId: "1:824736236605:web:32323c63ed9c160d0e5654",
  measurementId: "G-6SRVPN9X8L"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background message received:', payload);

  const notificationTitle = payload.notification?.title || 'CRAD Diagnostic Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have an update from CRAD Diagnostic Services.',
    icon: '/public/icon-192.png',
    badge: '/public/logo.svg',
    data: payload.data || {}
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
