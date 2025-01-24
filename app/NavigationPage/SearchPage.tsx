import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const SearchPage = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef = useRef<MapView | null>(null); // Referencia para el mapa

  useEffect(() => {
    getCurrentLocation(); // Llamar para obtener la ubicación inicial solo una vez
  }, []);

  // Obtener la ubicación actual
  const getCurrentLocation = async () => {
    // Pedir permiso para acceder a la ubicación
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permiso de ubicación denegado.');
      return;
    }

    try {
      // Obtener ubicación actual solo una vez
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location); // Establecer la ubicación
    } catch (error) {
      setErrorMsg('No se pudo obtener la ubicación.');
    }
  };

  // Función para centrar el mapa en la ubicación actual
  const centerMapOnLocation = () => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01, // Nivel de zoom
          longitudeDelta: 0.01,
        },
        1000 // Duración de la animación
      );
    }
  };

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : location ? (
        <>
          <MapView
            style={styles.map}
            ref={mapRef} // Referencia al mapa
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01, // Nivel de zoom inicial
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Mi ubicación"
              description="Aquí estoy ahora."
            />
          </MapView>

          {/* Icono de localización */}
          <TouchableOpacity
            style={styles.locationButton}
            onPress={centerMapOnLocation} // Centrar el mapa sin pedir la ubicación nuevamente
          >
            <Image
              source={require('../../Icons/localizacion.png')}
              style={styles.locationIcon}
            />
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator size="large" color="#00a9b2" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  locationButton: {
    position: 'absolute',
    top: 630, // Ajusta la posición vertical
    right: 20, // Ajusta la posición horizontal
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo semitransparente
    borderRadius: 50,
    padding: 10,
  },
  locationIcon: {
    width: 40,
    height: 40,
  },
});

export default SearchPage;
