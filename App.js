import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Box, NativeBaseProvider } from "native-base";
import { theme } from "./nativeBaseConfig";
import Welcome from "./src/screens/Welcome";
import ContextProvider from "./ContextProvider"; //Al envolver todo en el ContextProvider podremos hacer uso del useAuthState y poder
//siempre observar el estado del usuario

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          <Welcome />
        </NativeBaseProvider>
      </NavigationContainer>
    </ContextProvider>
  );
}
