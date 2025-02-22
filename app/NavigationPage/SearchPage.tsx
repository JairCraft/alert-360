import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const GOOGLE_PLACES_API_KEY = 'TU_API_KEY_AQUI'; // Reemplaza con tu clave

// Define la interfaz para los hospitales según la respuesta de Google Places API
interface Hospital {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  vicinity: string;
}

const SearchPage = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Obtener la ubicación actual
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permiso de ubicación denegado.');
      return;
    }

    try {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      fetchHospitals(loc.coords.latitude, loc.coords.longitude);
    } catch (error) {
      setErrorMsg('No se pudo obtener la ubicación.');
    }
  };

  // Buscar hospitales cercanos usando Google Places API
  const fetchHospitals = async (latitude: number, longitude: number) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=AIzaSyDd3NspaS2iCdQ4OrdX76dB7qO_W1H-Myw`;

    try {
      let response = await fetch(url);
      let data = await response.json();
      setHospitals(data.results);
    } catch (error) {
      console.error('Error obteniendo hospitales:', error);
    }
  };

  // Función para centrar el mapa en la ubicación actual
  const centerMapOnLocation = () => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
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
            ref={mapRef}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {/* Marcador de la ubicación del usuario */}
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Mi ubicación"
              description="Aquí estoy ahora."
              pinColor="red"
            />

            {/* Marcadores de hospitales */}
            {hospitals.map((hospital, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: hospital.geometry.location.lat,
                  longitude: hospital.geometry.location.lng,
                }}
                title={hospital.name}
                description={hospital.vicinity}
                image={require('../../Icons/hospital.png')}
              />
            ))}
          </MapView>

          {/* Botón para centrar la ubicación */}
          <TouchableOpacity style={styles.locationButton} onPress={centerMapOnLocation}>
            <Image source={require('../../Icons/localizacion.png')} style={styles.locationIcon} />
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
    top: 540,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 50,
    padding: 10,
  },
  locationIcon: {
    width: 40,
    height: 40,
  },
});

export default SearchPage;
