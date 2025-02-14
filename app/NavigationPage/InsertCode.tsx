import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, Alert } from "react-native";
import { confirmEmail, loginUser } from "../auth/auth-module";
import {
  getEmail,
  getPassword,
} from "../auth/storage";
import { CommonActions, NavigationProp, useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  NavigationBar: undefined;
};

export default function VerifyEmailPage() {
  const [code, setCode] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleVerifyCode = async () => {

    if (await confirmEmail(code)) { // Aquí debes poner la lógica para validar el código que se envió al correo
      const loginSuccess = await loginUser(await getEmail(), await getPassword());
      if (loginSuccess) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'NavigationBar' }],
          })
        );
      } else {
        alert('Login failed after registration');
      }
    } else {
      alert('Código incorrecto');
    }
  };

  return (
    <LinearGradient colors={['#00a9b2', '#440b61']} style={styles.container}>
      {/* Logo */}
      <Image source={require('../../Icons/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Verificación por correo</Text>
      <Text style={styles.MessageRecove}>Hemos enviado un número de verificación a tu correo.
        Introduce el código en el recuadro inferior
      </Text>

      {/* Contenedor para el icono y el campo de código */}
      <View style={styles.inputWithIconContainer}>
        <Image source={require('../../Icons/emailRecove.png')} style={styles.iconEmail} />
        <TextInput
          style={styles.input}
          placeholder="Código de verificación"
          placeholderTextColor="#fff"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
        />
      </View>

      {/* Botón de verificación */}
      <TouchableOpacity style={styles.button} onPress={() => handleVerifyCode()}>
        <Text style={styles.buttonText}>Verificar Código</Text>
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
  inputWithIconContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Alinea los elementos verticalmente
    marginBottom: 40,
    width: '80%', // Asegura que todo esté alineado con el contenedor de entrada
  },
  iconEmail: {
    width: 70,
    height: 70,
    marginRight: 10, // Espacio entre el icono y el campo de texto
  },
  input: {
    flex: 1, // El campo de entrada toma el espacio restante
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff',
    fontSize: 16,
    paddingVertical: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  MessageRecove: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 50,
    textAlign: 'center',
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
