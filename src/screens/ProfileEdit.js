import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, ScrollView } from "react-native";
import {
  Box,
  StatusBar,
  Text,
  Select,
  Divider,
  Input,
  HStack,
  Button,
  TextArea,
} from "native-base";
import Icon, { Icons } from "../components/Icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const image = { uri: "https://i.ibb.co/ypq3LQ1/fondo.png" };

export default function Profile({ data }) {
  const [showDate, setShowDate] = useState(false);
  const [textDate, setTextDate] = useState("DD/MM/YYYY");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(false);
    let tempDate =
      currentDate.getDate() +
      "/" +
      (currentDate.getMonth() + 1) +
      "/" +
      currentDate.getFullYear();
    setTextDate(tempDate);
  };

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container1}>
        <Box w="60">
          <Divider my="2" bg="green.500" thickness="4" />
        </Box>
        <Text style={styles.titulo}>Editar perfil</Text>
        <Box w="300">
          <Divider my="2" bg="green.500" thickness="4" />
        </Box>
      </View>
      <View style={{ paddingBottom: 200, paddingTop: 5 }}>
        <ScrollView top={30} marginRight={20} marginLeft={20}>
          <View style={styles.containerQ}>
            <Text color="platinum.500" fontWeight="bold" margin={1}>
              Nombre:
            </Text>
            <Input
              backgroundColor="white"
              borderRadius="20"
              minWidth="100%"
              borderColor="primary.300"
              placeholderTextColor="gray.500"
              accessibilityLabel="Edite su nombre"
              placeholder="Escriba su nombre" //NOMBRE TO-DO
            />
          </View>
          <View style={styles.containerQ}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color="platinum.500" fontWeight="bold" margin={1}>
                Fecha de nacimiento:
              </Text>
              <Text color="platinum.500" margin={1}>
                {textDate}
              </Text>
              <Button
                borderRadius="full"
                style={{ alignSelf: "flex-start" }}
                onPress={() => {
                  setShowDate(true);
                }}
              >
                <Icon
                  type={Icons.MaterialCommunityIcons}
                  name={"calendar"}
                  color={"white"}
                />
              </Button>
            </HStack>

            {showDate ? (
              <DateTimePicker
                mode="date"
                value={new Date()}
                maximumDate={new Date()}
                onChange={onChangeDate}
              />
            ) : null}
          </View>

          <View style={styles.containerQ}>
            <Text color="platinum.500" fontWeight="bold" margin={1}>
              Sexo:
            </Text>
            <Select
              backgroundColor="white"
              borderRadius="20"
              minWidth="100%"
              borderColor="primary.300"
              placeholderTextColor="gray.500"
              accessibilityLabel="Seleccione su sexo"
              placeholder="Seleccione su sexo"
            >
              <Select.Item //selección de sexo
                label="Mujer"
                value="mujer"
              />
              <Select.Item label="Hombre" value="hombre" />
              <Select.Item
                label="Prefiero no responder"
                value="na" //puse esto como un no aplica
              />
            </Select>
          </View>

          <View style={styles.containerQ}>
            <Text color="platinum.500" fontWeight="bold" margin={1}>
              Grupo sanguíneo:
            </Text>
            <HStack justifyContent="space-between">
              <Select
                backgroundColor="white"
                borderRadius="20"
                minWidth="100%"
                borderColor="primary.300"
                placeholderTextColor="gray.500"
                accessibilityLabel="Seleccione su grupo sanguíneo"
                placeholder="Seleccione su grupo sanguíneo"
              >
                <Select.Item //Tipos de sangre
                  label="A+"
                  value="a positivo"
                />
                <Select.Item label="A-" value="a negativo" />
                <Select.Item label="B+" value="b positivo" />
                <Select.Item label="B-" value="b negativo" />
                <Select.Item label="AB+" value="ab positivo" />
                <Select.Item label="AB-" value="ab negativo" />
                <Select.Item label="O+" value="o positivo" />
                <Select.Item label="O-" value="o negativo" />
              </Select>
            </HStack>
          </View>

          <View style={styles.containerQ}>
            <Text color="platinum.500" fontWeight="bold" margin={1}>
              Notas:
            </Text>
            <Box alignItems="center" w="100%">
              <TextArea
                h={40}
                placeholder="Agregue sus notas (alergias, condiciones médicas, otros)"
                placeholderTextColor="gray.500"
                fontSize={13}
                w="100%"
                maxW="400"
                backgroundColor="white"
                borderRadius="20"
                borderColor="primary.300"
              />
            </Box>
          </View>
          <Button
            borderRadius={"10"}
            marginTop={"5"}
            alignSelf={"flex-end"}
            width="25%"
            onPress={() => {}} //TO-DO GUARDADO
          >
            Guardar
          </Button>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: "#E5E5E5",
    fontWeight: "bold",
    fontSize: 40,
    marginRight: 170,
    lineHeight: 40,
  },
  container1: {
    color: "#FFFF",
    top: 40,
    left: 40,
  },
  subtitulo: {
    fontWeight: "600",
    fontSize: 20,
    color: "#E5E5E5",
  },
  containerQ: {
    backgroundColor: "#3e3675",
    width: "100%",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
});
