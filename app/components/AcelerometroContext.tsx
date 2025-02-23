import React, { createContext, useState, useEffect, useContext } from "react";
import { Accelerometer } from "expo-sensors";
import { showToast } from '../components/ToastManager';
import constants from "expo-constants";

interface AcelerometroContextType {
  data: { x: number; y: number; z: number };
}

const AcelerometroContext = createContext<AcelerometroContextType | undefined>(undefined);

export const AcelerometroProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

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

    const checkForFall = async (accelerometerData: any) => {
    // Calculate the magnitude of the acceleration vector (sqrt(x^2 + y^2 + z^2))
    const acceleration = Math.sqrt(accelerometerData.x ** 2 + accelerometerData.y ** 2 + accelerometerData.z ** 2);

    // Threshold values for detecting a fall (tune these based on testing)
    const fallThreshold = 3.5;  // A sudden high acceleration can indicate a fall
    const restThreshold = 1.0;  // A low acceleration after the impact indicates rest

    if (acceleration > fallThreshold) {
        console.log("POSIBLE CAIDA");
        showToast("error", "ESTAS BIEN?", "Alerta Enviada");

        try {
            const response = await fetch((constants.expoConfig?.extra?.["API_ENDPOINT"] ?? "") + "/send-notification", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            token: 'cemAadMqSmCBaJc1UdeW_B:APA91bFidaX_BZ0OPMfpY0Du1QyOapGjlnRF-r1zbSOgj6q8DeiRtgVYs0OxrgWRKkkjr0-hroeg-pJ9Xssett4O7fdmZyo4LiLgdH5jZ6qXa0hEsOOKWj0',
            title: "POSIBLE CAIDA",
            body: "Comunicarse con su Familiar lo mas pronto posible",
            }),
        });

        const result = await response.json();
        console.log(result);

        } catch (error) {
        console.log('Error sending message:', error);
        }

        } else if (acceleration < restThreshold) {
            //console.log("NO SE CAYO");
        }
    };

  return <AcelerometroContext.Provider value={{ data }}>{children}</AcelerometroContext.Provider>;
};




export const useAcelerometro = () => {
  const context = useContext(AcelerometroContext);
  if (!context) {
    throw new Error("useAcelerometro debe usarse dentro de AcelerometroProvider");
  }
  return context;
};
