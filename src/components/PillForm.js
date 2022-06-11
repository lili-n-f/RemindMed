import { db } from "../../firebase";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import {
  VStack,
  HStack,
  Button,
  Text,
  FormControl,
  Input,
  Select,
  Radio,
} from "native-base";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState, useContext } from "react";
import Icon, { Icons } from "./Icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AlertMessage from "./AlertMessage";
import { UserContext } from "../../ContextProvider";

const PillForm = ({ newPill, itinerario = null, handleGoBack = null }) => {
  const [nameError, setNameError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dataError, setDataError] = useState([]);
  const [hourError, setHourError] = useState(false);
  const [intervalError, setIntervalError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [dayError, setDayError] = useState(false);
  //BOTONES DE DIAS DE LA SEMANA
  const [lunes, setLunes] = useState(itinerario?.dias?.[1]?.selected ?? false);
  const [martes, setMartes] = useState(
    itinerario?.dias?.[2]?.selected ?? false
  );
  const [miercoles, setMiercoles] = useState(
    itinerario?.dias?.[3]?.selected ?? false
  );
  const [jueves, setJueves] = useState(
    itinerario?.dias?.[4]?.selected ?? false
  );
  const [viernes, setViernes] = useState(
    itinerario?.dias?.[5]?.selected ?? false
  );
  const [sabado, setSabado] = useState(
    itinerario?.dias?.[6]?.selected ?? false
  );
  const [domingo, setDomingo] = useState(
    itinerario?.dias?.[0]?.selected ?? false
  );

  const [name, setName] = useState(itinerario?.nombre ?? "");
  const [fromDate, setFromDate] = useState(new Date()); //para registrar la fecha de inicio

  const [showTime, setShowTime] = useState(false);
  const [textTime, setTextTime] = useState(
    (itinerario?.horario?.toDate().getHours() ?? "--") +
      ":" +
      (itinerario?.horario?.toDate().getMinutes() ?? "--")
  );
  const [time, setTime] = useState(itinerario?.horario.toDate() ?? null);

  const [interval, setInterval] = useState(itinerario?.intervalo ?? "1");
  const [intervalType, setIntervalType] = useState(
    itinerario?.dias ? "Semanas" : "Días"
  );

  const [durationType, setDurationType] = useState(
    itinerario?.tipo_duracion ?? 1
  ); //1=por siempre; finalDate="01/01/1970". 2=hasta fecha; finalDate=fecha. 3=x repeticiones; finalDate=cálculo de fecha con repetitions y intervalType
  const [finalDate, setFinalDate] = useState(
    itinerario?.fecha_final ?? "01/01/1970"
  );
  const [repetitions, setRepetitions] = useState(
    itinerario?.repet_restantes?.toString() ?? ""
  );

  const [dose, setDose] = useState(itinerario?.dosis ?? "");
  const [doseType, setDoseType] = useState(itinerario?.dosis_tipo ?? "");
  const [category, setCategory] = useState(itinerario?.categoria ?? "");

  const [notes, setNotes] = useState(itinerario?.notas ?? "");

  const [showDate, setShowDate] = useState(false);
  const [textDate, setTextDate] = useState(
    (itinerario?.fecha_final?.toDate().getUTCDate() ?? "DD") +
      "/" +
      (itinerario?.fecha_final?.toDate().getUTCMonth() ?? "MM") +
      "/" +
      (itinerario?.fecha_final?.toDate().getUTCFullYear() ?? "YYYY")
  );

  const { user } = useContext(UserContext);

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime;
    setShowTime(false);

    let tempTime =
      parseInt(currentTime.getHours()) <= 9
        ? "0" + currentTime.getHours()
        : currentTime.getHours();
    tempTime += ":";
    tempTime +=
      parseInt(currentTime.getMinutes()) <= 9
        ? "0" + currentTime.getMinutes()
        : currentTime.getMinutes();
    setTextTime(tempTime);
    setTime(currentTime);
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

  const handleCloseAlert = () => {
    setSuccess(false);
    setDataError(false);
  };

  const resetInputs = () => {
    setLunes(false);
    setMartes(false);
    setMiercoles(false);
    setJueves(false);
    setViernes(false);
    setSabado(false);
    setDomingo(false);
    setName("");
    setShowTime(false);
    setTextTime("--:--");
    setTime(null);
    setInterval("1");
    setIntervalType("Días");
    setDurationType(1);
    setFinalDate("01/01/1970");
    setRepetitions("1");
    setDose("");
    setDoseType("");
    setCategory("");
    setNotes("");
    setTextDate("DD/MM/YYYY");
  };

  async function upload(doc) {
    try {
      // actualizado para que sea dentro de la colección users e itinerario, falta probarlo!!!
      const ref = collection(db, "users", user.uid, "itinerario");
      const docRef = await addDoc(ref, doc);
      console.log("Document written with ID: ", docRef.id);
      setSuccess(true);
      resetInputs();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  //Ya probado con la nueva referencia!
  async function modify(docu) {
    try {
      const ref = doc(db, "users", user.uid, "itinerario", itinerario?.id);
      await updateDoc(ref, docu);
      setSuccess(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function validateErrors() {
    let errors = [];
    if (!name || name === "" || /^\s*$/.test(name)) {
      setNameError(true);
      errors.push("- Nombre del medicamento");
    }
    if (time === null) {
      setHourError(true);
      errors.push("- Horario");
    }
    if (intervalType === "" || interval === "") {
      setIntervalError(true);
      errors.push("- Repetir cada");
    }
    if (
      (durationType != 1 && durationType != 2 && durationType != 3) ||
      (durationType == 3 && repetitions === "") ||
      (durationType == 2 && textDate === "DD/MM/YYYY")
    ) {
      setDurationError(true);
      errors.push("- Duración");
    }
    if (
      intervalType === "Semanas" &&
      !(lunes || martes || miercoles || jueves || viernes || sabado || domingo)
    ) {
      setDayError(true);
      errors.push("- Frecuencia");
    }
    return errors;
  }

  function onSubmit() {
    if (newPill) {
      const errors = validateErrors();
      if (errors.length === 0) {
        let dias;
        intervalType === "Semanas"
          ? (dias = [
              { key: "Sunday", selected: domingo },
              { key: "Monday", selected: lunes },
              { key: "Tuesday", selected: martes },
              { key: "Wednesday", selected: miercoles },
              { key: "Thursday", selected: jueves },
              { key: "Friday", selected: viernes },
              { key: "Saturday", selected: sabado },
            ])
          : (dias = null);

        let finalDate;
        console.log(durationType);
        if (durationType == 2) {
          var dateParts = textDate.split("/");
          finalDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
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
          horario: time,
          intervalo: parseInt(interval, 10),
          dias: dias, //SI ESTE VALOR ES NULL, SE SABE QUE EL INTERVALO ES EN DÍAS, de lo contrario, semanas
          tipo_duracion: durationType, //1: por siempre, 2: hasta una fecha específica, 3: repeticiones
          fecha_final: finalDate,
          repet_restantes: repet_restantes, //SE DEBE ACTUALIZAR CADA VEZ QUE SUENE LA ALARMA (OJO caso de intervalo en días es literal, caso de intervalo en semanas es por cada semana)
          dosis: dose, //ojoooo estos campos son opcionales, por tanto si dosis es 0 o vacío no se llenó
          dosis_tipo: doseType, //ojoooo si doseType es vacío la dosis no se llenó
          categoria: category, //ojooo si category es vacío no tiene categoría
          notas: notes, //ojoooo notas es opcional, puede estar vacío
        };
        console.log(JSON.stringify(newMed));

        upload(newMed);
      } else {
        setDataError(errors);
      }
    } else {
      const errors = validateErrors();

      if (errors.length === 0) {
        let dias;
        intervalType === "Semanas"
          ? (dias = [
              { key: "Sunday", selected: domingo },
              { key: "Monday", selected: lunes },
              { key: "Tuesday", selected: martes },
              { key: "Wednesday", selected: miercoles },
              { key: "Thursday", selected: jueves },
              { key: "Friday", selected: viernes },
              { key: "Saturday", selected: sabado },
            ])
          : (dias = null);

        let finalDate;
        if (durationType == 2) {
          var dateParts = textDate.split("/");
          finalDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
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
          horario: time,
          intervalo: parseInt(interval, 10),
          dias: dias, //SI ESTE VALOR ES NULL, SE SABE QUE EL INTERVALO ES EN DÍAS, de lo contrario, semanas
          tipo_duracion: durationType, //1: por siempre, 2: hasta una fecha específica, 3: repeticiones
          fecha_final: finalDate,
          repet_restantes: repet_restantes, //SE DEBE ACTUALIZAR CADA VEZ QUE SUENE LA ALARMA (OJO caso de intervalo en días es literal, caso de intervalo en semanas es por cada semana)
          dosis: dose, //ojoooo estos campos son opcionales, por tanto si dosis es 0 o vacío no se llenó
          dosis_tipo: doseType, //ojoooo si doseType es vacío la dosis no se llenó
          categoria: category, //ojooo si category es vacío no tiene categoría
          notas: notes, //ojoooo notas es opcional, puede estar vacío
        };
        console.log(changeMed);
        modify(changeMed);
      } else {
        setDataError(errors);
      }
    }
  }

  return (
    <>
      {success ? (
        <AlertMessage
          mNumber={0}
          header={
            itinerario
              ? "Se ha modificado con éxito"
              : "Se ha agregado con éxito"
          }
          handleCloseAlert={handleCloseAlert}
        />
      ) : dataError.length > 0 ? (
        <AlertMessage
          mNumber={3}
          header={"Te falta completar los siguientes campos:"}
          message={dataError.join("\n")}
          handleCloseAlert={handleCloseAlert}
        />
      ) : null}
      <ScrollView>
        <FormControl
          width={"90%"}
          alignSelf={"center"}
          isRequired
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {itinerario ? (
            <Button
              borderRadius="full"
              onPress={() => handleGoBack()}
              mt="5"
              style={{ alignSelf: "flex-start" }}
            >
              <Icon type={Icons.AntDesign} name={"back"} color={"white"} />
            </Button>
          ) : null}
          <Text
            bold
            fontSize="3xl"
            mb="5"
            textAlign={"center"}
            color="cyan.500"
          >
            {itinerario
              ? "Modifica el medicamento"
              : "Agrega un nuevo medicamento"}
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
              placeholder="Ingrese nombre del medicamento"
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
                    color={"#52489c"}
                    size={35}
                  />
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
              value={itinerario?.horario?.toDate() ?? new Date()}
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
                    value.includes(".") ||
                    value.includes("-") ||
                    value.includes(",") ||
                    value.includes(" ") ||
                    value === "0"
                  ) {
                    setInterval("1");
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
                  if (itemValue === "Días") {
                    setLunes(null);
                    setMartes(null);
                    setMiercoles(null);
                    setJueves(null);
                    setViernes(null);
                    setSabado(null);
                    setDomingo(null);
                  }
                }}
                defaultValue={
                  itinerario === null
                    ? "Días"
                    : itinerario?.dias === null
                    ? "Días"
                    : "Semanas"
                }
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
          {intervalType === "Semanas" ||
          lunes ||
          martes ||
          miercoles ||
          jueves ||
          viernes ||
          sabado ||
          domingo ? (
            <View style={styles.containerA}>
              <FormControl.Label>
                <Text color="platinum.500" fontWeight="bold">
                  Frecuencia
                </Text>
              </FormControl.Label>
              <Button.Group justifyContent="center" my="2">
                <Button
                  style={styles.days}
                  backgroundColor={domingo ? "cyan.500" : "white"}
                  onPress={() => setDomingo(!domingo)}
                  color="primary.700"
                  fontWeight="bold"
                  variant="subtle"
                  width="8"
                  height="8"
                  borderRadius="50"
                  padding="0"
                >
                  <Text color={domingo ? "white" : "black"}>D</Text>
                </Button>
                <Button
                  fontWeight="bold"
                  backgroundColor={lunes ? "cyan.500" : "white"}
                  onPress={() => setLunes(!lunes)}
                  color="primary.700"
                  variant="subtle"
                  width="8"
                  height="8"
                  borderRadius="50"
                  padding="0"
                >
                  <Text color={lunes ? "white" : "black"}>L</Text>
                </Button>
                <Button
                  fontWeight="bold"
                  onPress={() => setMartes(!martes)}
                  backgroundColor={martes ? "cyan.500" : "white"}
                  color="primary.700"
                  variant="subtle"
                  width="8"
                  height="8"
                  padding="0"
                  borderRadius="50"
                >
                  <Text color={martes ? "white" : "black"}>M</Text>
                </Button>
                <Button
                  fontWeight="bold"
                  backgroundColor={miercoles ? "cyan.500" : "white"}
                  onPress={() => setMiercoles(!miercoles)}
                  color="primary.700"
                  variant="subtle"
                  width="8"
                  height="8"
                  borderRadius="50"
                  padding="0"
                >
                  <Text color={miercoles ? "white" : "black"}>M</Text>
                </Button>
                <Button
                  fontWeight="bold"
                  backgroundColor={jueves ? "cyan.500" : "white"}
                  onPress={() => setJueves(!jueves)}
                  color="primary.700"
                  variant="subtle"
                  width="8"
                  height="8"
                  borderRadius="50"
                  padding="0"
                >
                  <Text color={jueves ? "white" : "black"}>J</Text>
                </Button>
                <Button
                  fontWeight="bold"
                  backgroundColor={viernes ? "cyan.500" : "white"}
                  onPress={() => setViernes(!viernes)}
                  color="primary.700"
                  variant="subtle"
                  width="8"
                  height="8"
                  borderRadius="50"
                  padding="0"
                >
                  <Text color={viernes ? "white" : "black"}>V</Text>
                </Button>
                <Button
                  fontWeight="bold"
                  backgroundColor={sabado ? "cyan.500" : "white"}
                  onPress={() => setSabado(!sabado)}
                  color="primary.700"
                  variant="subtle"
                  width="8"
                  height="8"
                  borderRadius="50"
                  padding="0"
                >
                  <Text color={sabado ? "white" : "black"}>S</Text>
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
                if ((value === 1) | (value === 2) | (value === 3)) {
                  console.log(value);
                  setDurationType(value);
                }
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
                          value.startsWith("0") ||
                          value.includes("-") ||
                          value.includes(",") ||
                          value.includes(" ")
                        ) {
                          setRepetitions("");
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
        <FormControl width={"90%"} alignSelf={"center"} pb="10">
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
                keyboardType="numeric"
                borderColor="primary.300"
                placeholder="0"
                placeholderTextColor="gray.500"
                width="20%"
                value={dose}
                onChangeText={(value) => {
                  if (
                    value.startsWith("0") ||
                    value.includes("-") ||
                    value.includes(",") ||
                    value.includes(" ")
                  ) {
                    setDose("");
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
                Categoría
              </Text>
            </FormControl.Label>
            <HStack justifyContent="space-between">
              <Select
                backgroundColor="white"
                borderRadius="20"
                minWidth="100%"
                borderColor="primary.300"
                placeholderTextColor="gray.500"
                accessibilityLabel="Escoja la categoría"
                placeholder="Escoja la categoría"
                selectedValue={category}
                onValueChange={(value) => {
                  setCategory(value);
                }}
              >
                <Select.Item
                  label="Analgésico (aliviar dolor)"
                  value="Analgésico"
                />
                <Select.Item
                  label="Antiácido (disminuir secreciones gástricas)"
                  value="Antiácido"
                />
                <Select.Item
                  label="Antialérgico (combatir reacciones alérgicas)"
                  value="Antialérgicos"
                />
                <Select.Item
                  label="Antibiótico (hacer frente a infecciones de bacterias)"
                  value="Antibiótico"
                />
                <Select.Item
                  label="Antidiarreico (aliviar diarrea)"
                  value="Antidiarreico"
                />
                <Select.Item
                  label="Antifúngico (hacer frente a infecciones de hongos)"
                  value="Antifúngico"
                />
                <Select.Item
                  label="Antiinflamatorio (reducir inflamación)"
                  value="Antiinflamatorio"
                />
                <Select.Item
                  label="Antiparasitario (hacer frente a infecciones de parásitos)"
                  value="Antiparasitario"
                />
                <Select.Item
                  label="Antipirético (reducir la fiebre)"
                  value="Antipirético"
                />
                <Select.Item
                  label="Antitusivo (reducir tos no productiva)"
                  value="Antitusivo"
                />
                <Select.Item
                  label="Antiviral (hacer frente a infecciones de virus)"
                  value="Antiviral"
                />
                <Select.Item
                  label="Laxante (resolver estreñimiento)"
                  value="Laxante"
                />
                <Select.Item
                  label="Mucolítico (eliminar secreciones bronquiales)"
                  value="Mucolítico"
                />
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
              marginBottom: itinerario ? 50 : 20,
              width: "60%",
              marginLeft: "20%",
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
    </>
  );
};

const styles = StyleSheet.create({
  mequieromatar: {
    width: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderLeftColor: '#3e3675',
  },
  containerQ: {
    backgroundColor: "#3e3675",
    width: "100%",
    padding: 10,
    borderRadius: 20,
  },
  error: {
    color: "red",
    fontSize: 11,
  },

  containerA: {
    marginTop: 15,
    backgroundColor: "#3e3675",
    width: "100%",
    padding: 10,
    borderRadius: 20,
  },
  days: {
    textAlign: "center",
    padding: 0,
  },
  containerB: {
    marginTop: 15,
    backgroundColor: "#3e3675",
    width: "100%",
    padding: 10,
    borderRadius: 20,
  },
  containerC: {
    marginTop: 15,
    backgroundColor: "#3e3675",
    width: "100%",
    padding: 10,
    borderRadius: 20,
  },

  containerD: {
    marginTop: 15,
    backgroundColor: "#3e3675",
    width: "100%",

    padding: 10,
    borderRadius: 20,
  },

  containerE: {
    marginTop: 15,
    paddingBottom: 15,

    backgroundColor: "#3e3675",
    width: "100%",
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
});

export default PillForm;
