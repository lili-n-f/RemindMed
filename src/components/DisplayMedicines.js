import React, { useState } from "react";
import { Box, ScrollView, View, Text } from "native-base";
import { StyleSheet } from "react-native";
import PillCard from "./PillCard";

export default function DisplayMedicines({
  data,
  handleDelete,
  handleShowFormTwo,
}) {
  const handleShowForm = (itinerario) => {
    handleShowFormTwo(itinerario);
  };
  const [today, setToday] = React.useState(new Date());

  //para que las horas aparezcan como 02:05 en lugar de 2:5
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

  function sortDataByHour(array) {
    //ordena los itinerarios por hora, de mas temprano a mas tarde
    const arrSort = array?.sort((a, b) => {
      if (
        a?.horario?.toDate().getHours() - b?.horario?.toDate().getHours() ===
        0
      ) {
        return (
          a?.horario?.toDate().getMinutes() - b?.horario?.toDate().getMinutes()
        );
      } else {
        return (
          a?.horario?.toDate().getHours() - b?.horario?.toDate().getHours()
        );
      }
    });

    return arrSort;
  }
  function filterDataIsToday(array) {
    //filtra los itinerarios cuyos recordatorios deben ser hoy
    const arrSort = array.filter((itinerario) => {
      let entra = false;
      if (itinerario?.dias) {
        itinerario?.dias?.map((dia, i) => {
          if (today.getDay() === i && dia.selected) {
            entra = true;
          }
        });
      } else {
        entra = true;
      }
      return entra;
    });

    return arrSort;
  }
  function filterDataIsNotToday(array) {
    //filtra los itinerarios cuyos recordatorios NO son de hoy
    const arrSort = array.filter((itinerario) => {
      let entra = true;
      if (itinerario?.dias) {
        itinerario?.dias?.map((dia, i) => {
          if (today.getDay() === i && dia.selected) {
            entra = false;
          }
        });
      } else {
        entra = false;
      }
      return entra;
    });

    return arrSort;
  }

  return (
    <View style={{ height: "84%", paddingTop: 20 }}>
      <ScrollView>
        <Box px="4">
          <Text color="white" pb="2" style={styles.titulo_tarjeta}>
            Hoy
          </Text>
        </Box>
        {filterDataIsToday(sortDataByHour(data))?.map((itinerario, i) => (
          <PillCard
            key={itinerario.id}
            name={itinerario.nombre}
            days={itinerario.dias}
            horario={getTime(itinerario?.horario?.toDate())}
            dosis={
              itinerario.dosis === "" || itinerario.dosis === "0"
                ? "Dosis no especificada"
                : itinerario.dosis_tipo === ""
                ? "Dosis no especificada"
                : itinerario.dosis + " " + itinerario.dosis_tipo
            }
            repetitions={null}
            datos={itinerario}
            handleShowForm={handleShowForm}
            style={i === data?.length - 1}
            handleDelete={handleDelete}
          ></PillCard>
        ))}
        <Box px="4" pt="6">
          <Text color="white" pb="2" style={styles.titulo_tarjeta}>
            Otros días
          </Text>
        </Box>
        {filterDataIsNotToday(sortDataByHour(data))?.map((itinerario, i) => (
          <PillCard
            key={itinerario.id}
            name={itinerario.nombre}
            days={itinerario.dias}
            horario={getTime(itinerario?.horario?.toDate())}
            dosis={
              itinerario.dosis === "" || itinerario.dosis === "0"
                ? "Dosis no especificada"
                : itinerario.dosis_tipo === ""
                ? "Dosis no especificada"
                : itinerario.dosis + " " + itinerario.dosis_tipo
            }
            datos={itinerario}
            handleShowForm={handleShowForm}
            style={i === data?.length - 1}
            handleDelete={handleDelete}
          ></PillCard>
        ))}
        <Box h="10"></Box>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  titulo_tarjeta: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#F6F6F6",
  },
});
