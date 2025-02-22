import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { showToast } from '../components/ToastManager';
import messaging from "@react-native-firebase/messaging";

interface AlertOption {
  id: string;
  icon: any;
  label: string;
  message: string;
}

const alertOptions: AlertOption[] = [
  { id: '1', icon: require('../../Icons/telefonoActivo.png'), label: 'Llamar a un familiar', message: 'Contacta rápidamente a un familiar en caso de emergencia.' },
  { id: '2', icon: require('../../Icons/ubicacionActivo.png'), label: 'Compartir ubicación', message: 'Envía tu ubicación en tiempo real a tus contactos de confianza.' },
  { id: '3', icon: require('../../Icons/notificacionActiva.png'), label: 'Notificar a contactos de emergencia', message: 'Alerta a tus contactos de emergencia con un solo toque.' },
  { id: '4', icon: require('../../Icons/incidenteActivo.png'), label: 'Registrar incidente', message: 'Documenta cualquier situación de riesgo con detalles clave.' },
  { id: '5', icon: require('../../Icons/robo.png'), label: 'Robo, Atraco, Asalto', message: 'Reporta un robo o asalto y envía una alerta inmediata.' },
  { id: '6', icon: require('../../Icons/perdido.png'), label: 'Perdido, Desaparecido', message: 'Informa si alguien está desaparecido y comparte información clave.' },
];

const AlertOptionsPage: React.FC = () => {

  const handleUpdate = async () => {
    await messaging().sendMessage({
      data: {
        score: '850',
        time: '2:45'
      },
      token: ""
    })
    showToast("success", "Exito", "Alerta Enviada(SOLO ES UNA NOTA)");
  };

  const renderItem = ({ item }: { item: AlertOption }) => (
    <TouchableOpacity>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.iconTextContainer}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.optionText}>{item.label}</Text>
            <Text style={styles.textMessage}>{item.message}</Text>
            <TouchableOpacity style={styles.button} onPress={() => { handleUpdate() }}>
              <Text style={styles.buttonText}>ALERTAR!!!</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Opciones de Alerta</Text>
      <FlatList
        data={alertOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00a9b2',
    textAlign: 'center',
    marginBottom: 5,
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height / 2,
  },
  cardContent: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 20,
  },
  iconTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',// Garantiza que haya espacio suficiente
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 10,
    tintColor: '#00a9b2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#00a9b2', // Cambiado a un color más visible
    textAlign: 'center',
    //backgroundColor: '#fff', // Fondo temporal para asegurar que el texto sea visible
  },
  textMessage: {
    fontSize: 14,
    color: '#006e7f', // Cambiado a un color más visible
    textAlign: 'center',
    padding: 30,
  },
  button: {
    backgroundColor: '#00a9b2',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AlertOptionsPage;
