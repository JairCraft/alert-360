// src/components/ToastManager.tsx
import React from 'react';
import Toast from 'react-native-toast-message';

const ToastManager = () => {
  return <Toast />;
};

export const showToast = (
  type: 'success' | 'error' | 'info',
  text1: string,
  text2?: string,
  visibilityTime: number = 4000 // Valor por defecto 4 segundos
) => {
  Toast.show({
    type,
    text1,
    text2,
    visibilityTime, // Controla el tiempo en milisegundos
  });
};

export default ToastManager;
