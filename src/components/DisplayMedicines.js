import React, { useState } from 'react';
import { ScrollView } from 'native-base';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import PillCard from './PillCard';

export default function DisplayMedicines() {
  const [data, setData] = useState([]);

  async function getData() {
    const dataList = [];
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      const object = doc.data();
      object['id'] = doc.id;
      dataList.push(object);
    });
    setData(dataList);
  }
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={{ height: '88%' }}>
      {data?.map((itinerario) => (
        <PillCard
          name={itinerario.nombre}
          dosis={itinerario.dosis + ' ' + itinerario.dosis_tipo}
          repetitions={null}
        ></PillCard>
      ))}
    </ScrollView>
  );
}
