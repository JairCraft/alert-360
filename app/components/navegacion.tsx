import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import SearchPage from '../NavigationPage/SearchPage';
import ProfilePage from '../NavigationPage/ProfilePage';
import CarPage from '../NavigationPage/CarPage';
import NotificationPage from '../NavigationPage/NotificationPage';

// Crear el Tab Navigator
const Tab = createBottomTabNavigator();

// Fondo con degradado en la barra inferior
const CustomTabBarBackground = () => (
  <LinearGradient colors={['#00a9b2', '#440b61']} style={StyleSheet.absoluteFillObject} />
);

// Componente de la flecha de volver
const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
      <Image source={require('../../Icons/flechaAtras.png')} style={{ width: 24, height: 24 }} />
    </TouchableOpacity>
  );
};

const NavigationBar: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true, // Mostrar la barra superior
        headerLeft: () => <BackButton />, // Agregar el botón de volver
        headerStyle: {
          backgroundColor: '#00a9b2', // Color de la barra superior
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
        },
        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === 'Search') {
            icon = focused ? require('../../Icons/busquedaActivo.png') : require('../../Icons/busqueda.png');
          } else if (route.name === 'Profile') {
            icon = focused ? require('../../Icons/usuarioActivo.png') : require('../../Icons/usuario.png');
          } else if (route.name === 'Car') {
            icon = focused ? require('../../Icons/carrosActivo.png') : require('../../Icons/carros.png');
          } else if (route.name === 'Notification') {
            icon = focused ? require('../../Icons/campanaActiva.png') : require('../../Icons/campana.png');
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
