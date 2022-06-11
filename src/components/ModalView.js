import { Box, VStack, HStack, Text, Modal, Divider } from 'native-base';
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
        <Box pt="2" pb="5" justifyContent={'center'}>
          <Box w="50">
            <Divider my="2" bg="green.500" thickness="4" alignItems="left" marginLeft={49}/>
          </Box>
          <Text
            color="primary.600"
            textAlign="center"
            style={styles.titulo_tarjeta}
            alignItems="center"
          >
            Información de la medicina
          </Text>
          <Box w="120">
            <Divider my="2" bg="green.500" thickness="4" alignItems="left" marginLeft={49}/>
          </Box>
        </Box>

        <VStack space={2} w="100%" paddingX={'5'}>
          <Text
            color="primary.600"
            fontWeight={'medium'}
            fontSize="18"
            style={styles.subtitulo_tarjetas}
          >
            <Text color="gray.700">Nombre: </Text>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
          <Text
            color="primary.600"
            fontWeight={'medium'}
            fontSize="18"
            style={styles.subtitulo_tarjetas}
          >
            <Text color="gray.700">Dosis: </Text>
            { dosis}
          </Text>
          <Text
            color="primary.600"
            fontWeight={'medium'}
            fontSize="18"
            style={styles.subtitulo_tarjetas}
          >
            <Text color="gray.700">Frecuencia: </Text>
            {
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
            color="primary.600"
            fontWeight={'medium'}
            fontSize="18"
            style={styles.subtitulo_tarjetas}
          >
            <Text color="gray.700">Hora: </Text>
            {horario}
          </Text>
          <Text
            color="primary.600"
            fontWeight={'medium'}
            fontSize="18"
            style={styles.subtitulo_tarjetas}
          >
            <Text color="gray.700">categoría: </Text>
            {category}
          </Text>
          <Text
            color="primary.600"
            fontWeight={'medium'}
            fontSize="18"
            style={styles.subtitulo_tarjetas}
          >
            <Text color="gray.700">Notas: </Text>
            {notes}
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
