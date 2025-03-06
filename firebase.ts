import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCPItps8mrgRzwkTnHzX58lugCovMGl-EY',
  authDomain: 'reviewbit-420609.firebaseapp.com',
  projectId: 'reviewbit-420609',
  storageBucket: 'reviewbit-420609.firebasestorage.app',
  messagingSenderId: '301095914982',
  appId: '1:301095914982:web:cf83c931e1b450712ada27',
  measurementId: 'G-VEGF5H2DXQ',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    console.log("Checking if Firebase Messaging is supported...");
    const fcmMessaging = await messaging();

    if (!fcmMessaging) {
      console.warn("Firebase messaging is not supported in this browser.");
      return null;
    }

    console.log("Fetching token...");
    const token = await getToken(fcmMessaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
    });

    if (!token) {
      console.warn("No registration token available. Request permission.");
    } else {
      console.log("FCM Token:", token);
    }

    return token;
  } catch (err) {
    console.error("Error fetching FCM token:", err);
    return null;
  }
};



export { app, messaging };
