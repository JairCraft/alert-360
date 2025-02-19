import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';

interface AlertOption {
  id: string;
  icon: any;
  label: string;
}

const alertOptions: AlertOption[] = [
  { id: '1', icon: require('../../Icons/telefonoActivo.png'), label: 'Llamar a un familiar' },
  { id: '2', icon: require('../../Icons/ubicacionActivo.png'), label: 'Compartir ubicación' },
  { id: '3', icon: require('../../Icons/notificacionActiva.png'), label: 'Notificar a contactos de emergencia' },
  { id: '4', icon: require('../../Icons/incidenteActivo.png'), label: 'Registrar incidente' },
  { id: '5', icon: require('../../Icons/robo.png'), label: 'Robo, Atraco, Asalto' },
  { id: '6', icon: require('../../Icons/perdido.png'), label: 'Perdido, Desaparecido' },
];

const AlertOptionsPage: React.FC = () => {
  const renderItem = ({ item }: { item: AlertOption }) => (
    <TouchableOpacity>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.optionText}>{item.label}</Text>
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
    marginBottom: 20,
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
    alignItems: 'center',
    flex: 1, // Garantiza que haya espacio suficiente
  },
  icon: {
    width: 10,
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
});

export default AlertOptionsPage;
