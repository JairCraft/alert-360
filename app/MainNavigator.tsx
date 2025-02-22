// filepath: /c:/Users/jairg/OneDrive/Documentos/node-projects/alert-360/app/MainNavigator.tsx
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, BackHandler, Alert, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LoginComponent from './NavigationPage/LoginComponent';
import RegisterPage from './NavigationPage/RegisterPage';
import SearchPage from './NavigationPage/SearchPage';
import ProfilePage from './NavigationPage/ProfilePage';
import CarPage from './NavigationPage/ConfigPage';
import AlertPage from './NavigationPage/AlertPage';
import InsertCode from './NavigationPage/InsertCode';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileData from './NavigationPage/ProfileData'
import PassConfig from './NavigationPage/PassConfig';
import ConfigPage from './NavigationPage/ConfigPage';
import ContactPage from './NavigationPage/ContactPage';
import NotificationPage from './NavigationPage/NotificationPage';
import AccelerometerSensor from './components/AccelerometerSensor';
import { FallContext } from './components/FallContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBarBackground = () => (
    <LinearGradient colors={['#00a9b2', '#440b61']} style={StyleSheet.absoluteFillObject} />
);

const NavigationBar = () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor={"#00a9b2"} />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#00a9b2',
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
                            icon = focused ? require('../Icons/busquedaActivo.png') : require('../Icons/busqueda.png');
                        } else if (route.name === 'Perfil') {
                            icon = focused ? require('../Icons/usuarioActivo.png') : require('../Icons/usuario.png');
                        } else if (route.name === 'Configuración') {
                            icon = focused ? require('../Icons/configuracionUserActivo.png') : require('../Icons/configuracionUser.png');
                        } else if (route.name === 'Notificaciones') {
                            icon = focused ? require('../Icons/notificacionActiva.png') : require('../Icons/notificacion.png');
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
                        elevation: 0,
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
                <Tab.Screen name="Perfil" component={ProfilePage} />
                <Tab.Screen name="Search" component={SearchPage} />
                <Tab.Screen name="Notificaciones" component={NotificationPage} />
                <Tab.Screen name="Configuración" component={CarPage} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

const MainNavigator = () => {
    const { isFallDetected } = useContext(FallContext);
return (    
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        // Se ajusta el color de la cabecera según el estado de detección de caídas
        headerStyle: {
          backgroundColor: isFallDetected ? 'red' : '#00a9b2',
          //shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginComponent} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
      <Stack.Screen name="InsertCode" component={InsertCode} options={{ headerShown: false }} />
      <Stack.Screen name="NavigationBar" component={NavigationBar} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileData" component={ProfileData} options={{ headerShown: true }} />
      <Stack.Screen name="PassConfig" component={PassConfig} options={{ headerShown: true }} />
      <Stack.Screen name="ConfigPage" component={ConfigPage} options={{ headerShown: true }} />
      <Stack.Screen name="ContactPage" component={ContactPage} options={{ headerShown: true }} />
      <Stack.Screen name="NotificationPage" component={NotificationPage} options={{ headerShown: true }} />
      <Stack.Screen name="AccelerometerSensor" component={AccelerometerSensor} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

export default MainNavigator;