import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { getUser, getProfileByUser } from "../service/userService";
import { SafeAreaView } from 'react-native-safe-area-context';
import Welcome from "../components/Welcome";
import AlertButton from "../components/AlertButton";
import AlertOption from "./AlertPage";

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export default function ProfilePage() {
  const [user, setUser] = useState({ email: "", id: 0, name: "", phone: "" });
  const [img, setImg] = useState("")

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData: { email: string, id: number, name: string, phone: string } = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchAvatar() {
      try {
        const picture = await getProfileByUser(user.name.split(' ')[0]);

        setImg(picture.url);
        console.log(picture.url);

      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    fetchAvatar()
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      {user ? (
        <Welcome img={img} user={user} />
      ) : (
        <Text>Loading...</Text>
      )
      }
      <AlertOption />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  safeArea: { width: '100%', flex: 1, height: '100%' },
});
