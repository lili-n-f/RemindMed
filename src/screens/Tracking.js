import { StyleSheet, View, ImageBackground } from "react-native";
import {
  StatusBar,
  HStack,
  Button,
  Text,
  FormControl,
  Select,
  Divider,
  Box,
} from "native-base";
import React from "react";
import AgendaScreen from './Calendar';
import { createStackNavigator } from '@react-navigation/stack';
import FormCalendar from './FormCalendar'
import { sizes, lightColors } from './colorThemes';

const Stack = createStackNavigator();
const image = { uri: "https://i.ibb.co/ypq3LQ1/fondo.png" };

function Agenda() {
  return (

    <Stack.Navigator>
    <Stack.Screen
      name="Agenda"
      component={AgendaScreen}
      options={{
        // headerStyleInterpolator: forFade,
        headerTintColor: 'white',
        headerShown: false,
        headerStyle: { backgroundColor: '#c0c0c0' },
        headerTitleStyle: { fontWeight: 'bold' }
    }}
    />
    <Stack.Screen
      name="Form"
      component={FormCalendar}
      options={{
        title: '',
        headerStyle: {
            height: sizes.base * 4,
            backgroundColor: '#FFFFFF', // or 'white
            borderBottomColor: "transparent",
            elevation: 0// for android



        },

        // headerRight: () => ( <MaterialCommunityIcons  onPress={() => console.log('Pressed')} name="dots-vertical" color={'#d7dbdd'} size={30} /> ),
        headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Pressed')}>
                <MaterialCommunityIcons name="dots-vertical" color={'#d7dbdd'} size={30} />
            </TouchableOpacity>
        ),
        headerBackImage: () => (<MaterialCommunityIcons name="keyboard-backspace" color={'#d7dbdd'} size={30} />),

        headerBackTitle: null,
        headerLeftContainerStyle: {
            alignItems: "center",
            marginLeft: sizes.base * 2,
            paddingRight: sizes.base
        },
        headerRightContainerStyle: {
            alignItems: "center",
            paddingRight: sizes.base,

        }


    }}
      
    />
  </Stack.Navigator>
    

  );
}




export default function Tracking() {
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <StatusBar />
      <View style={styles.container1}>
        <Box w="60">
          <Divider my="2" bg="green.500" thickness="4" />
        </Box>
        <Text style={styles.titulo}>Seguimiento</Text>
        <Box w="320">
          <Divider my="2" bg="green.500" thickness="4" />
        </Box>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: "#E5E5E5",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40,
    lineHeight: 40,
  },
  container1: {
    color: "#FFFF",
    marginTop: 20,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
});
