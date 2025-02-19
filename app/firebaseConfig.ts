import firebase from "@react-native-firebase/app";
import "@react-native-firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCETRcJ0zPpmOo2l7av30R4CkdsCx9wgj4",
  projectId: "alert360-c580b",
  storageBucket: "alert360-c580b.firebasestorage.app",
  messagingSenderId: "943921982787",
  appId: "1:943921982787:android:b5a24cc1fa588d2a9f93f6",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = app.then(app => app.messaging());

export { messaging }

