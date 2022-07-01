import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Box, NativeBaseProvider } from "native-base";
import { theme } from "./nativeBaseConfig";
import Welcome from "./src/screens/Welcome";
import ContextProvider from "./ContextProvider";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Reacts, { useEffect } from "react";

export default function App() {

  React.useEffect(()=>{
    registerForPushNotification().then(token=>console.log(token)).catch(err => console.log(err))

},[])

async function registerForPushNotification(){
  const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status!='granted'){
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  }
  if (status !='granted') {
    alert('Falla en obtener el push token');
    return;
  }

  

}

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

