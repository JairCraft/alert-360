import React, { useEffect, useState } from "react";
import MainNavigator from "./MainNavigator";
import Toast from "react-native-toast-message";
import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid } from "react-native";
import { AcelerometroProvider } from "./components/AcelerometroContext";
import { storeFcmToken } from "./auth/storage";

export default function App() {
  useEffect(() => {
    const requestUserPermission = async () => {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)

      const authStatus = await messaging().requestPermission()

      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL

      if (enabled) {
        console.log('Auth status ' + authStatus);
        await messaging().registerDeviceForRemoteMessages()
        const token = await messaging().getToken()
        storeFcmToken(token)
        console.log('FCM token: ' + token);
      }
    }

    requestUserPermission()

  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("FCM Message received in foreground:", remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <AcelerometroProvider>
        <MainNavigator />
        <Toast />
      </AcelerometroProvider>
    </>
  );
}