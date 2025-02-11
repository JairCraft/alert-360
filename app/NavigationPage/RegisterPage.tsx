import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, SafeAreaView } from "react-native";
import { registerUser } from "../auth/auth-module";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = async () => {
    const { res, value } = await registerUser(name, email, password, phone)
    if (res) {
      router.push('/NavigationPage/InsertCode'); // O la página que necesites
    } else {
      alert(value.name);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#00a9b2', '#440b61']} style={styles.gradient}>
        {/* Logo */}
        <Image source={require('../../Icons/logo.png')} style={styles.logo} />

        <Text style={styles.title}>¡Regístrate!</Text>

        {/* Campos de entrada */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#fff"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#fff"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            placeholderTextColor="#fff"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* Botón */}
        <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        {/* Texto inferior */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>
          <TouchableOpacity onPress={() => { router.push('../') }}>
            <Text style={styles.registerText}> Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
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
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20, // Espacio extra para evitar que quede tapado
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
  registerText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
});
