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
} from 'native-base';
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const PillForm = ({ newPill }) => {
  const [nameError, setNameError] = useState(false);
  const [hourError, setHourError] = useState(false);
  const [intervalError, setIntervalError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [dayError, setDayError] = useState(false);
  //BOTONES DE DIAS DE LA SEMANA
  const [lunes, setLunes] = useState(false);
  const [martes, setMartes] = useState(false);
  const [miercoles, setMiercoles] = useState(false);
  const [jueves, setJueves] = useState(false);
  const [viernes, setViernes] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);

  const [name, setName] = useState('');
  const [fromDate, setFromDate] = useState(new Date()); //para registrar la fecha de inicio

  const [days, setDays] = useState([0, 0, 0, 0, 0, 0, 0]);

  const [showTime, setShowTime] = useState(false);
  const [textTime, setTextTime] = useState('--:--');

  const [interval, setInterval] = useState('1');
  const [intervalType, setIntervalType] = useState('');

  const [durationType, setDurationType] = useState(1); //1=por siempre; finalDate="01/01/1970". 2=hasta fecha; finalDate=fecha. 3=x repeticiones; finalDate=cálculo de fecha con repetitions y intervalType
  const [finalDate, setFinalDate] = useState('01/01/1970');
  const [repetitions, setRepetitions] = useState('1');

  const [dose, setDose] = useState('0');
  const [doseType, setDoseType] = useState('');

  const [notes, setNotes] = useState('');

  const [showDate, setShowDate] = useState(false);
  const [textDate, setTextDate] = useState('DD/MM/YYYY');

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime;
    setShowTime(false);
    let tempTime = currentTime.getHours() + ':' + currentTime.getMinutes();
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
      '/' +
      (currentDate.getMonth() + 1) +
      '/' +
      currentDate.getFullYear();
    setTextDate(tempDate);
  };

  const showDatePicker = () => {
    setShowDate(true);
  };

  function onSubmit() {
    setNameError(false);
    setHourError(false);
    setIntervalError(false);
    setDurationError(false);
    setDayError(false);

    if (newPill) {
      if (!name || name === '' || /^\s*$/.test(name)) {
        setNameError(true);
      }
      if (textTime === '--:--') {
        setHourError(true);
      }
      if (intervalType === '' || interval === '') {
        setIntervalError(true);
      }
      if (
        (durationType != 1 && durationType != 2 && durationType != 3) ||
        (durationType == 3 && repetitions === '') ||
        (durationType == 2 && textDate === 'DD/MM/YYYY')
      ) {
        setDurationError(true);
      }
      if (noDaysSelected()) {
        setDayError(true);
      }
    }
  }

  function noDaysSelected() {
    let found = false;
    for (let day of days) {
      if (day.selected) {
        found = true;
        break;
      }
    }
    return !found;
  }

  return (
    <View>
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
        {nameError ? (
          <Text style={styles.error}>* Debe introducir un nombre</Text>
        ) : null}
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
        {hourError ? (
          <Text style={styles.error}>* Debe introducir un horario</Text>
        ) : null}

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
                value.includes('.') ||
                value.includes('-') ||
                value.includes(',') ||
                value.includes(' ') ||
                value === '0'
              ) {
                setInterval('1');
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
        {intervalError ? (
          <Text style={styles.error}>
            * Debe introducir un intervalo de repetición
          </Text>
        ) : null}

        {intervalType === 'Semanas' ? (
          <View>
            <FormControl.Label>
              <Text color="black">Frecuencia</Text>
            </FormControl.Label>
            <Button.Group justifyContent="center" my="2">
              <Button variant="subtle" width="10" height="10" borderRadius="50">
                D
              </Button>
              <Button variant="subtle" width="10" height="10" borderRadius="50">
                L
              </Button>
              <Button
                variant="subtle"
                width="10"
                height="10"
                borderRadius="50"
                onPress={() => (days[2] = 1)}
                bg={days[2] === 1 ? 'primary.500' : 'green.500'}
              >
                M
              </Button>
              <Button variant="subtle" width="10" height="10" borderRadius="50">
                M
              </Button>
              <Button variant="subtle" width="10" height="10" borderRadius="50">
                J
              </Button>
              <Button variant="subtle" width="10" height="10" borderRadius="50">
                V
              </Button>
              <Button variant="subtle" width="10" height="10" borderRadius="50">
                S
              </Button>
            </Button.Group>
            {dayError ? (
              <Text style={styles.error}>* Debe introducir los días</Text>
            ) : null}
          </View>
        ) : null}

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
                    if (
                      value.startsWith('0') ||
                      value.includes('-') ||
                      value.includes(',') ||
                      value.includes(' ')
                    ) {
                      setRepetitions('1');
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
        {durationError ? (
          <Text style={styles.error}>* Debe introducir la duración</Text>
        ) : null}
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
            placeholder="#"
            placeholderTextColor="gray.500"
            keyboardType="number-pad"
            width="20%"
            value={dose}
            keyboardType="numeric"
            onChangeText={(value) => {
              if (
                value.startsWith('0') ||
                value.includes('-') ||
                value.includes(',') ||
                value.includes(' ')
              ) {
                setDose('');
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

        <Button
          onPress={() => {
            onSubmit();
          }}
        >
          ¡Listo!
        </Button>
      </FormControl>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 10,
    color: 'gray',
  },
});

export default PillForm;
