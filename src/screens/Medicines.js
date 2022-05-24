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
import { ImageBackground, StyleSheet, View, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../nativeBaseConfig";
const image = { uri: "https://i.ibb.co/fQVtYhf/fondopantallamedicinas.png" };
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon, { Icons } from "../components/Icons";

const daysOfWeek = [
  { key: "D", selected: false },
  { key: "L", selected: false },
  { key: "M", selected: false },
  { key: "M", selected: false },
  { key: "J", selected: false },
  { key: "V", selected: false },
  { key: "S", selected: false },
];

export default function Medicines() {
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [fromDate, setFromDate] = useState(new Date()); //para registrar la fecha de inicio

  const [days, setDays] = useState(daysOfWeek);

  const [showTime, setShowTime] = useState(false);
  const [textTime, setTextTime] = useState("00:00");

  const [interval, setInterval] = useState(1);
  const [intervalType, setIntervalType] = useState("Semanas");

  const [durationType, setDurationType] = useState(1); //1=por siempre; finalDate="01/01/1970". 2=hasta fecha; finalDate=fecha. 3=x repeticiones; finalDate=cálculo de fecha con repetitions y intervalType
  const [finalDate, setFinalDate] = useState("01/01/1970");
  const [repetitions, setRepetitions] = useState(1);

  const [dose, setDose] = useState(0);
  const [doseType, setDoseType] = useState("");

  const [notes, setNotes] = useState("");

  const [showDate, setShowDate] = useState(false);
  const [textDate, setTextDate] = useState("DD/MM/YYYY");

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
        <Modal.Content minW="90%" backgroundColor="primary.200">
          <Modal.CloseButton />
          <Modal.Header backgroundColor="primary.200">
            Nuevo medicamento
          </Modal.Header>
          <Modal.Body>
            <FormControl isRequired>
              <FormControl.Label>
                <Text color="black">Nombre del medicamento</Text>
              </FormControl.Label>
              <Input
                variant="outline"
                borderColor="primary.300"
                placeholder="Ingrese el medicamento"
                placeholderTextColor="gray.500"
                onChangeText={(text) => {
                  setName(text);
                }}
                value={name}
              />
              <FormControl.Label>
                <Text color="black">Frecuencia</Text>
              </FormControl.Label>
              <Button.Group justifyContent="center" my="2">
                <Button
                  variant="subtle"
                  width="10"
                  height="10"
                  borderRadius="50"
                >
                  D
                </Button>
                <Button
                  variant="subtle"
                  width="10"
                  height="10"
                  borderRadius="50"
                >
                  L
                </Button>
                <Button
                  variant="subtle"
                  width="10"
                  height="10"
                  borderRadius="50"
                >
                  M
                </Button>
                <Button
                  variant="subtle"
                  width="10"
                  height="10"
                  borderRadius="50"
                >
                  M
                </Button>
                <Button
                  variant="subtle"
                  width="10"
                  height="10"
                  borderRadius="50"
                >
                  J
                </Button>
                <Button
                  variant="subtle"
                  width="10"
                  height="10"
                  borderRadius="50"
                >
                  V
                </Button>
                <Button
                  variant="subtle"
                  width="10"
                  height="10"
                  borderRadius="50"
                >
                  S
                </Button>
              </Button.Group>
              <FormControl.Label>
                <Text color="black">Horario</Text>
              </FormControl.Label>
              <Input
                isReadOnly="true"
                textAlign="center"
                variant="outline"
                borderColor="primary.300"
                placeholder={textTime}
                placeholderTextColor="gray.500"
                width="40%"
                InputRightElement={
                  <Button rounded="none" h="full" onPress={showTimePicker}>
                    relojito
                  </Button>
                }
              />

              {showTime ? (
                <DateTimePicker
                  mode="time"
                  value={new Date()}
                  onChange={onChangeTime}
                />
              ) : null}

              <FormControl.Label>
                <Text color="black">Repetir cada</Text>
              </FormControl.Label>
              <HStack justifyContent="space-between">
                <Input
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
              <FormControl.Label>
                <Text color="black">Duración</Text>
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
                    <Text>Por siempre</Text>
                  </Radio>
                  <Radio value={2} onPress={showDatePicker}>
                    <Text>Hasta {textDate}</Text>
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
                        textAlign="center"
                        variant="filled"
                        borderColor="primary.300"
                        placeholderTextColor="gray.500"
                        backgroundColor="primary.200"
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
                      <Text>veces</Text>
                    </HStack>
                  </Radio>
                </VStack>
              </Radio.Group>
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <Text color="black">Dosis</Text>
              </FormControl.Label>
              <HStack justifyContent="space-between">
                <Input
                  textAlign="center"
                  variant="outline"
                  borderColor="primary.300"
                  placeholder="0"
                  placeholderTextColor="gray.500"
                  keyboardType="number-pad"
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
              <FormControl.Label>
                <Text color="black">Notas</Text>
              </FormControl.Label>
              <Input
                variant="filled"
                borderColor="primary.300"
                placeholderTextColor="gray.500"
                backgroundColor="primary.200"
                placeholder="Descripción o notas"
                value={notes}
                onChangeText={(value) => {
                  setNotes(value);
                }}
              />

              <Button onPress={() => {}}>¡Listo!</Button>
            </FormControl>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
}
