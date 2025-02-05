import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const AccelerometerSensor = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState<any>(null);
  const [isFallDetected, setIsFallDetected] = useState(false);

  useEffect(() => {
    const _subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      checkForFall(accelerometerData);
    });

    // Start the accelerometer with a specified update interval
    Accelerometer.setUpdateInterval(100); // update every 100 ms

    // Cleanup the subscription on component unmount
    return () => _subscription.remove();
  }, []);

  const checkForFall = (accelerometerData: any) => {
    // Calculate the magnitude of the acceleration vector (sqrt(x^2 + y^2 + z^2))
    const acceleration = Math.sqrt(accelerometerData.x ** 2 + accelerometerData.y ** 2 + accelerometerData.z ** 2);

    // Threshold values for detecting a fall (tune these based on testing)
    const fallThreshold = 3.5;  // A sudden high acceleration can indicate a fall
    const restThreshold = 1.0;  // A low acceleration after the impact indicates rest

    if (acceleration > fallThreshold) {
      setIsFallDetected(true);
    } else if (acceleration < restThreshold) {
      setIsFallDetected(false);
    }
  };

  return (
  <View style={[styles.container, isFallDetected && styles.fallContainer]}>
    <Text style={styles.text}>Accelerometer Data:</Text>
    <Text style={styles.dataText}>X: {data.x.toFixed(2)}</Text>
    <Text style={styles.dataText}>Y: {data.y.toFixed(2)}</Text>
    <Text style={styles.dataText}>Z: {data.z.toFixed(2)}</Text>
    {isFallDetected && <Text style={styles.fallText}>POSIBLE CAIDA!</Text>}
  </View>
);

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  fallContainer: {
    backgroundColor: 'red', // Cambia el color de fondo a rojo
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dataText: {
    fontSize: 18,
    marginTop: 10,
  },
  fallText: {
    fontSize: 24,
    color: 'white',  // Cambia el color del texto a blanco para mejor contraste
    marginTop: 20,
  },
});


export default AccelerometerSensor;
