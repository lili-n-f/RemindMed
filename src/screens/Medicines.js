import {
  StatusBar,
  HStack,
  Button,
  Text,
  FormControl,
  Select,
  Divider,
  Box,
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
import { UserContext } from "../../ContextProvider";
import UserAlertDialog from "../components/UserAlertDialog";

const image = { uri: "https://i.ibb.co/ypq3LQ1/fondo.png" };

export default function Medicines() {
  const [disable, setDisable] = useState(false); //para el botón de buscar
  const [alertDialog, setAlertDialog] = useState(false); //alerta de eliminar
  const [dataToDelete, setDataToDelete] = useState(null); //recordatorio a eliminar

  const isFocused = useIsFocused();
  const [itinerario, setItinerario] = useState(null);
  const [itinerarioModify, setItinerarioModify] = useState(null);
  const [data, setData] = useState([]);
  const [dataFiltrada, setdataFiltrada] = useState([]);

  const [category, setCategory] = useState(itinerario?.categoria ?? "");

  const { user } = useContext(UserContext);
  async function getData() {
    async function modify(docu, id) {
      try {
        const ref = doc(db, "users", user.uid, "itinerario", id);
        await updateDoc(ref, docu);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    const dataList = [];
    console.log(user.uid);
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "itinerario")
    );
    querySnapshot.forEach((doc) => {
      const object = doc.data();
      object["id"] = doc.id;

      if (object.activo) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var changed;

        if (object.tipo_duracion == 2) {
          //es hasta una fecha específica
          if (object.fecha_final.toDate().setHours(0, 0, 0, 0) >= today) {
            //si la fecha final es MAYOR o igual a la fecha actual (es en el futuro u hoy), aún está activo
            dataList.push(object);
          } else {
            //ya no es activo, cambiamos esto...
            changed = {
              activo: false,
              dias: object.dias,
              dosis: object.dosis,
              dosis_tipo: object.dosis_tipo,
              fecha_final: object.fecha_final,
              fecha_registro: object.fecha_registro,
              ultima_act: object.ultima_act ?? null,
              horario: object.horario,
              nombre: object.nombre,
              notas: object.notas,
              repet_restantes: object.repet_restantes,
              tipo_duracion: object.tipo_duracion,
              usuario: object.usuario,
            };
            modify(changed, object.id); //se guardan los cambios
          }
        } else if (object.tipo_duracion == 3) {
          //es hasta un cierto núm de repeticiones
          if (object.repet_restantes != 0) {
            //si todavía no se ha pasado la última repetición...
            var repeats = false; //si esta variable resulta true al final, es que hoy se hace una repetición
            if (object.dias) {
              //se determina qué días específicamente se repiten y si hoy es uno de ellos
              object.dias.map((dia, i) => {
                if (today.getDay() === i && dia.selected) {
                  repeats = true;
                }
              });
            } else {
              //se repite todos los días
              repeats = true;
            }
            if (
              repeats &&
              (!object.ultima_act ||
                object.ultima_act.toDate().getTime() != today.getTime())
            ) {
              //si se repite hoy y no se ha actualizado hoy (es decir, no se ha contabilizado la repetición de hoy), se actualiza
              let repts = object.repet_restantes - 1;

              changed = {
                activo: object.activo,
                dias: object.dias,
                dosis: object.dosis,
                dosis_tipo: object.dosis_tipo,
                fecha_final: object.fecha_final,
                fecha_registro: object.fecha_registro,
                ultima_act: today, //cambia última actualización a hoy
                horario: object.horario,
                nombre: object.nombre,
                notas: object.notas,
                repet_restantes: repts, //cambia repeticiones a repet_restantes-1
                tipo_duracion: object.tipo_duracion,
                usuario: object.usuario,
              };
              modify(changed, object.id); //se guardan los cambios
            }
            dataList.push(object);
          } else {
            if (object.ultima_act.toDate().getTime() == today.getTime()) {
              //si hoy fue la última actualización, entonces hoy es la última repetición
              dataList.push(object);
            } else {
              //ya se hicieron todas sus repeticiones, ya no es activo...
              changed = {
                activo: false,
                dias: object.dias,
                dosis: object.dosis,
                dosis_tipo: object.dosis_tipo,
                fecha_final: object.fecha_final,
                fecha_registro: object.fecha_registro,
                ultima_act: object.ultima_act ?? null,
                horario: object.horario,
                nombre: object.nombre,
                notas: object.notas,
                repet_restantes: object.repet_restantes,
                tipo_duracion: object.tipo_duracion,
                usuario: object.usuario,
              };
              modify(changed, object.id); //se guardan los cambios
            }
          }
        } else {
          //se repite siempre...

          dataList.push(object);
        }
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
        "users",
        user.uid,
        "itinerario",
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
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView>
        <StatusBar />
        {alertDialog ? (
          <UserAlertDialog
            isOpen={alertDialog}
            title={"Eliminar recordatorio"}
            buttonName={"Eliminar"}
            description={
              "Estas seguro de que quieres eliminar este recordatorio?"
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
              data={category === "todos" ? data : dataFiltrada}
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
    color: "#E5E5E5",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40,
    lineHeight: 40,
  },

  container1: {
    color: "#FFFF",
    marginTop: 20,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
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
