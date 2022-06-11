import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Box, NativeBaseProvider } from "native-base";
import { theme } from "./nativeBaseConfig";
import Welcome from "./src/screens/Welcome";
import ContextProvider from "./ContextProvider";

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
