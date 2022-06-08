import React, { useState } from 'react';
import { ScrollView, View } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import PillCard from './PillCard';
import PillFormPage from '../screens/PillFormPage';


export default function DisplayMedicines({data, handleDelete}) {
  const isFocused = useIsFocused();
  const [itinerario, setItinerario] = useState(null);

  const handleShowForm = (itinerario) => {
    setItinerario(itinerario);
  };

  const handleHideForm = () => {
    setItinerario(false);
  };



  return itinerario ? (
    <PillFormPage
      newPill={false}
      itinerario={itinerario}
      handleGoBack={handleHideForm}
    />
  ) : (
      <ScrollView marginTop="5" style={{ marginBottom: 60 }}>
        {data?.map((itinerario, i) => (
          <PillCard
            key={itinerario.id}
            name={itinerario.nombre}
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
