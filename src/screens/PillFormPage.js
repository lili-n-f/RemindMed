import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import PillForm from '../components/PillForm';

export default function PillFormPage({
  newPill = true,
  itinerario = null,
  handleGoBack = null,
}) {
  return (
    <SafeAreaView
      style={{
        marginBottom: itinerario ? 0 : 30,
      }}
    >
      <StatusBar />

      <PillForm
        newPill={newPill}
        itinerario={itinerario}
        handleGoBack={handleGoBack}
      />
    </SafeAreaView>
  );
}
