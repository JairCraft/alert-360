import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image, Alert } from "react-native";

export default function NewPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = () => {
    if (password === confirmPassword) {
        Alert.alert(
            '¡Contraseña actualizada!',
            'Inicia Sesión Nuevamente',
            [
                {
                text: 'OK',
                onPress: () => router.push('/') 
                },
            ]
        );
    } else {
      setErrorMessage('Las contraseñas no coinciden');
    }
  };

  return (
    <LinearGradient colors={['#00a9b2', '#440b61']} style={styles.container}>

        <Image source={require('../../Icons/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Cambio de Contraseña</Text>
        <Text style={styles.MessageRecove}>Ingrese una contraseña que no haya usado anteriormente.
        </Text>
      {/* Campo para la nueva contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Nueva Contraseña"
        placeholderTextColor="#fff"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Campo para confirmar la nueva contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#fff"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Mensaje de error si las contraseñas no coinciden */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Botón de cambiar contraseña */}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#4facfe',
    fontSize: 18,
    fontWeight: 'bold',
  },
  MessageRecove: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 50,
    textAlign: 'center',
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 14,
    marginBottom: 20,
  },
});
