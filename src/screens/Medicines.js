import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
} from "react-native";
import { Divider, Box, StatusBar, Select, Radio } from "native-base";
import react, { useState } from "react";
import { theme } from "../../nativeBaseConfig";
const image = { uri: "https://i.ibb.co/fQVtYhf/fondopantallamedicinas.png" };

export default function Medicine() {
  const [untilDate, setUntilDate] = useState(new Date());
  const [durationType, setDurationType] = useState(1);
  //const [days, setDays] = useState([]); //para los horarios de cada día
  const [name, setName] = useState("");
  const [dose, setDose] = useState(0);
  const [doseType, setDoseType] = useState("");
  const [notes, setNotes] = useState("");
  const [finalDate, setFinalDate] = useState("01/01/1970");
  const [repetitions, setRepetitions] = useState(1);
  const [duration, setDuration] = useState("01/01/1970"); //no sé si esto sirve como date lol
  const [intervalType, setIntervalType] = useState("Semanas");
  const [interval, setInterval] = useState(1);

  return (
    <View>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      >
        <StatusBar />

        <View>
          <View>
            <Box>
              <Box w="60">
                <Divider my="0.5" bg={theme.colors.cyan} thickness="4" />
              </Box>
            </Box>
            <Text>Agrega tu medicamento</Text>
          </View>
          <View>
            <View>
              <Text>Nombre del medicamento</Text>
            </View>
            <View>
              <TextInput
                placeholder="Ingrese el nombre del medicamento"
                onChangeText={(text) => {
                  setName(text);
                }}
                value={name}
              />
            </View>
          </View>

          <View>
            <View>
              <Text>Frecuencia</Text>
            </View>

            <Divider my="0.5" thickness="1.5" />

            <View>
              <Text>Horario</Text>
            </View>

            <Divider my="0.5" thickness="1.5" />

            <View>
              <Text>Se repite cada...</Text>
              <View>
                <TextInput
                  keyboardType="numeric"
                  placeholder="0"
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
                  selectedValue={intervalType}
                  placeholder="Escoja el intervalo"
                  onValueChange={(value) => {
                    setIntervalType(value);
                  }}
                >
                  <Select.Item label="Semanas" value="Semanas" />
                  <Select.Item label="Días" value="Días" />
                </Select>
              </View>
            </View>

            <Divider my="0.5" thickness="1.5" />

            <View>
              <Text>Duración</Text>
              <View>
                <Radio.Group
                  name="duracionRadio"
                  value={durationType}
                  onChange={(value) => {
                    setDurationType(value);
                  }}
                >
                  <Radio value={1}>Por siempre</Radio>
                  <Radio value={2}>Date placeholder</Radio>
                  <Radio value={3}>
                    <View>
                      <TextInput
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
                    </View>
                  </Radio>
                </Radio.Group>
              </View>
            </View>
          </View>

          <View>
            <Text>Dosis</Text>
            <View>
              <TextInput
                keyboardType="numeric"
                placeholder="0"
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
                selectedValue={doseType}
                placeholder="Escoja el tipo de dosis"
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
            </View>
          </View>

          <View>
            <Text>Notas</Text>
            <TextInput
              placeholder="Descripción o notas"
              value={notes}
              onChangeText={(value) => {
                setNotes(value);
              }}
            />
          </View>
        </View>

        <Button title="¡Listo!" onPress={() => {}} />
        
      </ImageBackground>
    </View>
  );
}

/*
const styles = StyleSheet.create({
  titulo: {
    color: "#E5E5E5",
    fontWeight: "bold",
    fontSize: 40,
  },
  container1: {
    color: "#FFFF",
    alignItems: "left",
    top: 35,
    margin: 20,
  },
  container2: {
    left: 10,
  },
  subtitulo: {
    fontWeight: 600,
    fontSize: 20,
    color: "#E5E5E5",
  },
});
*/
