// AccelerometerSensor.tsx
import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { FallContext } from "./FallContext"; // Asegúrate de la ruta correcta

const AccelerometerSensor = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const { setIsFallDetected } = useContext(FallContext);

  useEffect(() => {
    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      checkForFall(accelerometerData);
    });
    
    Accelerometer.setUpdateInterval(100);

    return () => subscription && subscription.remove();
  }, []);

  const checkForFall = (accelerometerData: any) => {
    const acceleration = Math.sqrt(
      accelerometerData.x ** 2 +
      accelerometerData.y ** 2 +
      accelerometerData.z ** 2
    );
    const fallThreshold = 1.5;
    const restThreshold = 1.5;

    if (acceleration > fallThreshold) {
      setIsFallDetected(true);
    } else if (acceleration < restThreshold) {
      setIsFallDetected(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer Data:</Text>
      <Text style={styles.dataText}>X: {data.x.toFixed(2)}</Text>
      <Text style={styles.dataText}>Y: {data.y.toFixed(2)}</Text>
      <Text style={styles.dataText}>Z: {data.z.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dataText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default AccelerometerSensor;
