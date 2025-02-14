import { Button } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

export default function AlertButton() {
    return (
        <View style={styles.buttonContainer}>
            <Button
                icon={
                    {
                        name: 'exclamation-triangle',
                        type: 'font-awesome-5',
                        size: 15,
                        color: 'white',
                    }
                }
                iconContainerStyle={{ marginRight: 15 }}
                buttonStyle={styles.button}
                containerStyle={{
                    marginHorizontal: 50,
                    marginVertical: 10,
                    width: '60%',
                    height: 'auto'
                }}
            >
                Enviar Alerta
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '15%',
        borderWidth: 3
    },
    button: {
        height: '100%',
        borderRadius: 25,
        backgroundColor: '#00a9b2',
    },
});