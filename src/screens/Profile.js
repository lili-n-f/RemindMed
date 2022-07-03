import React, { useState, useContext, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import {
  Box,
  StatusBar,
  Text,
  Select,
  Divider,
  Input,
  HStack,
  VStack,
  Button,
  TextArea,
} from 'native-base';
import Icon, { Icons } from '../components/Icons';
import { logout } from '../../firebase';
import { UserContext } from '../../ContextProvider';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import Loading from '../components/Loading';
import ProfileEdit from './ProfileEdit';
import UserAlertDialog from '../components/UserAlertDialog';

const image = { uri: 'https://i.ibb.co/ypq3LQ1/fondo.png' };

//Componente correspondiente al perfil del usuario.
export default function Profile() {
  const [disable, setDisable] = useState(false);
  const [alertDialog, setAlertDialog] = useState(false); //mostrar o no alerta

  const isFocused = useIsFocused();
  const { user } = useContext(UserContext);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    // Este useEffect es para traerse la info del user que está loggeado, depende del isFocused
    if (isFocused) {
      getData();
    }
  }, [isFocused, edit]);

  useEffect(() => {
    // Aquí se verifica si se está cargando el perfil y si el usuario NO ES falsy (es decir, no null), en cuyo caso ya se cargó correctamente el usuario y se settea el loading como false para que se renderice la página que es
    // Depende de usuario porque cuando este cambie, se revisará la condición
    if (loading && usuario) {
      console.log('usuario: ' + usuario);
      setLoading(false);
    }
  }, [usuario]);

  //cierra sesion si el usuario lo acciona en el alert
  const handleLogOut = (logout_) => {
    if (logout_) {
      setDisable(true);
      logout();
      setDisable(false);
    }
    setAlertDialog(false);
  };

  const getData = async () => {
    // Se trae la data del usuario
    const usr = await getDoc(doc(db, 'users', user.uid));
    setUsuario(usr.data()); // IMPORTANTE el .data() para que se guarde correctamente
  };

  const handleHideEdit = () => {
    setEdit(false);
  };

  return !edit ? (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ width: '100%', height: '100%' }}
    >
      {alertDialog ? (
        <UserAlertDialog
          isOpen={alertDialog}
          title={'Cerrar sesión'}
          buttonName={'Cerrar sesión'}
          description={'Estas seguro de que quieres cerrar sesión?'}
          handleClose={handleLogOut}
        ></UserAlertDialog>
      ) : null}
      <View style={styles.container1}>
        <Box w="60">
          <Divider my="2" bg="green.500" thickness="4" />
        </Box>
        <Text style={styles.titulo}>
          {usuario?.name ? usuario?.name : 'Perfil'}
        </Text>
        <Box w="300">
          <Divider my="2" bg="green.500" thickness="4" />
        </Box>
      </View>
      <View
        style={{
          paddingBottom: 170,
          paddingTop: 5,
        }}
      >
        <ScrollView>
          <View marginRight={20} marginLeft={20}>
            <View style={styles.containerK}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text color="platinum.500" fontWeight="bold" margin={1}>
                  Sexo:
                </Text>
                <Text color="platinum.500" margin={1}>
                  {usuario?.sexo ? usuario?.sexo : 'N/A'}
                </Text>
              </HStack>
            </View>

            <View style={styles.containerQ}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text color="platinum.500" fontWeight="bold" margin={1}>
                  Grupo sanguíneo:
                </Text>
                <Text color="platinum.500" margin={1}>
                  {usuario?.sangre ? usuario?.sangre : 'N/A'}
                </Text>
              </HStack>
            </View>

            <View style={styles.containerQ}>
              <Text color="platinum.500" fontWeight="bold" margin={1}>
                Notas:
              </Text>
              <Box alignItems="center" w="100%">
                <TextArea
                  h={40}
                  placeholder={
                    usuario?.notas ? usuario?.notas : 'No se han agregado notas'
                  } //NOTAS TO-DO
                  placeholderTextColor="gray.500"
                  fontSize={13}
                  w="100%"
                  maxW="400"
                  backgroundColor="white"
                  borderRadius="20"
                  borderColor="primary.300"
                  editable={false}
                />
              </Box>
            </View>
            <View style={styles.containerQ}>
              <Text
                color="platinum.500"
                fontWeight="bold"
                margin={1}
                textAlign="center"
              >
                Editar perfil
              </Text>
              <Button borderRadius={'10'} onPress={() => setEdit(true)}>
                <Icon
                  type={Icons.MaterialCommunityIcons}
                  name={'account-edit'}
                  color={'white'}
                />
              </Button>
            </View>

            <Button
              borderRadius={20}
              bg={'cyan.500'}
              marginTop={'5'}
              marginBottom={5}
              alignSelf={'center'}
              width="50%"
              onPress={() => {
                setAlertDialog(true);
              }}
              isDisabled={disable}
            >
              <HStack justifyContent={'space-evenly'}>
                <Text color={'white'} alignSelf={'flex-start'}>
                  Cerrar sesión
                </Text>
                <View style={{ minWidth: '10%' }}></View>
                <Icon
                  type={Icons.MaterialCommunityIcons}
                  name={'logout'}
                  color={'white'}
                />
              </HStack>
            </Button>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  ) : usuario ? (
    <ProfileEdit
      nombre={usuario?.name ?? ''}
      sangre={usuario?.sangre ?? ''}
      sexo={usuario?.sexo ?? ''}
      notas={usuario?.notas ?? ''}
      uid={usuario?.uid}
      email={usuario?.email ?? ''}
      perfiles_asoc={usuario?.perfiles_asoc ?? []}
      handleGoBack={handleHideEdit}
    />
  ) : null;
}

const styles = StyleSheet.create({
  titulo: {
    color: '#E5E5E5',
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 40,
  },

  container1: {
    color: '#FFFF',
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },

  subtitulo: {
    fontWeight: '600',
    fontSize: 20,
    color: '#E5E5E5',
  },
  containerQ: {
    backgroundColor: '#3e3675',
    width: '100%',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  containerK: {
    backgroundColor: '#3e3675',
    width: '100%',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
});
