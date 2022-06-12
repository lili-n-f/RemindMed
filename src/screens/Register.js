import { Box, Text, FormControl, Button } from "native-base";
import React, { useState, useContext } from "react";
import { ImageBackground, StyleSheet, View, TextInput } from "react-native";
import Login from "./Login";
import { register } from "../../firebase";
import { UserContext } from "../../ContextProvider";
import NavigationBar from "../components/NavigationBar";
import AlertMessage from "../components/AlertMessage";

const image = { uri: "https://i.ibb.co/pJ1GYQb/Android-Small-1.png" };

export default function Register() {
  const [login, setLogin] = useState(false);
  const [focus, setFocus] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const [focus3, setFocus3] = useState(false);
  const [focus4, setFocus4] = useState(false);

  //const de los values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  //cons de los errors

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [dataError, setDataError] = useState([]);

  //const del userContext
  const { user, loading } = useContext(UserContext);

  //close de los alerts

  const handleCloseAlert = () => {
    setDataError([]);
    setEmailError(false);
    setPasswordError(false);
  };

  function validateErrors() {
    let errors = [];
    if (!username || username === "" || /^\s*$/.test(username)) {
      setUsernameError(true);
      errors.push("- Username");
    }
    if (
      password.length > 0 &&
      password2.length > 0 &&
      (password != password2 || password.length < 8)
    ) {
      setPasswordError(true);
    }
    if (email === "") {
      errors.push("- Email");
    }
    if (password === "") {
      errors.push("- Contraseña");
    }
    if (password2 === "") {
      errors.push("- Confirmar contraseña");
    }
    return errors;
  }

  const handleSubmit = async (e) => {
    const errors = validateErrors();
    const correo = email.replace(" ", "").toLocaleLowerCase();

    if (errors.length === 0) {
      e.preventDefault();
      // console.log("Registro con email");
      try {
        // "falta" sería el nombre del usuario, pero hace falta ese campo en el form del registro, listo jiji
        const success = await register(username, correo, password);
        if (!success) {
          setEmailError(true);
        }
      } catch (e) {
        console.log("");
      }
    } else {
      setDataError(errors);
    }
  };

  return login ? (
    <Login />
  ) : user ? (
    <NavigationBar />
  ) : (
    <>
      {dataError.length > 0 ? (
        <AlertMessage
          mNumber={3}
          header={"Te falta completar los siguientes campos:"}
          message={dataError.join("\n")}
          handleCloseAlert={handleCloseAlert}
        />
      ) : null}
      {passwordError && emailError ? (
        <AlertMessage
          mNumber={3}
          header={"El correo y la contraseña ingresados no son válidos"}
          message={""}
          handleCloseAlert={handleCloseAlert}
        />
      ) : passwordError || emailError ? (
        <AlertMessage
          mNumber={3}
          header={
            passwordError
              ? "La contraseña ingresada no es válida"
              : "El correo ingresado no es válido"
          }
          message={""}
          handleCloseAlert={handleCloseAlert}
        />
      ) : null}

      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.containerTitle}>
          <Box>
            <Text color="platinum.500" fontSize="35" fontWeight="bold">
              Regístrate
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
            <View style={styles.containerInput}>
              <TextInput
                style={focus4 ? styles.inputOnFocus : styles.inputOnBlur}
                onFocus={() => setFocus4(true)}
                onBlur={() => setFocus4(false)}
                selectionColor="#A2D729"
                placeholder="Nombre de usuario"
                placeholderTextColor="#CFCFCF"
                value={username}
                onChangeText={(value) => setUsername(value)}
              ></TextInput>
              {usernameError ? (
                <Text style={styles.error}>
                  * Debe introducir un nombre válido
                </Text>
              ) : null}

              <TextInput
                style={focus ? styles.inputOnFocus : styles.inputOnBlur}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                selectionColor="#A2D729"
                placeholder="Email"
                placeholderTextColor="#CFCFCF"
                value={email}
                keyboardType="email-address"
                onChangeText={(value) => setEmail(value)}
              ></TextInput>
              {emailError ? (
                <Text style={styles.error}>
                  * Debe introducir un correo válido
                </Text>
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

              <TextInput
                style={focus3 ? styles.inputOnFocus : styles.inputOnBlur}
                onFocus={() => setFocus3(true)}
                onBlur={() => setFocus3(false)}
                selectionColor="#A2D729"
                placeholder="Confirmar contraseña"
                placeholderTextColor="#CFCFCF"
                textContentType="password"
                secureTextEntry={true}
                value={password2}
                onChangeText={(value) => setPassword2(value)}
              ></TextInput>
              {passwordError ? (
                <Text style={styles.error}>
                  * Debe introducir una contraseña que coincida y que sea mayor
                  a 8 caracteres
                </Text>
              ) : null}
              <Text
                color="green.500"
                fontWeight="bold"
                onPress={() => setLogin(true)}
              >
                ¿Ya tienes un perfil? Inicia sesión aquí
              </Text>

              <View style={styles.buttonA}>
                <Button style={styles.buttonC} onPress={handleSubmit}>
                  <Text color="platinum.500" fontWeight="bold" fontSize="15">
                    Continuar
                  </Text>
                </Button>
              </View>
            </View>
          </FormControl>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    marginTop: 30,
    paddingTop: 25,
    marginLeft: 20,
  },
  containerInput: {
    marginTop: 130,
    marginLeft: 15,
    width: 295,
  },
  buttonC: {
    width: 146,
    height: 41,
    marginTop: 15,
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
  inputsStyle: {
    width: 295,
    height: 35,
    fontSize: 20,
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingBottom: 2,
    marginBottom: 10,
    color: "#CFCFCF",
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
  },
  error: {
    color: "#59C3C3",
    fontSize: 11,
  },
});
