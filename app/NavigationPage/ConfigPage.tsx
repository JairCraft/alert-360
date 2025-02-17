import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { loginUser } from "../auth/auth-module";
import { useNavigation, NavigationProp, CommonActions } from '@react-navigation/native';

type RootStackParamList = {
    NavigationBar: undefined;
    RegisterPage: undefined;
    Profile: undefined;
    ProfileData: undefined;
    PassConfig: undefined;
};

export default function ConfigPage() {
//const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

const handleLogout = () => {
  navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        })
    );
};

  
  return (
    <LinearGradient colors={['#00a9b2', '#440b61']} style={styles.container}>
      <Text style={styles.header}>Configuración</Text>
      
      <TouchableOpacity style={styles.option} onPress={() => { navigation.navigate("ProfileData") }}>
        <Image source={require('../../Icons/usuario.png')} style={styles.icon} />
        <Text style={styles.optionText}>Editar perfil</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.option} onPress={() => { navigation.navigate("PassConfig") }}>
        <Image source={require('../../Icons/candado.png')} style={styles.icon} />
        <Text style={styles.optionText}>Cambiar contraseña</Text>
      </TouchableOpacity> 
      
      <TouchableOpacity style={styles.option}>
        <Image source={require('../../Icons/contactos.png')} style={styles.icon} />
        <Text style={styles.optionText}>Administrar contactos de emergencia</Text>
      </TouchableOpacity>
      
      <View style={styles.option}>
        <Image source={require('../../Icons/advertencia.png')} style={styles.icon} />
        <Text style={styles.optionText}>Notificaciones</Text>
        <Switch
          value={notificationsEnabled} 
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#767577', true: '#00a9b2' }}
          thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
        />
      </View>
      
      <TouchableOpacity style={[styles.option, styles.logout]} onPress={handleLogout}>
  <Image source={require('../../Icons/salir.png')} style={styles.icon} />
  <Text style={styles.optionText}>Cerrar sesión</Text>
</TouchableOpacity>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: '#fff',
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
    flex: 1,
  },
  logout: {
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
  },
});

