import { Box } from 'native-base';
import {
    ImageBackground,StyleSheet, View, Text
  } from 'react-native';
import react from 'react';

const image = { uri: "https://i.ibb.co/rG9kk50/fondo-welcome.png" }

export default function Welcome() {
  return (
    <ImageBackground source={image} 
    resizeMode="cover" 
    style={{width: '100%', height: '100%'}}
    > 
      <View>
        <Text  style={styles.titulo}> ¡Programa tu {'\n'} itinerario medicinal!
        </Text>
      </View>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
  titulo: {
    position: 'absolute',
    top: 220,
    left: 10,
    color: '#E5E5E5',
    fontWeight: 'bold',
    fontSize: 40
  }
});

