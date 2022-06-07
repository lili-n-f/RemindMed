import React, { useState } from 'react';
import { Button, ScrollView, Text } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import PillCard from './PillCard';
import PillFormPage from '../screens/PillFormPage';

export default function DisplayMedicines() {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [itinerario, setItinerario] = useState(null);

  async function getData() {
    const dataList = [];
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, ' => ', doc.data());
      const object = doc.data();
      object['id'] = doc.id;
      if (object.activo) {
        dataList.push(object);
      }
    });
    setData(dataList);
  }
  const dataReformed = data.filter((itinerario) => itinerario.activo === true);

  const handleShowForm = (itinerario) => {
    setItinerario(itinerario);
  };
  const handleHideForm = () => {
    setItinerario(false);
  };

  const handleDelete = async (datos) => {
    const ref = doc(db, 'usuarios', datos.id);
    await updateDoc(ref, { activo: false });
    getData();
  };

  React.useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [itinerario, isFocused]);

  return itinerario ? (
    <PillFormPage
      newPill={false}
      itinerario={itinerario}
      handleGoBack={handleHideForm}
    />
  ) : (
    <ScrollView marginTop="5">
      {dataReformed?.map((itinerario, i) => (
        <PillCard
          key={itinerario.id}
          name={itinerario.nombre}
          dosis={itinerario.dosis + ' ' + itinerario.dosis_tipo}
          repetitions={null}
          datos={itinerario}
          handleShowForm={handleShowForm}
          style={i === dataReformed?.length - 1}
          handleDelete={handleDelete}
        ></PillCard>
      ))}
    </ScrollView>
  );
}
