import React, { useState } from "react";
import { ScrollView, View } from "native-base";
import { useIsFocused } from "@react-navigation/native";
import PillCard from "./PillCard";

export default function DisplayMedicines({
  data,
  handleDelete,
  handleShowFormTwo,
}) {
  const isFocused = useIsFocused();

  const handleShowForm = (itinerario) => {
    handleShowFormTwo(itinerario);
  };

  return (
    <ScrollView marginTop="5" style={{ marginBottom: 60 }}>
      {data?.map((itinerario, i) => (
        <PillCard
          key={itinerario.id}
          name={itinerario.nombre}
          horario={itinerario.horario}
          dosis={itinerario.dosis + " " + itinerario.dosis_tipo}
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
