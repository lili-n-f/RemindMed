import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Box, NativeBaseProvider } from "native-base";
import { theme } from "./nativeBaseConfig";
import Welcome from "./src/screens/Welcome";
import ContextProvider from "./ContextProvider";
import { UserContext } from "./ContextProvider";
import Loading from "./src/components/Loading";

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
