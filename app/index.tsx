import React, { useEffect, useState } from "react";
import MainNavigator from "./MainNavigator";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";
import { Platform } from "react-native";
import { firebase } from "@react-native-firebase/messaging";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Ensure Firebase is initialized once before using it
const initializeFirebase = async () => {
  if (!firebase.apps.length) {
    await firebase.initializeApp({
      apiKey: "AIzaSyCETRcJ0zPpmOo2l7av30R4CkdsCx9wgj4",
      projectId: "alert360-c580b",
      storageBucket: "alert360-c580b.firebasestorage.app",
      messagingSenderId: "943921982787",
      appId: "1:943921982787:android:b5a24cc1fa588d2a9f93f6",
    });
    console.log("Firebase initialized");
  }
};

export default function App() {
  const [firebaseReady, setFirebaseReady] = useState(false);

  useEffect(() => {
    const setupFirebase = async () => {
      await initializeFirebase();
      setFirebaseReady(true);
    };

    setupFirebase();
  }, []);

  useEffect(() => {
    if (!firebaseReady) return;

    registerForPushNotificationsAsync();

    const unsubscribe = firebase.messaging().onMessage(async (remoteMessage) => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
        },
        trigger: null,
      });
    });

    return () => unsubscribe();
  }, [firebaseReady]);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification);
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  return (
    <>
      <MainNavigator />
      <Toast />
    </>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return { token };
}
