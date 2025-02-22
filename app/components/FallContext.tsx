// FallContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface FallContextType {
  isFallDetected: boolean;
  setIsFallDetected: (detected: boolean) => void;
}

export const FallContext = createContext<FallContextType>({
  isFallDetected: false,
  setIsFallDetected: () => {},
});

export const FallProvider = ({ children }: { children: ReactNode }) => {
  const [isFallDetected, setIsFallDetected] = useState(false);
  
  return (
    <FallContext.Provider value={{ isFallDetected, setIsFallDetected }}>
      {children}
    </FallContext.Provider>
  );
};
