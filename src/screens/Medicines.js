import { Button, Modal, StatusBar, Text } from 'native-base';
import { View, ImageBackground, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PillForm from '../components/PillForm';
import DisplayMedicines from '../components/DisplayMedicines';


const image = { uri: "https://i.ibb.co/m449j6R/fondopantallamedicinas-1.png" };

export default function Medicines() {
  const [showModal, setShowModal] = useState(false);
  return (
    <ImageBackground 
    source={image} 
    resizeMode="cover" 
    style={{width: '100%', height: '100%'}}
    > 
      <SafeAreaView>
        <StatusBar />
        <View style={styles.container1}>
          <Button onPress={() => setShowModal(true)} size="lg" style={styles.botoncito} bg={'cyan.500'} shadow = {'4'}>
            <Text style={styles.subtitulo}>AGREGA TU MEDICAMENTO</Text>
          </Button>
        </View>
        <View>
          <DisplayMedicines />
        </View>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          avoidKeyboard
        >
          <Modal.Content minW="90%" backgroundColor="primary.200">
            <Modal.CloseButton />
            <Modal.Header backgroundColor="primary.200">
              Nuevo medicamento
            </Modal.Header>
            <Modal.Body>
              <PillForm newPill={true} />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </SafeAreaView>
    </ImageBackground> 
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: "#E5E5E5",
    fontWeight: "bold",
    fontSize: 40,
  },
  container1: {
    alignItems: "left",
    top: 30,
    alignItems: 'center'
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
    marginBottom: -15
  },
});