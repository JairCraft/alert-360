import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, NavigationProp, CommonActions } from '@react-navigation/native';
import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, StatusBar, ActivityIndicator  } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginUser } from "../auth/auth-module";


type RootStackParamList = {
    NavigationBar: undefined;
    RegisterPage: undefined;
    Profile: undefined;
    AccelerometerSensor: undefined;
};

export default function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);  // Estado para controlar la carga
    const [appLoaded, setAppLoaded] = useState(false);  // Nuevo estado para controlar si la app está lista

    const handleLogin = async () => {
        setLoading(true);  // Activar el spinner de carga
        const success = await loginUser(email, password);
        setLoading(false);   // Desactivar el spinner cuando el login termine

        if (success) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'NavigationBar' }],
                })
            );
        } else {
            alert('Credenciales incorrectas');
        }
    };

    React.useEffect(() => {
        setTimeout(() => setAppLoaded(true), 2000);  // Simula el tiempo de carga de la app
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>

            <StatusBar barStyle="light-content" backgroundColor={"#00a9b2"} />

            <LinearGradient colors={['#00a9b2', '#440b61']} style={styles.container}>

                {/* Mostrar el logo hasta que se cargue la app */}
                {!appLoaded ? (
                    <Image source={require('../../Icons/logo.png')} style={styles.logo} />
                ) : (
                <>
                {/* Logo */}
                <Image source={require('../../Icons/logo.png')} style={styles.logo} />

                <Text style={styles.title}>Bienvenido!</Text>

                {/* Campos de entrada */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Correo"
                        placeholderTextColor="#fff"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                    
                    <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderColor: "#fff" }}>
                        <TextInput
                            style={{ flex: 1, color: "#fff",fontSize: 16}}
                            placeholder="Contraseña"
                            placeholderTextColor="#fff"
                            secureTextEntry={!isVisible}
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                            <Image
                            source={isVisible ? require("../../Icons/monodestapado.png") : require("../../Icons/monotapado.png")}
                            style={{ width: 24, height: 24, marginRight: 10 }}
                            />
                        </TouchableOpacity>
                        </View>
                </View>

                {/* Checkbox y texto */}
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={() => setChecked(!checked)} style={styles.checkbox}>
                        <View style={[styles.checkboxBox, checked && styles.checkboxChecked]} />
                    </TouchableOpacity>
                    <Text style={styles.checkboxText}>Recordar mis credenciales</Text>
                </View>


                {/* Botón */}
                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#4facfe" />
                    ) : (
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    )}
                </TouchableOpacity>

                {/* Texto inferior */}
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>¿No tienes cuenta?</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("RegisterPage") }}>
                        <Text style={styles.registerText}> Regístrate</Text>
                    </TouchableOpacity>
                        </View>
                    </>
                )}
            </LinearGradient>
        </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 10,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        marginBottom: 25,
        color: '#fff',
        fontSize: 16,
        paddingVertical: 5,
    },
    forgotPasswordText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'right',
        marginTop: 5,
        textDecorationLine: 'underline',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxBox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 3,
    },
    checkboxChecked: {
        backgroundColor: '#fff',
    },
    checkboxText: {
        color: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 20,
    },
    buttonText: {
        color: '#4facfe',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerText: {
        color: '#fff',
        fontSize: 14,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    registerText: {
        color: '#fff',
        fontSize: 14,
        textDecorationLine: 'underline',
        marginLeft: 5,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
    }
});