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
import React, { useState } from "react";

export default function PillCard() {
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
    </SafeAreaView>
  );
}
