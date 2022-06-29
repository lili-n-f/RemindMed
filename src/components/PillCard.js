import { Box, VStack, HStack, Button, Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import React from 'react';
import ModalView from './ModalView';
import Icon, { Icons } from './Icons';

export default function PillCard({
  name,
  dosis,
  days,
  datos,
  horario,
  handleShowForm,
  handleDelete,
  style,
  isToday = false,
}) {
  const [showModal, setShowModal] = React.useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <SafeAreaView>
      <ModalView
        name={name}
        dosis={dosis}
        days={days}
        horario={horario}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        notes={datos.notas}
      ></ModalView>
      <Box alignItems="center" marginBottom={style ? '7' : '0'}>
        <Button
          variant="unstyled"
          width="90%"
          bg="primary.500"
          borderRadius="20"
          mt="5"
          justifyContent="flex-start"
          padding="0"
          onPress={() => setShowModal(true)}
        >
          <VStack space="0.5" w="100%">
            <Box px="4" pt="4">
              <HStack
                space={4}
                w="100%"
                pb="1"
                //backgroundColor={'red.500'}
                //alignItems={'flex-end'}
              >
                <Text
                  color="white"
                  style={styles.titulo_tarjeta}
                  alignSelf={'center'}
                  pt="1"
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Text>
                <Button
                  variant="unstyled"
                  padding={0}
                  onPress={() => handleShowForm(datos)}
                  marginLeft="auto"
                >
                  <Icon
                    type={Icons.Feather}
                    name={'edit'}
                    color={'#B1DD4B'}
                    // style={{ backgroundColor: 'blue' }}
                    size={29}
                  />
                </Button>
                <Button
                  variant="unstyled"
                  padding={0}
                  onPress={() => handleDelete(datos)}
                >
                  <Icon
                    type={Icons.MaterialIcons}
                    name={'delete-outline'}
                    color="red"
                    // style={{ backgroundColor: 'blue' }}
                    size={36}
                  />
                </Button>
              </HStack>
              <Text
                color="white"
                fontWeight={'medium'}
                fontSize="18"
                style={styles.subtitulo_tarjetas}
              >
                {'Tomar: ' + dosis}
              </Text>
            </Box>
            <HStack
              space={3}
              flexDirection="column"
              w="100%"
              px="4"
              pb={!isToday ? '5' : '0'}
              paddingY={'0'}
            >
              <Text
                color="white"
                fontWeight={'medium'}
                fontSize="18"
                style={styles.subtitulo_tarjetas}
              >
                {(days
                  ? 'Cada semana (' +
                    days
                      .map((day, i) =>
                        day.selected
                          ? i === 0
                            ? 'D'
                            : i === 1
                            ? 'L'
                            : i === 2
                            ? 'M'
                            : i === 3
                            ? 'Mi'
                            : i === 4
                            ? 'J'
                            : i === 5
                            ? 'V'
                            : i === 6
                            ? 'S'
                            : null
                          : null
                      )
                      .filter((a) => a)
                      .join(' / ') +
                    ')'
                  : 'Todos los días') +
                  ' - ' +
                  horario}
              </Text>
            </HStack>
            {isToday ? (
              <HStack
                bg="primary.100"
                marginTop={'2'}
                borderRadius="20"
                borderTopLeftRadius={'none'}
                borderTopRightRadius={'none'}
                w="100%"
              >
                <Button
                  variant="unstyled"
                  borderTopLeftRadius={'none'}
                  borderTopRightRadius={'none'}
                  borderBottomRightRadius={'none'}
                  borderRightWidth="0.5"
                  borderRightColor={'platinum.500'}
                  width="1/2"
                  bg="primary.400"
                  borderRadius="20"
                  justifyContent="center"
                  paddingY="5"
                >
                  <HStack space={2} w="100%">
                    <Icon
                      type={Icons.AntDesign}
                      name={'close'}
                      color={'#F6F6F6'}
                      // style={{ backgroundColor: 'blue' }}
                      size={29}
                    />
                    <Text
                      color="white"
                      fontWeight={'medium'}
                      fontSize="18"
                      textAlign={'center'}
                      style={styles.subtitulo_tarjetas}
                    >
                      Omitir
                    </Text>
                  </HStack>
                </Button>
                <Button
                  // borderRightWidth="0.5"
                  // borderRightColor={'platinum.500'}
                  variant="unstyled"
                  width="1/2"
                  bg="primary.400"
                  // borderRadius="none"
                  justifyContent="center"
                  paddingY="5"
                  borderTopLeftRadius={'none'}
                  borderTopRightRadius={'none'}
                  borderBottomLeftRadius={'none'}
                  borderRadius="20"
                >
                  <HStack space={2} w="100%">
                    <Icon
                      type={Icons.AntDesign}
                      name={'check'}
                      color={'#F6F6F6'}
                      // style={{ backgroundColor: 'blue' }}
                      size={29}
                    />
                    <Text
                      color="white"
                      fontWeight={'medium'}
                      fontSize="18"
                      textAlign={'center'}
                      style={styles.subtitulo_tarjetas}
                    >
                      Tomado
                    </Text>
                  </HStack>
                </Button>
                {/* <Button
                variant="unstyled"
                borderTopLeftRadius={'none'}
                borderTopRightRadius={'none'}
                borderBottomLeftRadius={'none'}
                width="1/3"
                bg="primary.400"
                borderRadius="20"
                justifyContent="center"
                paddingY="5"
              >
                <Text
                  textAlign={'center'}
                  color="white"
                  fontWeight={'medium'}
                  fontSize="18"
                  style={styles.subtitulo_tarjetas}
                >
                  En otro momento
                </Text>
              </Button> */}
              </HStack>
            ) : null}
          </VStack>
        </Button>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: '#E5E5E5',
    fontWeight: 'bold',
    fontSize: 40,
  },
  container1: {
    color: '#FFFF',
    alignItems: 'flex-start',
    top: 35,
    margin: 20,
  },
  container2: {
    left: 10,
  },
  titulo_tarjeta: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#F6F6F6',
  },
  subtitulo_tarjetas: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#E3E3E3',
  },
});
