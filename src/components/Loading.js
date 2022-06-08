import { Spinner, View } from 'native-base';

export default function Loading({ children, loading }) {
  return (
    <View h="full" w="full">
      {loading ? (
        <Spinner
          size="lg"
          color="primary.300"
          width="full"
          height="full"
          style={{
            position: 'absolute',
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            alignSelf: 'center',
          }}
        />
      ) : null}
      <>{children}</>
    </View>
  );
}
