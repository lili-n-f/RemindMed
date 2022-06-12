import React, { useState, useContext } from "react";
import { View, ImageBackground, StyleSheet, ScrollView } from "react-native";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { UserContext } from "../../ContextProvider";
import { db } from "../../firebase";
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
import Profile from "./Profile";
import { validatePathConfig } from "@react-navigation/native";

const image = { uri: "https://i.ibb.co/ypq3LQ1/fondo.png" };

export default function ProfileEdit({
  nombre,
  sangre,
  sexo,
  notas,
  uid,
  email,
  perfiles_asoc,
}) {
  //se pasa como parámetro la info del usuario de la cuenta

  const [disable, setDisable] = useState(false);

  const [name, setName] = useState(nombre);
  const [sex, setSex] = useState(sexo);
  const [blood, setBlood] = useState(sangre);
  const [notes, setNotes] = useState(notas);

  const [done, setDone] = useState(false);

  async function modify() {
    setDisable(true);
    try {
      console.log("modify");

      var updatedUser = {
        email: email,
        name: !name || name === "" || /^\s*$/.test(name) ? nombre : name, //si el usuario nombre es vacío, se coloca el nombre original
        notas: notes,
        perfiles_asoc: perfiles_asoc,
        sangre: blood,
        sexo: sex,
        uid: uid,
      };

      const usr = doc(db, "users", uid);
      await updateDoc(usr, updatedUser);
      setDone(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setDisable(false);
  }
  return done ? (
    <Profile />
  ) : (
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
              defaultValue={nombre}
              placeholder={nombre}
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            />
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
              selectedValue={sex}
              onValueChange={(selectedValue) => {
                setSex(selectedValue);
              }}
            >
              <Select.Item //selección de sexo
                label="Mujer"
                value="Mujer"
              />
              <Select.Item label="Hombre" value="Hombre" />
              <Select.Item
                label="Prefiero no responder"
                value="N/A" //puse esto como un no aplica
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
                selectedValue={blood}
                onValueChange={(selectedValue) => {
                  setBlood(selectedValue);
                }}
              >
                <Select.Item //Tipos de sangre
                  label="A+"
                  value="A+"
                />
                <Select.Item label="A-" value="A-" />
                <Select.Item label="B+" value="B+" />
                <Select.Item label="B-" value="B-" />
                <Select.Item label="AB+" value="AB+" />
                <Select.Item label="AB-" value="AB-" />
                <Select.Item label="O+" value="O+" />
                <Select.Item label="O-" value="O-" />
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
                placeholder="Agregue sus notas (alergias, condiciones médicas...)"
                placeholderTextColor="gray.500"
                fontSize={13}
                w="100%"
                maxW="400"
                backgroundColor="white"
                borderRadius="20"
                borderColor="primary.300"
                defaultValue={notas}
                value={notes}
                onChangeText={(text) => {
                  setNotes(text);
                }}
              />
            </Box>
          </View>
          <HStack justifyContent="space-between">
            <Button
              borderRadius="full"
              onPress={() => setDone(true)}
              mt="5"
              style={{ alignSelf: "flex-start" }}
            >
              <Icon type={Icons.AntDesign} name={"back"} color={"white"} />
            </Button>
            <Button
              borderRadius={"10"}
              marginTop={"5"}
              alignSelf={"flex-end"}
              width="25%"
              onPress={() => modify()}
              isDisabled={disable}
            >
              Guardar
            </Button>
          </HStack>
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
