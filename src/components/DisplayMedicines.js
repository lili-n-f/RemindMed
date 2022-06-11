import React, { useState } from 'react';
import { Box, ScrollView, View, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import PillCard from './PillCard';

export default function DisplayMedicines({
  data,
  handleDelete,
  handleShowFormTwo,
}) {
  const handleShowForm = (itinerario) => {
    handleShowFormTwo(itinerario);
  };
  const [today, setToday] = React.useState(new Date());

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
    <ScrollView marginTop="5" height="70%">
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
          horario={
            itinerario?.horario?.toDate().getHours() +
            ':' +
            itinerario?.horario?.toDate().getMinutes()
          }
          dosis={itinerario.dosis + ' ' + itinerario.dosis_tipo}
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
          horario={
            itinerario?.horario?.toDate().getHours() +
            ':' +
            itinerario?.horario?.toDate().getMinutes()
          }
          dosis={itinerario.dosis + ' ' + itinerario.dosis_tipo}
          datos={itinerario}
          handleShowForm={handleShowForm}
          style={i === data?.length - 1}
          handleDelete={handleDelete}
        ></PillCard>
      ))}
      <Box h="10"></Box>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  titulo_tarjeta: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#F6F6F6',
  },
});
