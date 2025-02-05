// FallDetectionTask.ts
/*import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { Accelerometer } from 'expo-sensors';

// Define la tarea que se ejecutará en segundo plano
TaskManager.defineTask('FALL_DETECTION_TASK', async ({ data, error }) => {
  if (error) {
    console.error('Error en la tarea de detección de caídas:', error);
    return;
  }

  if (data) {
    const { accelerometerData } = data;
    if (accelerometerData) {
      const { x, y, z } = accelerometerData;
      const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

      const FALL_THRESHOLD = 3.5; // Ajusta el umbral según sea necesario

      if (acceleration > FALL_THRESHOLD) {
        // Si detecta una posible caída, muestra una notificación interactiva
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '¡Posible Caída!',
            body: '¿Necesitas ayuda?',
            data: { type: 'fall-detected' },
          },
          trigger: null,  // Esto hará que la notificación se dispare inmediatamente
        });
      }
    }
  }
});
*/