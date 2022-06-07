import { HStack, Spinner } from 'native-base';

export default function Loading() {
  return (
    <HStack space={8} justifyContent="center" alignItems="center">
      <Spinner size="lg" color="primary.500" />
    </HStack>
  );
}
