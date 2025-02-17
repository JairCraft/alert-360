/*import React from 'react';
import MainNavigator from './MainNavigator';

export default function App() {
  return <MainNavigator />;
}*/

import React from 'react';
import MainNavigator from './MainNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <MainNavigator />
      <Toast />
    </>
  );
}