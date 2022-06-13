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
import DateTimePicker from "@react-native-community/datetimepicker";
import Profile from "./Profile";
import { validatePathConfig } from "@react-navigation/native";
import { stringify } from "@firebase/util";

const image = { uri: "https://i.ibb.co/ypq3LQ1/fondo.png" };

export default function ProfileEdit({ usuario }) {
  //se pasa como parámetro el usuario de la cuenta

  const [showDate, setShowDate] = useState(false); //para mostrar el date picker (cuando es true)
  let tempDate = usuario.fecha_nac
    ? new Date(usuario.fecha_nac.toDate()).toLocaleDateString()
    : "DD/MM/YYYY";
  const [textDate, setTextDate] = useState(tempDate); //la fecha de nacimiento como texto
  const [dob, setDob] = useState(
    usuario.fecha_nac ? usuario.fecha_nac.toDate() : null
  ); //dob = date of birth
  const [name, setName] = useState(usuario.name);
  const [sex, setSex] = useState(usuario.sexo);
  const [blood, setBlood] = useState(usuario.sangre);
  const [notes, setNotes] = useState(usuario.notas);

  const [done, setDone] = useState(false);

  const { user } = useContext(UserContext);

  const onChangeDate = (event, selectedDate) => {
    setDob(selectedDate);
    setShowDate(false); //se deja de mostrar el date picker
    let tempDate = new Date(dob).toLocaleDateString();
    setTextDate(tempDate);
    console.log("lo que se guarda: " + dob);
  };

  async function modify() {
    try {
      //se actualizan los campos de interés para el perfil
      //(el resto de campos, como la colección itinerario, se mantienen intactos)
      console.log("modify");

      var newUsuario = usuario;
      newUsuario.name = name;
      newUsuario.fecha_nac = dob;
      newUsuario.sexo = sex;
      newUsuario.sangre = blood;
      newUsuario.notas = notes;
      console.log(stringify(newUsuario));

      const usr = doc(db, "users", user.uid);
      await updateDoc(usr, newUsuario);
      setDone(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
              defaultValue={usuario.name}
              placeholder={usuario.name}
              value={name}
              onChangeText={(value) => {
                setName(value);
              }}
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
                value={dob ? dob : new Date()}
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
              selectedValue={sex}
              onValueChange={(selectedValue) => {
                setSex(selectedValue);
              }}
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
                selectedValue={blood}
                onValueChange={(selectedValue) => {
                  setBlood(selectedValue);
                }}
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
                placeholder={usuario.notas}
                placeholderTextColor="gray.500"
                fontSize={13}
                w="100%"
                maxW="400"
                backgroundColor="white"
                borderRadius="20"
                borderColor="primary.300"
                defaultValue={usuario.notas}
                value={notes}
                onChangeText={(value) => {
                  setNotes(value);
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
