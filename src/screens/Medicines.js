import { Button, Modal, StatusBar, Text } from 'native-base';
import { View, ImageBackground, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DisplayMedicines from '../components/DisplayMedicines';
import PillFormPage from './PillFormPage';

const image = { uri: 'https://i.ibb.co/m449j6R/fondopantallamedicinas-1.png' };

export default function Medicines() {
  const [showFormPage, setShowFormPage] = useState(false);
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ width: '100%', height: '100%' }}
    >
      <SafeAreaView>
        <StatusBar />
        <View>
          <DisplayMedicines />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: '#E5E5E5',
    fontWeight: 'bold',
    fontSize: 40,
  },
  container1: {
    alignItems: 'left',
    top: 30,
    alignItems: 'center',
  },
  container2: {
    left: 10,
  },
  subtitulo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#324848',
  },
  botoncito: {
    borderRadius: 20,
    width: 346,
    height: 68,
    marginBottom: -15,
  },
});
