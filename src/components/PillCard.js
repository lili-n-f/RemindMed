import { Box, VStack, HStack, Button, Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import React from 'react';
import ModalView from './ModalView';

export default function PillCard({
  name,
  dosis,
  days,
  datos,
  horario,
  handleShowForm,
  handleDelete,
  style,
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
        category={datos.categoria}
      ></ModalView>
      <Box alignItems="center" marginBottom={style ? '8' : '0'}>
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
          <VStack space="2" w="100%">
            <Box px="4" pt="4">
              <Text color="white" pb="2" style={styles.titulo_tarjeta}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Text>
              <Text
                color="white"
                fontWeight={'medium'}
                fontSize="18"
                top={'-2'}
                style={styles.subtitulo_tarjetas}
              >
                {'Tomar: ' + dosis}
              </Text>
            </Box>
            <HStack space={3} flexDirection="column" w="100%" px="4" pb="4">
              <Text
                color="white"
                fontWeight={'medium'}
                fontSize="18"
                top={'-15'}
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
              <HStack space={2} w="100%">
                <Button
                  variant="subtle"
                  borderRadius={'10'}
                  onPress={() => handleShowForm(datos)}
                  marginLeft="auto"
                >
                  Editar
                </Button>
                <Button
                  variant="subtle"
                  colorScheme={'red'}
                  borderRadius={'10'}
                  onPress={() => handleDelete(datos)}
                >
                  Eliminar
                </Button>
              </HStack>
            </HStack>
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
