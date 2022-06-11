import { Box, VStack, HStack, Text, Modal } from 'native-base';
import { StyleSheet } from 'react-native';
import React from 'react';

export default function ModalView({
  name,
  dosis,
  days,
  horario,
  showModal,
  handleCloseModal,
  notes,
  category,
}) {
  return (
    <Modal isOpen={showModal} onClose={() => handleCloseModal()}>
      <Modal.Content
        width="90%"
        paddingY={'10'}
        style={{ marginTop: 'auto', marginBottom: 'auto' }}
        bg="platinum.500"
        alignSelf="center"
        borderRadius="20"
        justifyContent={'flex-start'}
      >
        <Modal.CloseButton />
        <Box pt="2" pb="5" justifyContent={'center'} alignItems="center">
          <Text
            color="gray.700"
            textAlign="center"
            style={styles.titulo_tarjeta}
          >
            Información de la medicina
          </Text>
        </Box>

        <VStack space={2} w="100%" paddingX={'5'}>
          <Text
            color="gray.700"
            fontWeight={'medium'}
            fontSize="18"
            style={styles.subtitulo_tarjetas}
          >
            {'Nombre: ' + name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
          <Text
            color="gray.700"
            fontWeight={'medium'}
            fontSize="18"
            style={styles.subtitulo_tarjetas}
          >
            {'Dosis: ' + dosis}
          </Text>
          <Text
            color="gray.700"
            fontWeight={'medium'}
            fontSize="18"
            style={styles.subtitulo_tarjetas}
          >
            {'Frecuencia: ' +
              (days
                ? 'Cada semana (' +
                  days
                    ?.map((day, i) =>
                      day.selected
                        ? i === 0
                          ? 'Domingo'
                          : i === 1
                          ? 'Lunes'
                          : i === 2
                          ? 'Martes'
                          : i === 3
                          ? 'Miércoles'
                          : i === 4
                          ? 'Jueves'
                          : i === 5
                          ? 'Viernes'
                          : i === 6
                          ? 'Sábado'
                          : null
                        : null
                    )
                    .filter((a) => a)
                    .join(', ') +
                  ')'
                : 'Todos los días')}
          </Text>
          <Text
            color="gray.700"
            fontWeight={'medium'}
            fontSize="18"
            style={styles.subtitulo_tarjetas}
          >
            {'Hora: ' + horario}
          </Text>
          <Text
            color="gray.700"
            fontWeight={'medium'}
            fontSize="18"
            style={styles.subtitulo_tarjetas}
          >
            {'Categoría: ' + category}
          </Text>
          <Text
            color="gray.700"
            fontWeight={'medium'}
            fontSize="18"
            style={styles.subtitulo_tarjetas}
          >
            {'Notas: ' + notes}
          </Text>
        </VStack>
      </Modal.Content>
    </Modal>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  container1: {
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
  },
  subtitulo_tarjetas: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});
