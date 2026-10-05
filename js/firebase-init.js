/**
 * CRAD-JOS — Firebase Initialization & Push Messaging Setup
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAnalytics, isSupported as isAnalyticsSupported } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
import { getMessaging, getToken, onMessage, isSupported as isMessagingSupported } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging.js";

// Firebase configuration for CRAD Diagnostic Services
export const firebaseConfig = {
  apiKey: "AIzaSyBHMpWikwkR8S17JIUILvnhcrlTt1y9sYU",
  authDomain: "crad-jos.firebaseapp.com",
  projectId: "crad-jos",
  storageBucket: "crad-jos.firebasestorage.app",
  messagingSenderId: "824736236605",
  appId: "1:824736236605:web:32323c63ed9c160d0e5654",
  measurementId: "G-6SRVPN9X8L"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Analytics if supported by environment
export let analytics = null;
isAnalyticsSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
    console.log('[Firebase] Analytics initialized successfully.');
  }
}).catch(err => {
  console.warn('[Firebase] Analytics not supported:', err.message);
});

// Messaging & Push Notifications
export let messaging = null;

/**
 * Initializes FCM and requests notification permissions
 * @returns {Promise<string|null>} FCM Registration Token
 */
export async function initPushNotifications() {
  try {
    const supported = await isMessagingSupported();
    if (!supported) {
      console.warn('[Firebase] Messaging not supported in this browser.');
      return null;
    }

    messaging = getMessaging(app);

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('[Firebase] Service Worker registered with scope:', registration.scope);

      // Listen for foreground messages
      onMessage(messaging, (payload) => {
        console.log('[Firebase] Foreground notification received:', payload);
        showInAppNotification(payload);
      });

      // Request permission if Notification API exists
      if ('Notification' in window && Notification.permission !== 'granted') {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          console.warn('[Firebase] Notification permission denied by user.');
          return null;
        }
      }

      // Retrieve FCM Token
      const currentToken = await getToken(messaging, {
        serviceWorkerRegistration: registration
      });

      if (currentToken) {
        console.log('[Firebase] FCM Registration Token:', currentToken);
        return currentToken;
      } else {
        console.warn('[Firebase] No registration token available. Request permission to generate one.');
        return null;
      }
    }
  } catch (error) {
    console.error('[Firebase] Error setting up Push Notifications:', error);
    return null;
  }
}

/**
 * In-App toast notification when app is in foreground
 */
function showInAppNotification(payload) {
  const title = payload.notification?.title || 'CRAD Diagnostic Notification';
  const body = payload.notification?.body || 'New message from CRAD Diagnostics.';

  const toast = document.createElement('div');
  toast.className = 'crad-push-toast';
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background: rgba(18, 18, 29, 0.95);
    border: 1px solid #A855F7;
    border-radius: 12px;
    padding: 16px 20px;
    color: #FFFFFF;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(168, 85, 247, 0.4);
    backdrop-filter: blur(12px);
    max-width: 360px;
    animation: toast-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  toast.innerHTML = `
    <div style="display:flex; align-items:flex-start; gap:12px;">
      <div style="width:36px; height:36px; border-radius:8px; background:rgba(168,85,247,0.15); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C084FC" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      </div>
      <div style="flex-grow:1;">
        <strong style="display:block; font-size:14px; margin-bottom:4px; color:#FFFFFF;">${title}</strong>
        <p style="margin:0; font-size:12px; color:#B0B0C4; line-height:1.4;">${body}</p>
      </div>
      <button style="color:#8E8EA8; cursor:pointer; border:none; background:none; padding:4px;" onclick="this.parentElement.parentElement.remove()">✕</button>
    </div>
  `;

  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 6000);
}

// Auto-initialize FCM when DOM is ready
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // Optional: prompt or initialize
    initPushNotifications();
  });
}
