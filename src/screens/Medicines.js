import { StatusBar, 
  HStack,
  Button,
  Text,
  FormControl,
  Input,
  Select,
  Radio,
  Box,
  ScrollView,
} from 'native-base';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DisplayMedicines from '../components/DisplayMedicines';
import { db } from '../../firebase';
import React, { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import Loading from '../components/Loading';

const image = { uri: 'https://i.ibb.co/ypq3LQ1/fondo.png' };

export default function Medicines() {
  const isFocused = useIsFocused();
  const [itinerario, setItinerario] = useState(null);
  const [data, setData] = useState([]);
  const [dataFiltrada, setdataFiltrada] = useState([]);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState(itinerario?.categoria ?? "");
  
  async function getData() {
    const dataList = [];
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    querySnapshot.forEach((doc) => {
      const object = doc.data();
      object['id'] = doc.id;
      if (object.activo) {
        dataList.push(object);
      }
    });
    setData(dataList);
    setdataFiltrada(dataList);
  }

  React.useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);
  
  
  const handleDelete = async (datos) => {
    const ref = doc(db, 'usuarios', datos.id);
    await updateDoc(ref, { activo: false });
    getData();
  };

  
  React.useEffect(() => {
    setLoading(false);
  }, [data]);


  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ width: '100%', height: '100%' }}
    >
      <SafeAreaView>
        <StatusBar />
        <View>
        <View style={styles.containerE}>
            <FormControl.Label justifyContent={'center'}>
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
                <Select.Item
                  label="Todos"
                  value="todos"
                />
              </Select>
            </HStack>
              <Button
                onPress={() => {    
                  setdataFiltrada(data.filter((itinerario) => itinerario.categoria === category))
                }}
                style={{
                  marginTop: 15,
                  width: "60%",
                  marginLeft: '20%',
                  borderRadius: 20,
                }}
                bg="primary.500"
              >
                <Text fontWeight="bold" color="white">
                  Buscar
                </Text>
            </Button>
          </View>
          <Loading loading={loading}>
            <DisplayMedicines data={category==="todos"? data: dataFiltrada} handleDelete={handleDelete}/>
          </Loading>
        </View>
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
    marginBottom:1,
    paddingBottom: 15,
    margin:10,
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