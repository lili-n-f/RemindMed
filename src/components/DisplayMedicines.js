import React, { useState } from "react";
import { Button, ScrollView } from "native-base";

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
  React.useEffect(() => {
    getData();
  }, [refresh]);

  return (
    <ScrollView style={{ height: "88%" }}>
      <Button onPress={() => setRefresh(!refresh)}>refrescar</Button>
      {data?.map((itinerario) => (
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
