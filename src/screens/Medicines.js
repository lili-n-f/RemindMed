import {
  Box,
  Card,
  VStack,
  HStack,
  Button,
  Text,
  Modal,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Divider,
  Select,
  StatusBar,
  Radio,
} from "native-base";
import { ImageBackground, StyleSheet, View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../nativeBaseConfig";
const image = { uri: "https://i.ibb.co/fQVtYhf/fondopantallamedicinas.png" };
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon, { Icons } from "../components/Icons";
const image2 = { uri: "https://i.postimg.cc/sf4fvjwL/relojito.png" }

export default function Medicines() {
  const [untilDate, setUntilDate] = useState(new Date());
  const [durationType, setDurationType] = useState(1);
  //const [days, setDays] = useState([]); //para los horarios de cada día
  const [name, setName] = useState("");
  const [dose, setDose] = useState(0);
  const [doseType, setDoseType] = useState("");
  const [notes, setNotes] = useState("");
  const [finalDate, setFinalDate] = useState("01/01/1970");
  const [repetitions, setRepetitions] = useState(1);
  const [duration, setDuration] = useState("01/01/1970");
  const [intervalType, setIntervalType] = useState("Semanas");
  const [interval, setInterval] = useState(1);

  const [showModal, setShowModal] = useState(false);

  const [showTime, setShowTime] = useState(false);
  const [textTime, setTextTime] = useState("00:00");

  const [showDate, setShowDate] = useState(false);
  const [textDate, setTextDate] = useState("dd/MM/yyyy");

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime;
    setShowTime(false);
    let tempTime = currentTime.getHours() + ":" + currentTime.getMinutes();
    setTextTime(tempTime);
  };

  const showTimePicker = () => {
    setShowTime(true);
  };

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

  const showDatePicker = () => {
    setShowDate(true);
  };
  return (

    <SafeAreaView>
      <StatusBar />
      <View>
        <Button onPress={() => setShowModal(true)} size="lg">
          Agrega tu medicamento
        </Button>
      </View>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        avoidKeyboard
      >
        <Modal.Content minW="90%">
          <ImageBackground
          source={image}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
          >
          <Modal.CloseButton />
          <Modal.Header backgroundColor="blue.500">
            <Text color="platinum.500" fontWeight="bold">
            Nuevo medicamento
            </Text>
          </Modal.Header>
          <Modal.Body>
            <FormControl isRequired>
            <View style={styles.containerQ}>
              <FormControl.Label>
                <Text color="platinum.500" fontWeight="bold" >Nombre del medicamento</Text>
              </FormControl.Label>


                <Input
                  backgroundColor="white"
                  borderRadius="20"
                  variant="outline"
                  borderColor="primary.300"
                  placeholder="nombre viejo"
                  placeholderTextColor="gray.500"
                  onChangeText={(text) => {
                    setName(text);
                  }}
                  value={name}
                />
              </View>
              
              <View style={styles.containerA}>

              <FormControl.Label>
                <Text color="platinum.500" fontWeight="bold">Frecuencia</Text>
              </FormControl.Label>
              <Button.Group justifyContent="center" my="2">
                <Button
                  style={styles.days}
                  fontSize="2"
                  fontWeight="bold"
                  backgroundColor="green.500"
                  color="primary.700"
                  variant="subtle"
                  width="8"
                  height="8"
                  borderRadius="50"
                >
                  D
                </Button>
                <Button
                  fontWeight="bold"
                  backgroundColor="green.500"
                  color="primary.700"
                  variant="subtle"
                  width="8"
                  height="8"
                  borderRadius="50"
                >
                  L
                </Button>
                <Button
                  fontWeight="bold"
                  backgroundColor="green.500"
                  color="primary.700"
                  variant="subtle"
                  width="8"
                  height="8"
                  borderRadius="50"
                >
                  M
                </Button>
                <Button
                  fontWeight="bold"
                  backgroundColor="green.500"
                  color="primary.700"
                  variant="subtle"
                  width="8"
                  height="8"
                  borderRadius="50"
                >
                  M
                </Button>
                <Button
                  fontWeight="bold"
                  backgroundColor="green.500"
                  color="primary.700"
                  variant="subtle"
                  width="8"
                  height="8"
                  borderRadius="50"
                >
                  J
                </Button>
                <Button
                  fontWeight="bold"
                  backgroundColor="green.500"
                  color="primary.700"
                  variant="subtle"
                  width="8"
                  height="8"
                  borderRadius="50"
                >
                  V
                </Button>
                <Button
                  fontWeight="bold"
                  backgroundColor="green.500"
                  color="primary.700"
                  variant="subtle"
                  width="8"
                  height="8"
                  borderRadius="50"
                >
                  S
                </Button>
              </Button.Group>
              </View>
              <View style={styles.containerB}>
              <FormControl.Label>
                <Text color="white" fontWeight="bold">Horario</Text>
              </FormControl.Label>
              <Input
                backgroundColor="white"
                borderRadius="20"
                isReadOnly="true"
                textAlign="center"
                variant="outline"
                borderColor="primary.300"
                placeholder={textTime}
                placeholderTextColor="gray.500"
                width="40%"
                InputRightElement={
                  <TouchableOpacity style={styles.mequieromatar} rounded="none" h="full" onPress={showTimePicker}>
                    <Image source={image2}/>

{/* me rindo marico esa imagen no se quiere poner porque es un bicha y la odio demasiado                     */}
                  </TouchableOpacity>
                }
              />
              </View>
              {showTime ? (
                <DateTimePicker
                  mode="time"
                  value={new Date()}
                  onChange={onChangeTime}
                />
              ) : null}
            
            <View style={styles.containerC}>
                <FormControl.Label>
                  <Text color="platinum.500" fontWeight="bold">Repetir cada</Text>
                </FormControl.Label>
                <HStack justifyContent="space-between">
                  <Input
                    backgroundColor="white"
                    borderRadius="20"
                    keyboardType="numeric"
                    textAlign="center"
                    variant="outline"
                    borderColor="primary.300"
                    placeholder="0"
                    placeholderTextColor="gray.500"
                    width="20%"
                    value={interval}
                    onChangeText={(value) => {
                      if (
                        value.match(/-/) ||
                        value.match(/,/) ||
                        value.match(/./)
                      ) {
                        setInterval(1);
                      } else {
                        setInterval(value);
                      }
                    }}
                  />
                  <Select
                    backgroundColor="white"
                    borderRadius="20"
                    minWidth="75%"
                    borderColor="primary.300"
                    placeholderTextColor="gray.500"
                    accessibilityLabel="Escoja el intervalo"
                    placeholder="Escoja el intervalo"
                    onValueChange={(itemValue) => {
                      setIntervalType(itemValue);
                    }}
                  >
                    <Select.Item label="Semanas" value="Semanas" />
                    <Select.Item label="Días" value="Días" />
                  </Select>
                  
                </HStack>
                </View>

              <View style={styles.containerD}>
                <FormControl.Label>
                  <Text color="platinum.500" fontWeight="bold">Duración</Text>
                </FormControl.Label>
                <Radio.Group
                  name="duracionRadio"
                  value={durationType}
                  onChange={(value) => {
                    setDurationType(value);
                  }}
                >
                  <VStack space={3}>
                    <Radio value={1}>
                      <Text color="white">Por siempre</Text>
                    </Radio>
                    <Radio value={2} onPress={showDatePicker}>
                      <Text color="white">Hasta {textDate}</Text>
                      {showDate ? (
                        <DateTimePicker
                          mode="date"
                          value={new Date()}
                          minimumDate={new Date()}
                          onChange={onChangeDate}
                        />
                      ) : null}
                    </Radio>
                    <Radio value={3}>
                      <HStack width="10" space={2} alignItems="center">
                        <Input
                        height="8"
                        width="10"
                          backgroundColor="green.500"
                          textAlign="center"
                          variant="filled"
                          borderColor="green.500"
                          placeholderTextColor="primary.800"
                          borderRadius="20"
                          keyboardType="numeric"
                          placeholder="1"
                          value={repetitions}
                          onChangeText={(value) => {
                            if (value <= 0 || value.match("-")) {
                              setRepetitions(1);
                            } else {
                              setRepetitions(value);
                            }
                          }}
                        />
                        <Text color="white">veces</Text>
                      </HStack>
                    </Radio>
                  </VStack>
                </Radio.Group>
                </View>

            </FormControl>
            <FormControl>

            <View style={styles.containerE}>

              <FormControl.Label>
                <Text color="platinum.500" fontWeight="bold">Dosis</Text>
              </FormControl.Label>
              <HStack justifyContent="space-between">
                <Input
                  backgroundColor="white"
                  borderRadius="20"
                  textAlign="center"
                  variant="outline"
                  borderColor="primary.300"
                  placeholder="0"
                  placeholderTextColor="gray.500"
                  width="20%"
                  value={dose}
                  onChangeText={(value) => {
                    if (value < 0 || value.match(/-/)) {
                      setDose(0);
                    } else {
                      setDose(value);
                    }
                  }}
                />
                <Select
                backgroundColor="white"
                borderRadius="20"
                  minWidth="75%"
                  borderColor="primary.300"
                  placeholderTextColor="gray.500"
                  accessibilityLabel="Escoja la dosificación"
                  placeholder="Escoja la dosificación"
                  selectedValue={doseType}
                  onValueChange={(value) => {
                    setDoseType(value);
                  }}
                >
                  <Select.Item label="Ampolla(s)" value="Ampolla(s)" />
                  <Select.Item label="Gota(s)" value="Gota(s)" />
                  <Select.Item label="mL" value="mL" />
                  <Select.Item label="Pastilla(s)" value="Pastilla(s)" />
                  <Select.Item label="Gramo(s)" value="Gramo(s)" />
                  <Select.Item label="Cucharada(s)" value="Cucharada(s)" />
                  <Select.Item label="Cucharadita(s)" value="Cucharadita(s)" />
                  <Select.Item label="Unidad(es)" value="Unidad(es)" />
                  <Select.Item label="Taza(s)" value="Taza(s)" />
                  <Select.Item label="Spray(s)" value="Spray(s)" />
                  <Select.Item label="Supositorio(s)" value="Supositorio(s)" />
                  <Select.Item label="Cucharadita(s)" value="Cucharadita(s)" />
                  <Select.Item label="Inyección(es)" value="Inyección(es)" />
                </Select>
              </HStack>
              </View>
              <View style={styles.containerE}>
              <FormControl.Label>
                <Text color="platinum.500" fontWeight="bold">Notas</Text>
              </FormControl.Label>
              <Input
                backgroundColor="white"
                borderRadius="20"
                variant="filled"
                borderColor="primary.300"
                placeholderTextColor="gray.500"

                placeholder="Descripción o notas"
                value={notes}
                onChangeText={(value) => {
                  setNotes(value);
                }}
              />
              </View>

            </FormControl>
          </Modal.Body>
          </ImageBackground>
        </Modal.Content>
      </Modal>
    </SafeAreaView>

  );
}


const styles = StyleSheet.create({

  mequieromatar: {
    backgroundColor:"#312b5e",
    width:50,
    height: 40,
    alignItems: "center"

  },
  containerQ: {
    backgroundColor:"#3e3675",
    width: 280,
    height:98,
    padding:10,
    borderRadius: 20
  },

  containerA: {
    marginTop:15,
    backgroundColor:"#3e3675",
    width: 300,
    height:98,
    padding:10,
    borderRadius: 20
  },
  days: {
    textAlign:"center",
    padding:0
  },
  containerB: {
    marginTop:15,
    backgroundColor:"#3e3675",
    width: 300,
    height:98,
    padding:10,
    borderRadius: 20
  },
  containerC: {
    marginTop:15,
    backgroundColor:"#3e3675",
    width: 300,
    height:98,
    padding:10,
    borderRadius: 20
  },

  containerD: {
    marginTop:15,
    backgroundColor:"#3e3675",
    width: 200,
 
    padding:10,
    borderRadius: 20
  },

  containerE: {
    marginTop:15,
    paddingBottom:15,

    backgroundColor:"#3e3675",
    width: 250,
    height:98,
    padding:10,
    borderRadius: 20
  },
  // titulo: {
  //   color: "#E5E5E5",
  //   fontWeight: "bold",
  //   fontSize: 40,
  // },
  // container1: {
  //   color: "#FFFF",
  //   alignItems: "left",
  //   top: 35,
  //   margin: 20,
  // },
  // container2: {
  //   left: 10,
  // },
  // subtitulo: {
  //   fontWeight: 600,
  //   fontSize: 20,
  //   color: "#E5E5E5",
  // },
});

