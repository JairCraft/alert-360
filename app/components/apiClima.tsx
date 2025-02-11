import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const API_KEY = '3rmt2nk49zwkxr7enzgbeotvic05hbb1ri2icben'; // Tu clave API real
const DEFAULT_CITY = 'quito'; // Ciudad por defecto en caso de no obtener la ubicación

// Interfaz según la respuesta de la API de Meteosource
interface WeatherData {
  current: {
    temperature: number;
    icon: string; // Por ejemplo: "clear", "cloudy", etc.
  };
  error?: string;
}

// Opcional: Mapeo de iconos a URLs de imagen (modifícalo según tus recursos)
const iconMapping: Record<string, string> = {
  clear: 'https://www.meteosource.com/static/icons/clear.png',
  mostly_clear: 'https://www.meteosource.com/static/icons/mostly_clear.png',
  partly_sunny: 'https://www.meteosource.com/static/icons/partly_sunny.png',
  cloudy: 'https://www.meteosource.com/static/icons/cloudy.png',
  overcast: 'https://www.meteosource.com/static/icons/overcast.png',
  // Agrega más mapeos si es necesario
};

const WeatherInfo = () => {
  const [temperature, setTemperature] = useState<string | null>(null);
  const [icon, setIcon] = useState<string | null>(null);
  const [city, setCity] = useState<string>(DEFAULT_CITY);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Primer efecto: Obtener ubicación y determinar la ciudad mediante geocodificación inversa
  useEffect(() => {
    const getCityFromLocation = async () => {
      try {
        // Solicitar permisos de ubicación
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log("Permiso de ubicación denegado. Se usará la ciudad por defecto.");
          return; // Se mantiene DEFAULT_CITY
        }

        // Obtener la posición actual
        const location = await Location.getCurrentPositionAsync({});
        // Realizar geocodificación inversa para obtener información de la dirección
        const [reverseResult] = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (reverseResult && reverseResult.city) {
          setCity(reverseResult.city);
        } else {
          console.log("No se pudo determinar la ciudad, se usará la predeterminada.");
        }
      } catch (err) {
        console.error("Error al obtener la ubicación:", err);
      }
    };

    getCityFromLocation();
  }, []);

  // Segundo efecto: Obtener los datos del clima usando la ciudad (actualizada o por defecto)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (!API_KEY) {
          throw new Error('API Key no configurada. Asegúrate de agregar tu clave válida.');
        }

        // Construir la URL con la ciudad obtenida o por defecto
        const url = `https://www.meteosource.com/api/v1/free/point?place_id=${city}&sections=all&timezone=UTC&language=en&units=metric&key=${API_KEY}`;


        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: WeatherData = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setTemperature(`${Math.round(data.current.temperature)}°C`);
        setIcon(data.current.icon);
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'Unknown error';
        setError(errMsg);
        console.error('❌ Error obteniendo el clima:', errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]); // Se ejecuta cuando cambia la ciudad

  // Mapeo del ícono a una URL de imagen, si existe
  const mappedIconUrl = icon ? iconMapping[icon] || null : null;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Text style={styles.infoText}>
          {city} - {temperature}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WeatherInfo;