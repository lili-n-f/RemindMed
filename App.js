import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Box, NativeBaseProvider } from 'native-base';
import { theme } from './nativeBaseConfig';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Box
        alignSelf="center"
        bg="primary.500"
        _text={{
          fontFamily: 'heading',
          color: 'platinum.500',
          letterSpacing: 'lg',
        }}
        style={{ marginBottom: 'auto', marginTop: 'auto' }}
      >
        Hello world
      </Box>
    </NativeBaseProvider>
  );
}
