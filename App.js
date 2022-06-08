import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Box, NativeBaseProvider } from "native-base";
import { theme } from "./nativeBaseConfig";
import Welcome from "./src/screens/Welcome";



export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Welcome />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
