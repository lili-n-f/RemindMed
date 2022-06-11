import {
  StatusBar,
  HStack,
  Button,
  Text,
  FormControl,
  Select,
} from "native-base";
import { View, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DisplayMedicines from "../components/DisplayMedicines";
import { db } from "../../firebase";
import React, { useState, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Loading from "../components/Loading";
import PillFormPage from "./PillFormPage";
import { logout } from "../../firebase";
import { UserContext } from "../../ContextProvider";

const image = { uri: "https://i.ibb.co/ypq3LQ1/fondo.png" };

export default function Medicines() {
  //Aqui comienza la búsqueda de madicamentos por categoria
  const isFocused = useIsFocused();
  const [itinerario, setItinerario] = useState(null);
  const [itinerarioModify, setItinerarioModify] = useState(null);
  const [data, setData] = useState([]);
  const [dataFiltrada, setdataFiltrada] = useState([]);

  const [category, setCategory] = useState(itinerario?.categoria ?? "");

  const { user } = useContext(UserContext);
  async function getData() {
    const dataList = [];
    //test
    console.log(user.uid);
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "itinerario")
    );
    querySnapshot.forEach((doc) => {
      const object = doc.data();
      object["id"] = doc.id;
      if (object.activo) {
        dataList.push(object);
      }
    });
    setData(dataList);
    setdataFiltrada(dataList);
  }

  //Para que se traiga automaticamente al entrar al componente
  React.useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  //Para eliminar un medicamento
  const handleDelete = async (datos) => {
    const ref = doc(db, "usuarios", datos.id);
    await updateDoc(ref, { activo: false });
    getData();
  };
  const handleShowFormTwo = (itinerarioM) => {
    setItinerarioModify(itinerarioM);
  };
  const handleGoBack = () => {
    setItinerarioModify(false);
    getData();
  };

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView>
        <StatusBar />
        {itinerarioModify ? (
          <PillFormPage
            newPill={false}
            itinerario={itinerarioModify}
            handleGoBack={handleGoBack}
          />
        ) : (
          <View>
            <View style={styles.containerE}>
              <FormControl.Label justifyContent={"center"}>
                <Text color="primary.500" fontWeight="bold">
                  Búsqueda por filtros
                </Text>
              </FormControl.Label>
              <HStack justifyContent="space-between">
                <Select
                  backgroundColor="white"
                  borderRadius="20"
                  minWidth="100%"
                  borderColor="primary.300"
                  placeholderTextColor="gray.500"
                  accessibilityLabel="Escoja la categoría"
                  placeholder="Escoja la categoría"
                  selectedValue={category}
                  onValueChange={(value) => {
                    setCategory(value);
                  }}
                >
                  <Select.Item
                    label="Analgésico (aliviar dolor)"
                    value="Analgésico"
                  />
                  <Select.Item
                    label="Antiácido (disminuir secreciones gástricas)"
                    value="Antiácido"
                  />
                  <Select.Item
                    label="Antialérgico (combatir reacciones alérgicas)"
                    value="Antialérgicos"
                  />
                  <Select.Item
                    label="Antibiótico (hacer frente a infecciones de bacterias)"
                    value="Antibiótico"
                  />
                  <Select.Item
                    label="Antidiarreico (aliviar diarrea)"
                    value="Antidiarreico"
                  />
                  <Select.Item
                    label="Antifúngico (hacer frente a infecciones de hongos)"
                    value="Antifúngico"
                  />
                  <Select.Item
                    label="Antiinflamatorio (reducir inflamación)"
                    value="Antiinflamatorio"
                  />
                  <Select.Item
                    label="Antiparasitario (hacer frente a infecciones de parásitos)"
                    value="Antiparasitario"
                  />
                  <Select.Item
                    label="Antipirético (reducir la fiebre)"
                    value="Antipirético"
                  />
                  <Select.Item
                    label="Antitusivo (reducir tos no productiva)"
                    value="Antitusivo"
                  />
                  <Select.Item
                    label="Antiviral (hacer frente a infecciones de virus)"
                    value="Antiviral"
                  />
                  <Select.Item
                    label="Laxante (resolver estreñimiento)"
                    value="Laxante"
                  />
                  <Select.Item
                    label="Mucolítico (eliminar secreciones bronquiales)"
                    value="Mucolítico"
                  />
                  <Select.Item label="Todos" value="todos" />
                </Select>
              </HStack>
              <Button
                onPress={() => {
                  setdataFiltrada(
                    data.filter(
                      (itinerario) => itinerario.categoria === category
                    )
                  );
                }}
                style={{
                  marginTop: 15,
                  width: "60%",
                  marginLeft: "20%",
                  borderRadius: 20,
                }}
                bg="primary.500"
              >
                <Text fontWeight="bold" color="white">
                  Buscar
                </Text>
              </Button>
            </View>
            <DisplayMedicines
              data={category === "todos" ? data : dataFiltrada}
              handleShowFormTwo={handleShowFormTwo}
              handleDelete={handleDelete}
            />
            <Button onPress={logout}>
              <Text>Logout</Text>
            </Button>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mequieromatar: {
    width: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderLeftColor: '#3e3675',
  },
  containerQ: {
    backgroundColor: "#3e3675",
    width: "100%",
    padding: 10,
    borderRadius: 20,
  },
  error: {
    color: "red",
    fontSize: 11,
  },

  containerA: {
    marginTop: 15,
    backgroundColor: "#3e3675",
    width: "100%",
    padding: 10,
    borderRadius: 20,
  },
  days: {
    textAlign: "center",
    padding: 0,
  },
  containerB: {
    marginTop: 15,
    backgroundColor: "#3e3675",
    width: "100%",
    padding: 10,
    borderRadius: 20,
  },
  containerC: {
    marginTop: 15,
    backgroundColor: "#3e3675",
    width: "100%",
    padding: 10,
    borderRadius: 20,
  },

  containerD: {
    marginTop: 15,
    backgroundColor: "#3e3675",
    width: "100%",

    padding: 10,
    borderRadius: 20,
  },

  containerE: {
    marginTop: 5,
    marginBottom: 1,
    paddingBottom: 15,
    margin: 10,
    backgroundColor: "#EBEBEB",
    padding: 10,
    borderRadius: 20,
  },
  // titulo: {
  //   color: "#E5E5E5",
  //   fontWeight: "bold",
  //   fontSize: 40,
  // },
  // container1: {
  //   color: "#FFFF",
  //   alignItems: "left",
  //   top: 35,
  //   margin: 20,
  // },
  // container2: {
  //   left: 10,
  // },
  // subtitulo: {
  //   fontWeight: 600,
  //   fontSize: 20,
  //   color: "#E5E5E5",
  // },
});
