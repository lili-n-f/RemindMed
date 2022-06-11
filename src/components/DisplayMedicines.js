import React, { useState } from 'react';
import { Box, ScrollView, View } from 'native-base';
import PillCard from './PillCard';

export default function DisplayMedicines({
  data,
  handleDelete,
  handleShowFormTwo,
}) {
  const handleShowForm = (itinerario) => {
    handleShowFormTwo(itinerario);
  };

  return (
    <ScrollView marginTop="5" height="70%" style={{ paddingBottom: 10 }}>
      {data?.map((itinerario, i) => (
        <PillCard
          key={itinerario.id}
          name={itinerario.nombre}
          horario={
            itinerario?.horario?.toDate().getHours() +
            ':' +
            itinerario?.horario?.toDate().getMinutes()
          }
          dosis={itinerario.dosis + ' ' + itinerario.dosis_tipo}
          repetitions={null}
          datos={itinerario}
          handleShowForm={handleShowForm}
          style={i === data?.length - 1}
          handleDelete={handleDelete}
        ></PillCard>
      ))}
    </ScrollView>
  );
}
