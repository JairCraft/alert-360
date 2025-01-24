import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import SearchPage from '../NavigationPage/SearchPage';
import ProfilePage from '../NavigationPage/ProfilePage';
import CarPage from '../NavigationPage/CarPage';
import NotificationPage from '../NavigationPage/NotificationPage';

// Crear el Tab Navigator
const Tab = createBottomTabNavigator();

// Definir tipos para las rutas
type TabBarParamList = {
  Search: undefined;
  Profile: undefined;
  Car: undefined;
  Notification: undefined;
};

const CustomTabBarBackground = () => (
  <LinearGradient
    colors={['#00a9b2', '#440b61']}
    style={StyleSheet.absoluteFillObject}
  />
);

const NavigationBar: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon: any;

          // Asignar íconos según la ruta
          if (route.name === 'Search') {
            icon = focused
              ? require('../../Icons/busquedaActivo.png') // Ícono activo
              : require('../../Icons/busqueda.png'); // Ícono inactivo
          } else if (route.name === 'Profile') {
            icon = focused
              ? require('../../Icons/usuarioActivo.png') // Ícono activo
              : require('../../Icons/usuario.png'); // Ícono inactivo
          } else if (route.name === 'Car') {
            icon = focused
              ? require('../../Icons/carrosActivo.png') // Ícono activo
              : require('../../Icons/carros.png'); // Ícono inactivo
          } else if (route.name === 'Notification') {
            icon = focused
              ? require('../../Icons/campanaActiva.png') // Ícono activo
              : require('../../Icons/campana.png'); // Ícono inactivo
          }

           return (
            <Image
              source={icon}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? '#fff' : '#d3d3d3',
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0, // Eliminar sombras en Android
          position: 'absolute',
        },
        tabBarBackground: () => <CustomTabBarBackground />,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#d3d3d3',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          paddingBottom: 5,
        },
        headerShown: false, // Ocultar encabezado superior
      })}
    >
      
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen name="Car" component={CarPage} />
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Notification" component={NotificationPage} />
    </Tab.Navigator>
  );
};

export default NavigationBar;
