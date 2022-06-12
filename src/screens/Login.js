import { Box, Text, FormControl, Button } from "native-base";
import React, { useState, useContext } from "react";
import { ImageBackground, StyleSheet, View, TextInput } from "react-native";
import { login } from "../../firebase.js";
import { UserContext } from "../../ContextProvider";
import Loading from "../components/Loading.js";
import Medicines from "./Medicines.js";
import Register from "./Register.js";

const image = { uri: "https://i.ibb.co/wSBCgBb/Android-Large-12.png" };

export default function Login() {
  const [register, setRegister] = useState(false);
  const [focus, setFocus] = useState(false);
  const [focus2, setFocus2] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userNotfound, setUserNotFound] = useState(false);


  const [success, setSuccess] = useState(false);
  const [dataError, setDataError] = useState([]);

  const { user, loading } = useContext(UserContext);



  const handleCloseAlert = () => {
    setSuccess(false);
    setDataError(false);
  };
  
    function validateErrors() {
      let errors = [];
      if (password === "") {
        setPasswordError(true);
        errors.push("- Contraseña");
        console.log('f mi ser contemporaneo')
      }
      if (email === "") {
        setEmailError(true);
        errors.push("- Email");
      }
      return errors;
    }


  const handleSubmit = async (e) => {
    const errors = validateErrors();
      
    if (errors.length === 0) {
    e.preventDefault();
      console.log("Login con email");
      console.log(user);
      try {
        await login(email, password);
        setSuccess(true);

      } catch (e) {
         console.log("Correo o contraseña inválida.");
         errors.push("Correo o contraseña inválida.")
         setDataError(errors);
         setUserNotFound(true);
      }} else {
        setDataError(errors);
        // setSuccessnt(true);
      }
  };

  return register ? (
    <Register/> ) : 
      loading ? (
        <Loading />
      ) : user ? (
        <NavigationBar />

      ) : (


    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ width: "100%", height: "100%", position: "absolute" }}
    >
      <View style={styles.containerTitle}>
        <Box>
          <Text color="platinum.500" fontSize="35" fontWeight="bold">
            Inicia
          </Text>
        </Box>
      </View>
      <View>
        <FormControl
          width={"90%"}
          alignSelf={"center"}
          isRequired
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >

          {userNotfound ? (
              <Text style={styles.error}>El usuario ingresado no fue encontrado</Text>
            ) : null} 
          <View style={styles.containerInput}>

            <TextInput
              style={focus ? styles.inputOnFocus : styles.inputOnBlur}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              selectionColor="#A2D729"
              placeholder="Email"
              placeholderTextColor="#CFCFCF"
              value={email}
              onChangeText={(value) => setEmail(value)}
            ></TextInput>
            {emailError ? (
              <Text style={styles.error}>* Debe introducir un Correo</Text>
            ) : null}
            <TextInput
              style={focus2 ? styles.inputOnFocus : styles.inputOnBlur}
              onFocus={() => setFocus2(true)}
              onBlur={() => setFocus2(false)}
              selectionColor="#A2D729"
              placeholder="Contraseña"
              placeholderTextColor="#CFCFCF"
              textContentType="password"
              secureTextEntry={true}
              value={password}
              onChangeText={(value) => setPassword(value)}
            ></TextInput>
            {passwordError ? (
              <Text style={styles.error}>* Debe introducir una contraseña</Text>
            ) : null}

            <Text
              color="green.500"
              fontWeight="bold"
              onPress={() => setRegister(true)}
              paddingBottom="2"
            >
              ¿Aún no te has registrado? Regístrate aquí
            </Text>


            <View style={styles.buttonA}>
              <Button style={styles.buttonC} onPress={handleSubmit}>
                <Text color="platinum.500" fontWeight="bold" fontSize="15">
                  Iniciar
                </Text>
              </Button>
            </View>
          </View>
        </FormControl>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    marginTop: 40,
    marginLeft: 25,
  },
  containerInput: {
    marginTop: 130,
    marginLeft: 15,
    width: 295,
  },
  buttonC: {
    width: 146,
    height: 41,
    marginTop: 10,
    backgroundColor: "#59C3C3",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonA: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputOnFocus: {
    width: 295,
    height: 40,
    fontSize: 20,
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingBottom: 2,
    marginBottom: 10,
    color: "#CFCFCF",
    borderBottomColor: "#A2D729",
  },
  inputOnBlur: {
    width: 295,
    height: 40,
    fontSize: 20,
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingBottom: 2,
    marginBottom: 10,
    color: "#CFCFCF",
    borderBottomColor: "#CFCFCF",
  },  error: {
    color: "#59C3C3",
    fontSize: 11,
  },
});
