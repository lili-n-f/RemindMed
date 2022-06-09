import { Box, StatusBar, Input, Text, FormControl, Button } from "native-base";
import react from "react";
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, TextInput } from 'react-native';
import Login from "./Login";

const image = { uri: 'https://i.ibb.co/pJ1GYQb/Android-Small-1.png' };


export default function Register() {
    const [focus, setFocus] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const [focus3, setFocus3] = useState(false);        
    const [login, setLogin] = useState(false);
  return login ? (<Login />) 
  
  : (

    <ImageBackground
        source={image}
        resizeMode = "cover"
        style={{ width: '100%', height: '100%' }}>
     <View style = {styles.containerTitle}>
        <Box>
            <Text color="platinum.500" fontSize="35" fontWeight="bold" >Regístrate</Text>
        </Box>
    </View>
    <View>
        <FormControl
            width={'90%'}
            alignSelf={'center'}
            isRequired
            style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'flex-start'
            }}
        >
            <View style={styles.containerInput}>


            <TextInput
                style={focus ? styles.inputOnFocus : styles.inputOnBlur}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                selectionColor="#A2D729"
                placeholder="Email"
                placeholderTextColor = "#CFCFCF"     
                textContentType="password"          
                ></TextInput>


                
                <TextInput
                style={focus2 ? styles.inputOnFocus : styles.inputOnBlur}
                onFocus={() => setFocus2(true)}
                onBlur={() => setFocus2(false)}
                selectionColor="#A2D729"
                placeholder="Contraseña"
                placeholderTextColor = "#CFCFCF"     
                textContentType="password"   
                secureTextEntry={true}   
                ></TextInput>



                <TextInput
                style={focus3 ? styles.inputOnFocus : styles.inputOnBlur}
                onFocus={() => setFocus3(true)}
                onBlur={() => setFocus3(false)}
                selectionColor="#A2D729"
                placeholder="Confirmar contraseña"
                placeholderTextColor = "#CFCFCF"     
                textContentType="password"       
                secureTextEntry={true}   
                ></TextInput>



                <Text color="green.500" fontWeight="bold" onPress={() => setLogin(true)}>¿Ya tienes un perfil? Inicia sesión aquí</Text>
                <View style={styles.buttonA}>
                <Button style={styles.buttonC}>
                    <Text color="platinum.500" fontWeight="bold" fontSize="15">Continuar</Text>
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
        marginTop: 30,
        marginLeft: 20
    },
    containerInput: {
        marginTop: 130,
        marginLeft: 15,
        width: 295

    },
    buttonC: {
        width:146,
        height:41,
        marginTop:15,
        backgroundColor: "#59C3C3",
        borderRadius:20,
        justifyContent: 'center',
        alignItems: 'center' 

    },
    buttonA: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'     
    },
    inputsStyle: {
        width: 295,
        height: 35,
        fontSize: 20,
        borderBottomWidth: 2,
        paddingLeft: 10,
        paddingBottom: 2,
        marginBottom: 10,
        color: '#CFCFCF'

    },
    inputOnFocus: {         
        width: 295,
        height: 40,
        fontSize: 20,
        borderBottomWidth: 2,
        paddingLeft: 10,
        paddingBottom: 2,
        marginBottom: 10,
        color: '#CFCFCF',
        borderBottomColor: '#A2D729'
    
    },
    inputOnBlur: {  
        width: 295,
        height: 40,
        fontSize: 20,
        borderBottomWidth: 2,
        paddingLeft: 10,
        paddingBottom: 2,
        marginBottom: 10,
        color: '#CFCFCF',
        borderBottomColor: '#CFCFCF'

     }
  });