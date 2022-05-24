import { Button, Modal, StatusBar, Text } from 'native-base';
import { ImageBackground, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PillForm from '../components/PillForm';
const image = { uri: 'https://i.ibb.co/fQVtYhf/fondopantallamedicinas.png' };

export default function Medicines() {
  const [showModal, setShowModal] = useState(false);
  return (
    <SafeAreaView>
      <StatusBar />

      <View>
        <Button onPress={() => setShowModal(true)} size="lg">
          Agrega tu medicamento
        </Button>
      </View>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        avoidKeyboard
      >
        <Modal.Content minW="90%">
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          >
            <Modal.CloseButton />
            <Modal.Header backgroundColor="blue.500">
              <Text color="platinum.500" fontWeight="bold">
                Nuevo medicamento
              </Text>
            </Modal.Header>
            <Modal.Body>
              <PillForm newPill={true} />
            </Modal.Body>
          </ImageBackground>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
}
