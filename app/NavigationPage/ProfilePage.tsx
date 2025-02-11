import React from 'react';
import { View, Text } from 'react-native';
import { PermissionsAndroid } from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const ProfilePage = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Página de Perfil exitosa</Text>
  </View>
);

export default ProfilePage;