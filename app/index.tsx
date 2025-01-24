import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import loginUser from "./auth/loginUser";

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const handleLogin = () => {
    if (email === 'sebas' && password === '123') {
      router.push('../components/NavigationBar');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <LinearGradient colors={['#00a9b2', '#440b61']} style={styles.container}>
      {/* Logo */}
      <Image source={require('../Icons/logo.png')} style={styles.logo} />


      <Text style={styles.title}>Bienvenido! Jair wa here</Text>

      {/* Campos de entrada */}
      <View style={styles.inputContainer}>
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
        <TouchableOpacity onPress={() => alert('Funcionalidad de recuperar contraseña')}>
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

      {/* Checkbox y texto */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setChecked(!checked)} style={styles.checkbox}>
          <View style={[styles.checkboxBox, checked && styles.checkboxChecked]} />
        </TouchableOpacity>
        <Text style={styles.checkboxText}>Recordar mis credenciales</Text>
      </View>

      {/* Botón */}
      {/*<TouchableOpacity style={styles.button} onPress={() => { loginUser(email, password) }} >*/}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Texto inferior */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => { router.push('/NavigationPage/RegisterPage') }}>
          <Text style={styles.registerText}> Regístrate</Text>
        </TouchableOpacity>
      </View>
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
    textDecorationLine: 'underline', // Efecto de enlace
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
    flexDirection: 'row', // Coloca los elementos en una fila
    justifyContent: 'center', // Centra el contenido horizontalmente
    alignItems: 'center', // Alinea verticalmente
    marginTop: 20,
  },
  registerText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginLeft: 5, // Espacio entre los textos
  },
});