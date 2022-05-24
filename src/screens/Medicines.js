import {
  Box,
  Card,
  VStack,
  HStack,
  Button,
  Text,
  Modal,
  FormControl,
  Input,
} from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Medicine() {
  const [showModal, setShowModal] = useState(false);

  return (
    <SafeAreaView>
      <Box alignItems="center">
        <Box width="80%" bg="primary.500" borderRadius="20">
          <VStack space="2">
            <Box px="4" pt="4">
              <Text color="white" pb="2">
                Nombre de la medicina
              </Text>
              <Text color="white">Dosis</Text>
            </Box>
            <HStack space={3} justifyContent="space-between" px="4" pb="4">
              <Text color="white">Días</Text>
              <Button onPress={() => setShowModal(true)}>Editar</Button>
            </HStack>
          </VStack>
        </Box>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          avoidKeyboard
        >
          <Modal.Content maxW="80%" backgroundColor="primary.200">
            <Modal.CloseButton />
            <Modal.Header backgroundColor="primary.200">Edición</Modal.Header>
            <Modal.Body>
              <FormControl isRequired>
                <FormControl.Label>
                  <Text color="black">Nombre</Text>
                </FormControl.Label>
                <Input
                  variant="outline"
                  borderColor="primary.300"
                  placeholder="nombre viejo"
                  placeholderTextColor="gray.500"
                />
              </FormControl>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Box>
    </SafeAreaView>
  );
}
