import { Button, Center } from 'native-base';
import { AlertDialog } from 'native-base';
import React from 'react';

export default function UserAlertDialog({
  isOpen, //para que aparezca la alerta (true/false)
  handleClose, //se le manda true cuando se acepta lo que se quiere hacer y false cuando se cancela la accion
  title, //titulo de alerta
  description, //descripcion
  buttonName, //nombre del boton de la accion a realizar
}) {
  //Pregunta al usuario si esta seguro de hacer algo

  const cancelRef = React.useRef(null);

  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={() => handleClose(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{title}</AlertDialog.Header>
          <AlertDialog.Body>{description}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => handleClose(false)}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={() => handleClose(true)}>
                {buttonName}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}
