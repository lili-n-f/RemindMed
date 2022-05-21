import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Box, NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Box
          alignSelf="center"
          bg="primary.500"
          _text={{
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'warmGray.50',
            letterSpacing: 'lg',
          }}
          style={{ marginBottom: 'auto', marginTop: 'auto' }}
        >
          Hello world
        </Box>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
