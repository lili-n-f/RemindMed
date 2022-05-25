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
import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";

export default function PillCard({ name, dosis, repetitions, datos }) {
  const [showModal, setShowModal] = useState(false);

  async function deleted() {
    const ref = doc(db, "usuarios", datos.id);
    await updateDoc(ref, { activo: false });
  }

  return (
    <SafeAreaView>
      <Box alignItems="center">
        <Box width="80%" bg="primary.500" borderRadius="20" my="5">
          <VStack space="2">
            <Box px="4" pt="4">
              <Text color="white" pb="2" style={styles.titulo_tarjeta}>
                {name}
              </Text>
              <Text
                color="white"
                fontWeight={"medium"}
                fontSize="18"
                top={"-2"}
                style={styles.subtitulo_tarjetas}
              >
                {dosis}
              </Text>
            </Box>
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
              px="4"
              pb="4"
            >
              <Text
                color="white"
                fontWeight={"medium"}
                fontSize="18"
                top={"-15"}
                style={styles.subtitulo_tarjetas}
              >
                {repetitions}
              </Text>
              <HStack space={2}>
                <Button
                  variant="subtle"
                  borderRadius={"10"}
                  onPress={() => setShowModal(true)}
                >
                  Editar
                </Button>
                <Button
                  variant="subtle"
                  colorScheme={"red"}
                  borderRadius={"10"}
                  onPress={() => deleted()}
                >
                  Eliminar
                </Button>
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

const styles = StyleSheet.create({
  titulo: {
    color: "#E5E5E5",
    fontWeight: "bold",
    fontSize: 40,
  },
  container1: {
    color: "#FFFF",
    alignItems: "left",
    top: 35,
    margin: 20,
  },
  container2: {
    left: 10,
  },
  titulo_tarjeta: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#F6F6F6",
  },
  subtitulo_tarjetas: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#E3E3E3",
  },
});
