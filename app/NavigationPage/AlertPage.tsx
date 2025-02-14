import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AlertOptionsPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Opciones de Alerta</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <Image source={require('../../Icons/telefono.png')} style={styles.icon} />
          <Text style={styles.optionText}>Llamar a un familiar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Image source={require('../../Icons/ubicacion.png')} style={styles.icon} />
          <Text style={styles.optionText}>Compartir ubicación</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Image source={require('../../Icons/notificacion.png')} style={styles.icon} />
          <Text style={styles.optionText}>Notificar a contactos de emergencia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Image source={require('../../Icons/incidente.png')} style={styles.icon} />
          <Text style={styles.optionText}>Registrar incidente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00a9b2',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    borderRadius: 15,

  }, 
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(169, 175, 175, 0.4)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: '#00a9b2',
  },
  optionText: {
    fontSize: 18,
    color: '#00a9b2',
    flex: 1,
  },
});

export default AlertOptionsPage;
