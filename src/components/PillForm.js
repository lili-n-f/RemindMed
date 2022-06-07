import { db } from '../../firebase';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import {
  VStack,
  HStack,
  Button,
  Text,
  FormControl,
  Input,
  Select,
  Radio,
} from 'native-base';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Icon, { Icons } from './Icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const PillForm = ({ newPill, itinerario = null, handleGoBack = null }) => {
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

  const [name, setName] = useState(itinerario?.nombre ?? '');
  const [fromDate, setFromDate] = useState(new Date()); //para registrar la fecha de inicio

  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  const [showTime, setShowTime] = useState(false);
  const [textTime, setTextTime] = useState(itinerario?.horario ?? '--:--');

  const [interval, setInterval] = useState(itinerario?.intervalo ?? '1');
  const [intervalType, setIntervalType] = useState('');

  const [durationType, setDurationType] = useState(
    itinerario?.tipo_duracion ?? 1
  ); //1=por siempre; finalDate="01/01/1970". 2=hasta fecha; finalDate=fecha. 3=x repeticiones; finalDate=cálculo de fecha con repetitions y intervalType
  const [finalDate, setFinalDate] = useState(
    itinerario?.fecha_final ?? '01/01/1970'
  );
  const [repetitions, setRepetitions] = useState('1');

  const [dose, setDose] = useState(itinerario?.dosis ?? '0');
  const [doseType, setDoseType] = useState(itinerario?.dosis_tipo ?? '');

  const [notes, setNotes] = useState(itinerario?.notas ?? '');

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

  async function upload(doc) {
    try {
      const ref = collection(db, 'usuarios');
      const docRef = await addDoc(ref, doc);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  async function modify(docu) {
    try {
      const ref = doc(db, 'usuarios', itinerario?.id);
      await updateDoc(ref, docu);
      handleGoBack();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

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
      if (
        intervalType === 'Semanas' &&
        !(
          monday ||
          tuesday ||
          wednesday ||
          thursday ||
          friday ||
          saturday ||
          sunday
        )
      ) {
        setDayError(true);
      }

      //AQUÍ HAY UN BUG RARO, A PESAR DE TENER ERRORES EN TRUE ENTRA AQUÍ,,, WHY
      if (
        !nameError &&
        !hourError &&
        !intervalError &&
        !durationError &&
        !dayError
      ) {
        console.log('a');
        let dias;
        intervalType === 'Semanas'
          ? (dias = [
              { key: 'Sunday', selected: sunday },
              { key: 'Monday', selected: monday },
              { key: 'Tuesday', selected: tuesday },
              { key: 'Wednesday', selected: wednesday },
              { key: 'Thursday', selected: thursday },
              { key: 'Friday', selected: friday },
              { key: 'Saturday', selected: saturday },
            ])
          : (dias = null);

        let finalDate;
        if (durationType == 2) {
          finalDate = new Date(textDate);
        } else {
          finalDate = null;
        }
        let repet_restantes;

        if (durationType == 3) {
          repet_restantes = parseInt(repetitions, 10);
        } else {
          repet_restantes = null;
        }

        var newMed = {
          activo: true,
          nombre: name,
          fecha_registro: new Date(), //esto para hacer los cálculos de las fechas finales
          horario: textTime,
          intervalo: parseInt(interval, 10),
          dias: dias, //SI ESTE VALOR ES NULL, SE SABE QUE EL INTERVALO ES EN DÍAS, de lo contrario, semanas
          tipo_duracion: durationType, //1: por siempre, 2: hasta una fecha específica, 3: repeticiones
          fecha_final: finalDate,
          repet_restantes: repet_restantes, //SE DEBE ACTUALIZAR CADA VEZ QUE SUENE LA ALARMA (OJO caso de intervalo en días es literal, caso de intervalo en semanas es por cada semana)
          dosis: dose, //ojoooo estos campos son opcionales, por tanto si dosis es 0 o vacío no se llenó
          dosis_tipo: doseType, //ojoooo si doseType es vacío la dosis no se llenó
          notas: notes, //ojoooo notas es opcional, puede estar vacío
        };
        console.log(JSON.stringify(newMed));

        upload(newMed);

        // const user = fireDB.collection('usuarios').doc('l02GN8GokJvk9YPexPpy'); //HARDCODEADO!!! HAY QUE CAMBIARLO!!!
        // user.update({
        //   itinerario: firebase.firestore.FieldValue.arrayUnion(newMed),
        // });
      }
    } else {
      let dias;
      intervalType === 'Semanas'
        ? (dias = [
            { key: 'Sunday', selected: sunday },
            { key: 'Monday', selected: monday },
            { key: 'Tuesday', selected: tuesday },
            { key: 'Wednesday', selected: wednesday },
            { key: 'Thursday', selected: thursday },
            { key: 'Friday', selected: friday },
            { key: 'Saturday', selected: saturday },
          ])
        : (dias = null);

      let finalDate;
      if (durationType == 2) {
        finalDate = new Date(textDate);
      } else {
        finalDate = null;
      }
      let repet_restantes;

      if (durationType == 3) {
        repet_restantes = parseInt(repetitions, 10);
      } else {
        repet_restantes = null;
      }
      var changeMed = {
        activo: true,
        nombre: name,
        fecha_registro: new Date(), //esto para hacer los cálculos de las fechas finales
        horario: textTime,
        intervalo: parseInt(interval, 10),
        dias: dias, //SI ESTE VALOR ES NULL, SE SABE QUE EL INTERVALO ES EN DÍAS, de lo contrario, semanas
        tipo_duracion: durationType, //1: por siempre, 2: hasta una fecha específica, 3: repeticiones
        fecha_final: finalDate,
        repet_restantes: repet_restantes, //SE DEBE ACTUALIZAR CADA VEZ QUE SUENE LA ALARMA (OJO caso de intervalo en días es literal, caso de intervalo en semanas es por cada semana)
        dosis: dose, //ojoooo estos campos son opcionales, por tanto si dosis es 0 o vacío no se llenó
        dosis_tipo: doseType, //ojoooo si doseType es vacío la dosis no se llenó
        notas: notes, //ojoooo notas es opcional, puede estar vacío
      };
      modify(changeMed);
    }
  }

  return (
    <ScrollView>
      <FormControl
        width={'90%'}
        alignSelf={'center'}
        isRequired
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {itinerario ? (
          <Button
            borderRadius="full"
            onPress={() => handleGoBack()}
            mt="5"
            style={{ alignSelf: 'flex-start' }}
          >
            <Icon type={Icons.AntDesign} name={'back'} color={'white'} />
          </Button>
        ) : null}
        <Text bold fontSize="3xl" mb="5" textAlign={'center'} color="cyan.500">
          {itinerario
            ? 'Modifica el medicamento'
            : 'Agrega un nuevo medicamento'}
        </Text>
        <View style={styles.containerQ}>
          <FormControl.Label>
            <Text color="platinum.500" fontWeight="bold">
              Nombre del medicamento
            </Text>
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
          {nameError ? (
            <Text style={styles.error}>* Debe introducir un nombre</Text>
          ) : null}
        </View>

        <View style={styles.containerB}>
          <FormControl.Label>
            <Text color="white" fontWeight="bold">
              Horario
            </Text>
          </FormControl.Label>
          <Input
            backgroundColor="white"
            borderRadius="20"
            isReadOnly="true"
            textAlign="center"
            fontSize="lg"
            variant="outline"
            borderColor="primary.300"
            placeholder={textTime}
            placeholderTextColor="gray.500"
            width="100%"
            InputRightElement={
              <TouchableOpacity
                style={styles.mequieromatar}
                rounded="none"
                h="full"
                onPress={showTimePicker}
              >
                <Icon
                  type={Icons.MaterialIcons}
                  name="alarm"
                  color={'#52489c'}
                  size={35}
                />

                {/* me rindo marico esa imagen no se quiere poner porque es un bicha y la odio demasiado                     */}
              </TouchableOpacity>
            }
          />
          {hourError ? (
            <Text style={styles.error}>* Debe introducir un horario</Text>
          ) : null}
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
            <Text color="platinum.500" fontWeight="bold">
              Repetir cada
            </Text>
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
              value={interval.toString()}
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
              defaultValue={itinerario?.dias ? 'Semanas' : 'Días'}
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
        </View>
        {intervalType === 'Semanas' || itinerario?.dias ? (
          <View style={styles.containerA}>
            <FormControl.Label>
              <Text color="platinum.500" fontWeight="bold">
                Frecuencia
              </Text>
            </FormControl.Label>
            <Button.Group justifyContent="center" my="2">
              <Button
                style={styles.days}
                backgroundColor={
                  domingo || itinerario?.dias[0]?.selected
                    ? 'cyan.500'
                    : 'white'
                }
                onPress={() => setDomingo(!domingo)}
                color="primary.700"
                fontWeight="bold"
                variant="subtle"
                width="8"
                height="8"
                borderRadius="50"
                padding="0"
              >
                <Text color={domingo ? 'white' : 'black'}>D</Text>
              </Button>
              <Button
                fontWeight="bold"
                backgroundColor={
                  lunes || itinerario?.dias[1]?.selected ? 'cyan.500' : 'white'
                }
                onPress={() => setLunes(!lunes)}
                color="primary.700"
                variant="subtle"
                width="8"
                height="8"
                borderRadius="50"
                padding="0"
              >
                <Text color={lunes ? 'white' : 'black'}>L</Text>
              </Button>
              <Button
                fontWeight="bold"
                onPress={() => setMartes(!martes)}
                backgroundColor={
                  martes || itinerario?.dias[2]?.selected ? 'cyan.500' : 'white'
                }
                color="primary.700"
                variant="subtle"
                width="8"
                height="8"
                padding="0"
                borderRadius="50"
              >
                <Text color={martes ? 'white' : 'black'}>M</Text>
              </Button>
              <Button
                fontWeight="bold"
                backgroundColor={
                  miercoles || itinerario?.dias[3]?.selected
                    ? 'cyan.500'
                    : 'white'
                }
                onPress={() => setMiercoles(!miercoles)}
                color="primary.700"
                variant="subtle"
                width="8"
                height="8"
                borderRadius="50"
                padding="0"
              >
                <Text color={miercoles ? 'white' : 'black'}>M</Text>
              </Button>
              <Button
                fontWeight="bold"
                backgroundColor={
                  jueves || itinerario?.dias[4]?.selected ? 'cyan.500' : 'white'
                }
                onPress={() => setJueves(!jueves)}
                color="primary.700"
                variant="subtle"
                width="8"
                height="8"
                borderRadius="50"
                padding="0"
              >
                <Text color={jueves ? 'white' : 'black'}>J</Text>
              </Button>
              <Button
                fontWeight="bold"
                backgroundColor={
                  viernes || itinerario?.dias[5]?.selected
                    ? 'cyan.500'
                    : 'white'
                }
                onPress={() => setViernes(!viernes)}
                color="primary.700"
                variant="subtle"
                width="8"
                height="8"
                borderRadius="50"
                padding="0"
              >
                <Text color={viernes ? 'white' : 'black'}>V</Text>
              </Button>
              <Button
                fontWeight="bold"
                backgroundColor={
                  sabado || itinerario?.dias[6]?.selected ? 'cyan.500' : 'white'
                }
                onPress={() => setSabado(!sabado)}
                color="primary.700"
                variant="subtle"
                width="8"
                height="8"
                borderRadius="50"
                padding="0"
              >
                <Text color={sabado ? 'white' : 'black'}>S</Text>
              </Button>
            </Button.Group>
            {dayError ? (
              <Text style={styles.error}>* Debe introducir los días</Text>
            ) : null}
          </View>
        ) : null}

        <View style={styles.containerD}>
          <FormControl.Label>
            <Text color="platinum.500" fontWeight="bold">
              Duración
            </Text>
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
                    backgroundColor="white"
                    textAlign="center"
                    variant="filled"
                    placeholderTextColor="primary.800"
                    borderRadius="20"
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
                  <Text color="white">veces</Text>
                </HStack>
              </Radio>
            </VStack>
          </Radio.Group>
          {durationError ? (
            <Text style={styles.error}>* Debe introducir la duración</Text>
          ) : null}
        </View>
      </FormControl>
      <FormControl width={'90%'} alignSelf={'center'} pb="10">
        <View style={styles.containerE}>
          <FormControl.Label>
            <Text color="platinum.500" fontWeight="bold">
              Dosis
            </Text>
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
            <Text color="platinum.500" fontWeight="bold">
              Notas
            </Text>
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
        <Button
          onPress={() => {
            onSubmit();
          }}
          style={{
            marginTop: 15,
            marginBottom: itinerario ? -10 : 20,
            width: '60%',
            marginLeft: '20%',
            borderRadius: 20,
          }}
          bg="cyan.500"
        >
          <Text fontWeight="bold" color="white">
            ¡Listo!
          </Text>
        </Button>
      </FormControl>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mequieromatar: {
    width: 50,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderLeftColor: '#3e3675',
  },
  containerQ: {
    backgroundColor: '#3e3675',
    width: '100%',
    height: 98,
    padding: 10,
    borderRadius: 20,
  },

  containerA: {
    marginTop: 15,
    backgroundColor: '#3e3675',
    width: '100%',
    height: 98,
    padding: 10,
    borderRadius: 20,
  },
  days: {
    textAlign: 'center',
    padding: 0,
  },
  containerB: {
    marginTop: 15,
    backgroundColor: '#3e3675',
    width: '100%',
    height: 98,
    padding: 10,
    borderRadius: 20,
  },
  containerC: {
    marginTop: 15,
    backgroundColor: '#3e3675',
    width: '100%',
    height: 98,
    padding: 10,
    borderRadius: 20,
  },

  containerD: {
    marginTop: 15,
    backgroundColor: '#3e3675',
    width: '100%',

    padding: 10,
    borderRadius: 20,
  },

  containerE: {
    marginTop: 15,
    paddingBottom: 15,

    backgroundColor: '#3e3675',
    width: '100%',
    height: 98,
    padding: 10,
    borderRadius: 20,
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
  error: {
    fontSize: 10,
    color: 'gray',
  },
});

export default PillForm;
