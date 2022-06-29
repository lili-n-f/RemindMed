import {
  StatusBar,
  HStack,
  Button,
  Text,
  FormControl,
  Select,
  Divider,
  Box,
} from 'native-base';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DisplayMedicines from '../components/DisplayMedicines';
import { db } from '../../firebase';
import React, { useState, useContext } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import Loading from '../components/Loading';
import PillFormPage from './PillFormPage';
import { UserContext } from '../../ContextProvider';
import UserAlertDialog from '../components/UserAlertDialog';

const image = { uri: 'https://i.ibb.co/ypq3LQ1/fondo.png' };

export default function Medicines() {
  const [disable, setDisable] = useState(false); //para el botón de buscar
  const [alertDialog, setAlertDialog] = useState(false); //alerta de eliminar
  const [dataToDelete, setDataToDelete] = useState(null); //recordatorio a eliminar

  const isFocused = useIsFocused();
  const [itinerario, setItinerario] = useState(null);
  const [itinerarioModify, setItinerarioModify] = useState(null);
  const [data, setData] = useState([]);
  const [dataFiltrada, setdataFiltrada] = useState([]);

  const [category, setCategory] = useState(itinerario?.categoria ?? '');

  const { user } = useContext(UserContext);
  async function getData() {
    const dataList = [];
    console.log(user.uid);
    const querySnapshot = await getDocs(
      collection(db, 'users', user.uid, 'itinerario')
    );
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

  //Para eliminar un medicamento
  const handleDelete = async (datos) => {
    setAlertDialog(true);
    setDataToDelete(datos);
  };
  const handleShowFormTwo = (itinerarioM) => {
    setItinerarioModify(itinerarioM);
  };
  const handleClose = async (delete_) => {
    //elimina recordatorio en base a lo que el user puso en el alert
    if (delete_ && dataToDelete) {
      const ref = await doc(
        db,
        'users',
        user.uid,
        'itinerario',
        dataToDelete.id
      );
      await updateDoc(ref, { activo: false });
      setDataToDelete(null);
      getData();
    }
    setAlertDialog(false);
  };

  const handleGoBack = () => {
    setItinerarioModify(false);
    getData();
  };

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ width: '100%', height: '100%' }}
    >
      <SafeAreaView>
        <StatusBar />
        {alertDialog ? (
          <UserAlertDialog
            isOpen={alertDialog}
            title={'Eliminar recordatorio'}
            buttonName={'Eliminar'}
            description={
              'Estas seguro de que quieres eliminar este recordatorio?'
            }
            handleClose={handleClose}
          ></UserAlertDialog>
        ) : null}
        {itinerarioModify ? (
          <PillFormPage
            newPill={false}
            itinerario={itinerarioModify}
            handleGoBack={handleGoBack}
          />
        ) : (
          <View>
            <View style={styles.container1}>
              <Box w="60">
                <Divider my="2" bg="green.500" thickness="4" />
              </Box>
              <Text style={styles.titulo}>Mi itinerario</Text>
              <Box w="320">
                <Divider my="2" bg="green.500" thickness="4" />
              </Box>
            </View>
            <DisplayMedicines
              data={category === 'todos' ? data : dataFiltrada}
              handleShowFormTwo={handleShowFormTwo}
              handleDelete={handleDelete}
            />
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: '#E5E5E5',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
    lineHeight: 40,
  },

  container1: {
    color: '#FFFF',
    marginTop: 20,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  mequieromatar: {
    width: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderLeftColor: '#3e3675',
  },
  containerQ: {
    backgroundColor: '#3e3675',
    width: '100%',
    padding: 10,
    borderRadius: 20,
  },
  error: {
    color: 'red',
    fontSize: 11,
  },

  containerA: {
    marginTop: 15,
    backgroundColor: '#3e3675',
    width: '100%',
    padding: 10,
    borderRadius: 20,
  },
  days: {
    textAlign: 'center',
    padding: 0,
  },
  containerB: {
    marginTop: 15,
    backgroundColor: '#3e3675',
    width: '100%',
    padding: 10,
    borderRadius: 20,
  },
  containerC: {
    marginTop: 15,
    backgroundColor: '#3e3675',
    width: '100%',
    padding: 10,
    borderRadius: 20,
  },

  containerD: {
    marginTop: 15,
    backgroundColor: '#3e3675',
    width: '100%',

    padding: 10,
    borderRadius: 20,
  },

  containerE: {
    marginTop: 5,
    marginBottom: 1,
    paddingBottom: 15,
    margin: 10,
    backgroundColor: '#EBEBEB',
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
