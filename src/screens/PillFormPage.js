import React from 'react';
import { SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import PillForm from '../components/PillForm';

export default function PillFormPage({
  newPill = true,
  itinerario = null,
  handleGoBack = null,
}) {

  const image = { uri: 'https://i.ibb.co/ypq3LQ1/fondo.png' };

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ width: '100%', height: '100%' }}
    >
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
    </ImageBackground>
  );
}
