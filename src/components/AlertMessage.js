import {
  Center,
  Stack,
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Text,
  Box,
} from 'native-base';
import React from 'react';

export default function AlertMessage({
  mNumber,
  header,
  message = null,
  handleCloseAlert,
}) {
  const statusArray = ['success', 'error', 'info', 'warning'];

  return (
    <Center>
      <Stack
        space={3}
        w="90%"
        maxW="400"
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          left: 16,
          zIndex: 100,
        }}
      >
        <Alert w="100%" status={statusArray[mNumber]}>
          <VStack space={1} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: 'coolGray.800',
                  }}
                >
                  {header}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" color="coolGray.600" />}
                onPress={() => handleCloseAlert()}
              />
            </HStack>
            <Box
              pl="6"
              _dark={{
                _text: {
                  color: 'coolGray.600',
                },
              }}
            >
              {message}
            </Box>
          </VStack>
        </Alert>
      </Stack>
    </Center>
  );
}
