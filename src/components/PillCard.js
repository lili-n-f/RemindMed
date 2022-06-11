import { Box, VStack, HStack, Button, Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import React from 'react';

export default function PillCard({
  name,
  dosis,
  repetitions,
  datos,
  horario,
  handleShowForm,
  handleDelete,
  style,
}) {
  return (
    <SafeAreaView>
      <Box alignItems="center" marginBottom={style ? '8' : '0'}>
        <Box width="90%" bg="primary.500" borderRadius="20" mt="5">
          <VStack space="2">
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
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
              px="4"
              pb="4"
            >
              <Text
                color="white"
                fontWeight={'medium'}
                fontSize="18"
                top={'-15'}
                style={styles.subtitulo_tarjetas}
              >
                {'Hora: ' + horario}
              </Text>
              <HStack space={2}>
                <Button
                  variant="subtle"
                  borderRadius={'10'}
                  onPress={() => handleShowForm(datos)}
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
        </Box>
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
    alignItems: 'left',
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
