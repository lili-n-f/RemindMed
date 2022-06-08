import { Box, StatusBar, Input, Text, FormControl, Button } from "native-base";
import react from "react";
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View} from 'react-native';

const image = { uri: 'https://i.ibb.co/pJ1GYQb/Android-Small-1.png' };


export default function Register() {
    const [borderBottomColor, setBorderBottomColor] = useState();
  return (

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
                <Input

                placeholder="Email"
                placeholderTextColor="platinum.600"
                borderBottomWidth="2"
                borderColor="blue.500"
                borderBottomColor="platinum.500"
                fontSize="20"
                marginBottom="5"
                borderRadius="0"
                selectionColor="green.500"                          
                // onFocus={() => setBorderBottomColor('#A2D729')}
                // onBlur={() => setBorderBottomColor('#CFCFCF')}
                // style = {{
                //     borderBottomColor,
                //   }}    
                color= "platinum.500"
                ></Input>
                <Input
                secureTextEntry = {true}
                placeholder="Contraseña"
                placeholderTextColor="platinum.600"
                borderBottomWidth="2"
                borderColor="blue.500"
                borderBottomColor="platinum.500"
                fontSize="20"
                marginBottom="5"
                borderRadius="0"
                selectionColor="green.500" 
                color= "platinum.500"
                ></Input>
                <Input
                secureTextEntry = {true}
                placeholder="Confirmar contraseña"
                placeholderTextColor="platinum.600"
                borderBottomWidth="2"
                borderColor="blue.500"
                borderBottomColor="platinum.500"
                fontSize="20"
                marginBottom="5"
                borderRadius="0"
                selectionColor="green.500" 
                color= "platinum.500"
                ></Input>
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
        marginTop:10,
        backgroundColor: "#59C3C3",
        borderRadius:20,
        justifyContent: 'center',
        alignItems: 'center' 

    },
    buttonA: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'     
    }

    // inputOnFocus: { borderBottomColor: '#A2D729' },
    // inputOnBlur: {  borderBottomColor: '#CFCFCF' }
  });