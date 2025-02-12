import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, NavigationProp, CommonActions } from '@react-navigation/native';
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginUser } from "../auth/auth-module";

type RootStackParamList = {
    NavigationBar: undefined;
    RegisterPage: undefined;
    Profile: undefined;
};

export default function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleLogin = async () => {
        if (await loginUser(email, password)) {
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={"#00a9b2"} />
            <LinearGradient colors={['#00a9b2', '#440b61']} style={styles.container}>
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
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="#fff"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                    />
                </View>

                {/* Checkbox y texto */}
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={() => setChecked(!checked)} style={styles.checkbox}>
                        <View style={[styles.checkboxBox, checked && styles.checkboxChecked]} />
                    </TouchableOpacity>
                    <Text style={styles.checkboxText}>Recordar mis credenciales</Text>
                </View>

                {/* Botón */}
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                {/* Texto inferior */}
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>¿No tienes cuenta?</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("RegisterPage") }}>
                        <Text style={styles.registerText}> Regístrate</Text>
                    </TouchableOpacity>
                </View>
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