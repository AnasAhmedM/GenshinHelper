import { StyleSheet, Text, View } from 'react-native';

export default function SingleCharacterComponent({ navigation, route }) {
    return (
        <View style={styles.container}>
            <Text>{route.params?.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
      },
});
