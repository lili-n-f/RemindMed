import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
  Modal,
  FormControl,
  Input,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import React, { useState } from "react";
import PillForm from "./PillForm";

export default function PillCard({ name, dosis, repetitions, datos }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <SafeAreaView>
      <Box alignItems="center">
        <Box width="80%" bg="primary.500" borderRadius="20" my="5">
          <VStack space="2">
            <Box px="4" pt="4">
              <Text color="white" pb="2">
                Nombre de la medicina
              </Text>
              <Text color="white">Dosis</Text>
            </Box>
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
              px="4"
              pb="4"
            >
              <Text color="white">Días</Text>
              <HStack space={2}>
                <Button variant="subtle" onPress={() => setShowModal(true)}>
                  Editar
                </Button>
                <Button>Eliminar</Button>
              </HStack>
            </HStack>
          </VStack>
        </Box>
      </Box>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        avoidKeyboard
      >
        <Modal.Content minW="90%" backgroundColor="primary.200">
          <Modal.CloseButton />
          <Modal.Header backgroundColor="primary.200">
            Modificar medicamento
          </Modal.Header>
          <Modal.Body>
            <PillForm newPill={false} itinerario={datos} />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
}
