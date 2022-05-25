import { Button, Modal, StatusBar } from "native-base";
import { View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../nativeBaseConfig";
const image = { uri: "https://i.ibb.co/fQVtYhf/fondopantallamedicinas.png" };
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon, { Icons } from "../components/Icons";
import PillCard from "../components/PillCard";
import PillForm from "../components/PillForm";

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
      <PillCard></PillCard>
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
  );
}
