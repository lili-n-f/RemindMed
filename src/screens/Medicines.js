import { StatusBar } from 'native-base';
import { View, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DisplayMedicines from '../components/DisplayMedicines';

const image = { uri: 'https://i.ibb.co/m449j6R/fondopantallamedicinas-1.png' };

export default function Medicines() {
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
