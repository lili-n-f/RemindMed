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
const image = { uri: "https://i.ibb.co/ypq3LQ1/fondo.png" };

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
