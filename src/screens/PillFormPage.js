import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import PillForm from '../components/PillForm';

export default function PillFormPage({ newPill, itinerario = null }) {
  return (
    <SafeAreaView
      style={{
        marginBottom: 75,
      }}
    >
      <StatusBar />
      <PillForm newPill={newPill} />
    </SafeAreaView>
  );
}
