import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, Alert } from "react-native";

export default function RecoverPassword() {
  const [email, setEmail] = useState('');

  const handleRecover = () => {
    if (email.trim() === '') {
      alert('Por favor, ingresa tu correo electrónico');
      return;
    }
    // Muestra el mensaje de confirmación
    Alert.alert(
      '¡Éxito!',
      'Se ha enviado un enlace de recuperación a tu correo.',
      [
        {
          text: 'OK',
          onPress: () => router.push('/NavigationPage/InsertCode'), // Redirige a la página de inserción del código
        },
      ]
    );
  };

  return (
    <LinearGradient colors={['#00a9b2', '#440b61']} style={styles.container}>
      <Image source={require('../../Icons/logo.png')} style={styles.logo} />
      <Text style={styles.title}>¿No recuerdas tu contraseña?</Text>
      <Text style={styles.MessageRecove}>¡No te preocupes! Nos sucede a todos. Ingresa tu Correo y te ayudaremos</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRecover}>
        <Text style={styles.buttonText}>Solicitar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('../')}>
        <Text style={styles.backText}>Volver al inicio de sesión</Text>
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
  MessageRecove: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 50,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 40,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: 25,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 5,
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
  backText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
