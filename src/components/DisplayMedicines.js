import React, { useState } from "react";
import { Button, ScrollView, Text } from "native-base";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import PillCard from "./PillCard";

export default function DisplayMedicines() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  async function getData() {
    const dataList = [];
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const object = doc.data();
      object["id"] = doc.id;
      dataList.push(object);
    });
    setData(dataList);
  }
  const dataReformed = data.filter((itinerario) => itinerario.activo === true);

  React.useEffect(() => {
    getData();
  }, [refresh]);

  return (
    <ScrollView marginTop="16">
      <Button
        alignSelf="center"
        borderRadius="20"
        width="346"
        height="68"
        bg={"cyan.500"}
        onPress={() => setRefresh(!refresh)}
      >
        <Text fontWeight="bold" fontSize="20" color="#324848">
          REFRESCAR
        </Text>
      </Button>
      {dataReformed?.map((itinerario) => (
        <PillCard
          key={itinerario.id}
          name={itinerario.nombre}
          dosis={itinerario.dosis + " " + itinerario.dosis_tipo}
          repetitions={null}
          datos={itinerario}
        ></PillCard>
      ))}
    </ScrollView>
  );
}
