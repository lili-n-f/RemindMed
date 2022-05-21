import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Box, NativeBaseProvider } from 'native-base';
import { theme } from './nativeBaseConfig';
import NavigationBar from './src/components/NavigationBar';

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <NavigationBar />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
