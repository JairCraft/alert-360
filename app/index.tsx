import React, { useEffect, useState } from "react";
import MainNavigator from "./MainNavigator";
import Toast from "react-native-toast-message";
import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid } from "react-native";


export default function App() {
  useEffect(() => {
    const requestUserPermission = async () => {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
      console.log('hola');

      await messaging().registerDeviceForRemoteMessages()
      console.log('adios');

      //const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL

      /* if (enabled) {
        console.log('Auth status ' + authStatus);
      } */
      const token = await messaging().getToken()
      console.log('FCM token: ' + token);
    }
    /* 
        const message = await messaging().getInitialNotification();
    
        const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
    
        }); */
    console.log('useEfeect');

    requestUserPermission()
    console.log('useEfeect pass');

  }, [])
  /* 
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  
    const foreground = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
  
    });
  
    foreground(); */



  return (
    <>
      <MainNavigator />
      <Toast />
    </>
  );
}