import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { getUser } from "../service/userService";
import { SafeAreaView } from 'react-native-safe-area-context';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export default function ProfilePage() {
  const [user, setUser] = useState({ email: "", id: 0, name: "", phone: "" });

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

  return (
    <SafeAreaView>

      <View>
        <Text>ProfilePage</Text>
        {user ? (
          <View>
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
            <Text>{user.phone}</Text>
            <Text>{user.name}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}