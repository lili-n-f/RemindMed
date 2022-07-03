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
  Box,
  Divider,
  Spinner,
  Heading,
  Center,
} from "native-base";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Icon, { Icons } from "./Icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AlertMessage from "./AlertMessage";
import { UserContext } from "../../ContextProvider";
import { useIsFocused } from "@react-navigation/native";

const PillForm = ({ newPill, itinerario = null, handleGoBack = null }) => {
  const [disable, setDisable] = useState(false);

  //use states para los errores de input
  const [nameError, setNameError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dataError, setDataError] = useState([]);
  const [hourError, setHourError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [dayError, setDayError] = useState(false);
  const [medUserError, setMedUserError] = useState(false);

  //BOTONES DE DIAS DE LA SEMANA
  const [lunes, setLunes] = useState(
    itinerario?.dias?.[1]?.selected ?? false);
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

  const [addMed, setAddMed] = useState(false);
  const [medOptions, setMedOptions] = useState([]);
  const [commonMeds, setCommonMeds] = useState([]);
  const [med, setMed] = useState(itinerario?.nombre ?? "");
  const [name, setName] = useState("");

  const [showTime, setShowTime] = useState(false); //para mostrar el time picker cuando es true
  const [textTime, setTextTime] = useState(
    //la hora mostrada como texto (si no hay, el default es --:--)
    itinerario && itinerario.horario
      ? getTime(itinerario.horario.toDate())
      : "--:--"
  );
  const [time, setTime] = useState(itinerario?.horario.toDate() ?? null);

  function getTime(time) {
    let tempTime =
      parseInt(time.getHours()) <= 9 ? "0" + time.getHours() : time.getHours();
    tempTime += ":";
    tempTime +=
      parseInt(time.getMinutes()) <= 9
        ? "0" + time.getMinutes()
        : time.getMinutes();
    return tempTime;
  }

  const [intervalType, setIntervalType] = useState(
    itinerario?.dias ? "Seleccionar días de la semana" : "Todos los días"
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

  const [notes, setNotes] = useState(itinerario?.notas ?? "");

  const [showDate, setShowDate] = useState(false); //para mostrar el date picker cuando es true
  const [textDate, setTextDate] = useState(
    //la fecha mostrada como texto (si no hay, el default es DD/MM/YYYY)
    (itinerario?.fecha_final?.toDate().getUTCDate() ?? "DD") +
      "/" +
      (itinerario?.fecha_final?.toDate().getUTCMonth() ?? "MM") +
      "/" +
      (itinerario?.fecha_final?.toDate().getUTCFullYear() ?? "YYYY")
  );

  const isFocused = useIsFocused();
  const { user } = useContext(UserContext);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const [addUser, setAddUser] = useState(false); //para mostrar el input para agregar un nuevo usuario
  const [userOptions, setUserOptions] = useState([]); //las opciones de usuario que tiene para quién se toma el medicamento
  const [medUser, setMedUser] = useState(itinerario?.usuario ?? ""); //el usuario que toma el medicamento
  const [medUserName, setMedUserName] = useState("");

  const getUserData = async () => {
    // Se trae la data del usuario loggeado
    const usr = await getDoc(doc(db, "users", user.uid));
    setUsuario(usr.data()); // IMPORTANTE el .data() para que se guarde correctamente
    setUserOptions(usr.data().perfiles_asoc);
    setMedOptions(usr.data().medicinas_asoc);
  };

  const getMedData = async () => {
    // Se trae los medicamentos cargados en la BD
    const md = await getDoc(doc(db, "meds", "PYs6hF2O1L5mY93trPWL"));
    setCommonMeds(md.data().medicamentos_comunes);
  };

  useEffect(() => {
    // Este useEffect es para traerse la info del user que está loggeado, depende del isFocused
    if (isFocused) {
      getUserData();
      getMedData();
    }
  }, [isFocused]);

  useEffect(() => {
    // Aquí se verifica si se está cargando y si el usuario NO ES falsy (es decir, no null), en cuyo caso ya se cargó correctamente el usuario y se settea el loading como false para que se renderice la página que es
    // Depende de usuario porque cuando éste cambie, se revisará la condición
    if (loading && usuario && commonMeds) {
      setLoading(false);
    }
  }, [usuario, commonMeds]);

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime;
    setShowTime(false);

    let tempTime =
      parseInt(currentTime.getHours()) <= 9
        ? "0" + currentTime.getHours() //para que las horas aparezcan como 02:05 en lugar de 2:5
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
    setMed("");
    setAddMed(false);
    setShowTime(false);
    setTextTime("--:--");
    setTime(null);
    setIntervalType("Todos los días");
    setDurationType(1);
    setFinalDate("01/01/1970");
    setRepetitions("");
    setDose("");
    setDoseType("");
    setAddUser(false);
    setNotes("");
    setTextDate("DD/MM/YYYY");
    setMedUser("");
    setMedUserName("");
    getUserData();
  };

  async function upload(doc) {
    try {
      // actualizado para que sea dentro de la colección users e itinerario
      const ref = collection(db, "users", user.uid, "itinerario");
      const docRef = await addDoc(ref, doc);
      console.log("Document written with ID: ", docRef.id);
      setSuccess(true);
      resetInputs();
      setDisable(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function modify(docu) {
    try {
      const ref = doc(db, "users", user.uid, "itinerario", itinerario?.id);
      await updateDoc(ref, docu);
      setSuccess(true);
      setDisable(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function validateErrors() {
    let errors = [];
    if (
      med === "" ||
      (med === "Otro" && (!name || name === "" || /^\s*$/.test(name)))
    ) {
      setNameError(true);
      errors.push("- Nombre del medicamento");
    }
    if (time === null) {
      setHourError(true);
      errors.push("- Horario");
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
      intervalType === "Seleccionar días de la semana" &&
      !(lunes || martes || miercoles || jueves || viernes || sabado || domingo)
    ) {
      setDayError(true);
      errors.push("- Frecuencia");
    }
    if (
      medUser === "Otro" &&
      (!medUserName || medUserName === "" || /^\s*$/.test(medUserName))
    ) {
      setMedUserError(true);
      errors.push("- Nombre de quién toma el medicamento");
    }
    return errors;
  }

  async function modifyUser() {
    var foundUser = false;
    for (option of userOptions) {
      //se valida que no exista ya el usuario agregado (para evitar usuarios duplicados)
      if (medUserName === option) {
        foundUser = true;
        break;
      }
    }
    var foundMed = false;
    for (option of medOptions) {
      //se valida que no haya medicamentos duplicados
      if (name === option) {
        foundMed = true;
        break;
      }
    }

    try {
      if (!foundUser && medUserName) {
        //se agrega el nuevo usuario a los perfiles asociados
        var newPerfilesAsoc = [...userOptions, medUserName].sort((a, b) =>
          a.localeCompare(b)
        ); /*Mostraremos las opciones en orden alfabético */
      } else {
        //nada que agregar, ya existía la opción nueva
        var newPerfilesAsoc = userOptions;
      }

      if (!foundMed && name) {
        //se agrega el nuevo medicamento a los medicamentos del usuario
        var newMedicinasAsoc = [...medOptions, name].sort((a, b) =>
          a.localeCompare(b)
        );
      } else {
        //nada que agregar
        var newMedicinasAsoc = medOptions;
      }

      if (!foundMed || !foundUser) {
        //sólo si hay algo nuevo que agregar se ejecuta el guardado
        var updatedUser = {
          email: usuario.email,
          name: usuario.name,
          notas: usuario.notas,
          perfiles_asoc: newPerfilesAsoc,
          medicinas_asoc: newMedicinasAsoc,
          sangre: usuario.sangre,
          sexo: usuario.sexo,
          uid: usuario.uid,
        };

        const usr = doc(db, "users", usuario.uid);
        await updateDoc(usr, updatedUser);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function onSubmit() {
    setNameError(false);
    setHourError(false);
    setDurationError(false);
    setDayError(false);
    setMedUserError(false);
    if (newPill) {
      const errors = validateErrors();

      if (errors.length === 0) {
        let dias;
        intervalType === "Seleccionar días de la semana"
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
          var dateParts = textDate.split("/"); //se obtiene día, mes, año
          finalDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
          //de este modo se crea una nueva fecha con año, mes (se debe restar uno porque empieza desde 0 el número de los meses), y día
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
          nombre: med === "Otro" ? name : med, //si escogió agregar un nuevo medicamento (opción "Otro") se coloca su nombre, si no se coloca lo escogido en el select (med)
          fecha_registro: new Date(), //esto para hacer los cálculos de las fechas finales
          horario: time,
          dias: dias, //SI ESTE VALOR ES NULL, SE SABE QUE EL INTERVALO ES EN Todos los días, de lo contrario, Seleccionar días de la semana
          tipo_duracion: durationType, //1: por siempre, 2: hasta una fecha específica, 3: repeticiones
          fecha_final: finalDate,
          repet_restantes: repet_restantes, //SE DEBE ACTUALIZAR CADA VEZ QUE SUENE LA ALARMA (OJO caso de intervalo en Todos los días es literal, caso de intervalo en Seleccionar días de la semana es por cada semana)
          dosis: dose, //ojoooo estos campos son opcionales, por tanto si dosis es 0 o vacío no se llenó
          dosis_tipo: doseType, //ojoooo si doseType es vacío la dosis no se llenó
          usuario: medUser === "Otro" ? medUserName : medUser, //si escogió agregar un nuevo usuario (opción "Otro") se coloca su nombre, si no se coloca lo escogido en el select (medUser)
          notas: notes, //ojoooo notas es opcional, puede estar vacío
        };
        console.log(JSON.stringify(newMed));

        upload(newMed);

        if (medUser === "Otro" || med === "Otro") {
          //si se agregó un nuevo usuario a los perfiles asociados o un med, se guarda en la BD
          modifyUser();
        }
      } else {
        setDataError(errors);
        setDisable(false);
      }
    } else {
      const errors = validateErrors();

      if (errors.length === 0) {
        let dias;
        intervalType === "Seleccionar días de la semana"
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
          nombre: med === "Otro" ? name : med, //si escogió agregar un nuevo medicamento (opción "Otro") se coloca su nombre, si no se coloca lo escogido en el select (med)
          fecha_registro: new Date(), //esto para hacer los cálculos de las fechas finales
          horario: time,
          dias: dias, //SI ESTE VALOR ES NULL, SE SABE QUE EL INTERVALO ES EN Todos los días, de lo contrario, Seleccionar días de la semana
          tipo_duracion: durationType, //1: por siempre, 2: hasta una fecha específica, 3: repeticiones
          fecha_final: finalDate,
          repet_restantes: repet_restantes, //SE DEBE ACTUALIZAR CADA VEZ QUE SUENE LA ALARMA (OJO caso de intervalo en Todos los días es literal, caso de intervalo en Seleccionar días de la semana es por cada semana)
          dosis: dose, //ojoooo estos campos son opcionales, por tanto si dosis es 0 o vacío no se llenó
          dosis_tipo: doseType, //ojoooo si doseType es vacío la dosis no se llenó
          usuario: medUser === "Otro" ? medUserName : medUser, //si escogió agregar un nuevo usuario (opción "Otro") se coloca su nombre, si no se coloca lo escogido en el select (medUser)
          notas: notes, //ojoooo notas es opcional, puede estar vacío
        };
        console.log(changeMed);
        modify(changeMed);

        if (medUser === "Otro" || med === "Otro") {
          //si se agregó un nuevo usuario a los perfiles asociados o un med, se guarda en la BD
          modifyUser();
        }
      } else {
        setDataError(errors);
        setDisable(false);
      }
    }
  }

  function makeItem(option) {
    return <Select.Item label={option} value={option} key={option} />;
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
          header={"Le falta completar los siguientes campos:"}
          message={dataError.join("\n")}
          handleCloseAlert={handleCloseAlert}
        />
      ) : null}
      {itinerario ? (
        <Button
          borderRadius="full"
          onPress={() => handleGoBack()}
          mt="5"
          ml="5"
          style={{ position: "absolute", zIndex: 10 }}
        >
          <Icon type={Icons.AntDesign} name={"back"} color={"white"} />
        </Button>
      ) : null}

      {loading ? (
        <View style={styles.loading}>
          <HStack space={2} alignItems="center" justifyContent="center">
            <Spinner accessibilityLabel="Cargando" color="#E5E5E5" size="lg" />
            <Heading color="#E5E5E5" fontSize="lg">
              Cargando...
            </Heading>
          </HStack>
        </View>
      ) : (
        <>
          <View style={styles.container1}>
            <Box w="60">
              <Divider my="2" bg="green.500" thickness="4" />
            </Box>
            <Text style={styles.titulo}>
              {itinerario
                ? "Modifica el recordatorio"
                : "Agrega un recordatorio"}
            </Text>
            <Box w="300">
              <Divider my="2" bg="green.500" thickness="4" />
            </Box>
          </View>
          <View
            style={{ paddingBottom: itinerario ? 330 : 300, paddingTop: 5 }}
          >
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
                <View style={styles.containerQ}>
                  <FormControl.Label>
                    <Text color="platinum.500" fontWeight="bold">
                      Medicamento
                    </Text>
                  </FormControl.Label>
                  <VStack justifyContent="space-between">
                    <Select
                      backgroundColor="white"
                      borderRadius="20"
                      minWidth="100%"
                      borderColor="primary.300"
                      placeholderTextColor="gray.500"
                      accessibilityLabel="Escoja el medicamento"
                      placeholder="Escoja el medicamento"
                      selectedValue={med}
                      onValueChange={(value) => {
                        setMed(value);
                        if (value == "Otro") {
                          setAddMed(true); //con esto, se muestra input de nueva medicina
                        } else {
                          setAddMed(false);
                        }
                      }}
                    >
                      {
                        commonMeds
                          .concat(medOptions)
                          .sort((a, b) => a.localeCompare(b))
                          .map(
                            makeItem
                          ) /*Con esto mostramos las medicinas comunes + las medicinas custom del usuario loggeado*/
                      }

                      <Select.Item label="Otro" value="Otro" />
                    </Select>
                    {addMed ? (
                      <View>
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
                          <Text style={styles.error}>
                            * Debe introducir un nombre
                          </Text>
                        ) : null}
                      </View>
                    ) : null}
                  </VStack>
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
                    <Text style={styles.error}>
                      * Debe introducir un horario
                    </Text>
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
                    <Select
                      backgroundColor="white"
                      borderRadius="20"
                      minWidth="100%"
                      borderColor="primary.300"
                      placeholderTextColor="gray.500"
                      accessibilityLabel="Escoja el intervalo"
                      placeholder="Escoja el intervalo"
                      onValueChange={(itemValue) => {
                        setIntervalType(itemValue);
                        if (itemValue === "Todos los días") {
                          setLunes(null);
                          setMartes(null);
                          setMiercoles(null);
                          setJueves(null);
                          setViernes(null);
                          setSabado(null);
                          setDomingo(null);
                        }
                      }}
                      selectedValue={intervalType}
                      defaultValue={
                        itinerario === null
                          ? "Todos los días"
                          : itinerario?.dias === null
                          ? "Todos los días"
                          : "Seleccionar días de la semana"
                      }
                    >
                      <Select.Item
                        label="Seleccionar días de la semana"
                        value="Seleccionar días de la semana"
                      />
                      <Select.Item
                        label="Todos los días"
                        value="Todos los días"
                      />
                    </Select>
                  </HStack>
                </View>
                {intervalType === "Seleccionar días de la semana" ||
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
                        Días de la semana
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
                      <Text style={styles.error}>
                        * Debe introducir los Todos los días
                      </Text>
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
                    <Text style={styles.error}>
                      * Debe introducir la duración
                    </Text>
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
                      <Select.Item
                        label="Cucharadita(s)"
                        value="Cucharadita(s)"
                      />
                      <Select.Item label="Unidad(es)" value="Unidad(es)" />
                      <Select.Item label="Taza(s)" value="Taza(s)" />
                      <Select.Item label="Spray(s)" value="Spray(s)" />
                      <Select.Item
                        label="Supositorio(s)"
                        value="Supositorio(s)"
                      />
                      <Select.Item
                        label="Cucharadita(s)"
                        value="Cucharadita(s)"
                      />
                      <Select.Item
                        label="Inyección(es)"
                        value="Inyección(es)"
                      />
                    </Select>
                  </HStack>
                </View>

                <View style={styles.containerE}>
                  <FormControl.Label>
                    <Text color="platinum.500" fontWeight="bold">
                      ¿Quién lo toma?
                    </Text>
                  </FormControl.Label>
                  <VStack justifyContent="space-between">
                    <Select
                      backgroundColor="white"
                      borderRadius="20"
                      minWidth="100%"
                      borderColor="primary.300"
                      placeholderTextColor="gray.500"
                      accessibilityLabel="Escoja la persona que toma el medicamento"
                      placeholder="Escoja la persona que toma el medicamento"
                      selectedValue={medUser}
                      onValueChange={(value) => {
                        setMedUser(value);
                        if (value == "Otro") {
                          setAddUser(true); //con esto, se muestra input de nuevo usuario de medicina
                        } else {
                          setAddUser(false);
                        }
                      }}
                    >
                      <Select.Item
                        label="Yo"
                        value={usuario ? usuario.name : "Usuario actual"}
                      />
                      {
                        userOptions.map(
                          makeItem
                        ) /*Con esto mostramos los perfiles asociados al usuario loggeado: usuarios de medicinas antes agregados*/
                      }
                      <Select.Item label="Otro" value="Otro" />
                    </Select>
                    {addUser ? (
                      <View>
                        <FormControl isRequired>
                          <FormControl.Label>
                            <Text color="platinum.500" fontWeight="bold">
                              Nombre de quién toma el medicamento
                            </Text>
                          </FormControl.Label>
                          <Input
                            backgroundColor="white"
                            borderRadius="20"
                            variant="filled"
                            borderColor="primary.300"
                            placeholderTextColor="gray.500"
                            placeholder="Nombre"
                            value={medUserName}
                            onChangeText={(value) => {
                              setMedUserName(value);
                            }}
                          />
                        </FormControl>
                        {medUserError ? (
                          <Text style={styles.error}>
                            * Debe introducir un nombre
                          </Text>
                        ) : null}
                      </View>
                    ) : null}
                  </VStack>
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
                {disable ? (
                  <Button
                    isLoading
                    isLoadingText="Subiendo..."
                    style={{
                      marginTop: 15,
                      width: "60%",
                      marginLeft: "20%",
                      borderRadius: 20,
                    }}
                    bg={"cyan.500"}
                  ></Button>
                ) : (
                  <Button
                    onPress={() => {
                      setDisable(true);
                      onSubmit();
                    }}
                    style={{
                      marginTop: 15,
                      width: "60%",
                      marginLeft: "20%",
                      borderRadius: 20,
                    }}
                    bg={"cyan.500"}
                  >
                    <Text fontWeight="bold" color="white">
                      ¡Listo!
                    </Text>
                  </Button>
                )}
              </FormControl>
            </ScrollView>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loading: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    color: "#E5E5E5",
    fontWeight: "bold",
    fontSize: 40,
    lineHeight: 40,
    textAlign: "center",
  },

  container1: {
    color: "#FFFF",
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  mequieromatar: {
    width: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
