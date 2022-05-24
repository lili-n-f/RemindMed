import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import { Divider, Box, Button } from 'native-base';
import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';

const image = { uri: 'https://i.ibb.co/X5v02CZ/fondopantallainicio.png' };

export default function Welcome() {
  const [begin, setBegin] = useState(false);

  return begin ? (
    <NavigationBar />
  ) : (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container1}>
        <Box w="60">
          <Divider my="2" bg="green.500" thickness="4" />
        </Box>
        <Text style={styles.titulo}>
          ¡Programa tu{'\n'}itinerario{'\n'}medicinal!
        </Text>

        <View style={styles.container1_1}>
          <Text style={styles.subtitulo}>
            Planea tu tratamiento,{'\n'}
            anota tus síntomas diarios,{'\n'}
            guarda tu historial{'\n'}
            ¡Todo en una app!
          </Text>
        </View>
        <View style={{ alignItems: 'center', top: 60 }}>
          <Button style={styles.startButton} bg="green.500" onPress={() => setBegin(true)}>
            <Text style={styles.startButtonTitle}>Comenzar</Text>
          </Button>
        </View>
      </View>
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
    color: '#FFFF',
    top: 230,
    left: 40,
  },
  container1_1: {
    top: 30,
  },
  subtitulo: {
    fontWeight: '600',
    fontSize: 20,
    color: '#E5E5E5',
  },
  startButton: {
    borderRadius: 20,
  },
  startButtonTitle: {
    color: '#52489C',
    fontWeight: '600',
    fontSize: 20,
  }

});
