// filepath: /c:/Users/jairg/OneDrive/Documentos/node-projects/alert-360/app/MainNavigator.tsx
import React from 'react';
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
                        } else if (route.name === 'Alerta') {
                            icon = focused ? require('../Icons/advertenciaActivo.png') : require('../Icons/advertencia.png');
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
                <Tab.Screen name="Alerta" component={AlertPage} />
                <Tab.Screen name="Configuración" component={CarPage} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

const MainNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginComponent} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
            <Stack.Screen name="InsertCode" component={InsertCode} options={{ headerShown: false }} />
            <Stack.Screen name="NavigationBar" component={NavigationBar} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default MainNavigator;