import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCETRcJ0zPpmOo2l7av30R4CkdsCx9wgj4",
  authDomain: [],
  projectId: "alert360-c580b",
  storageBucket: "alert360-c580b.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
