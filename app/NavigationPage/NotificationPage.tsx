import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAlert } from "../service/userService";
import { CommonActions, NavigationProp, useNavigation } from "@react-navigation/native";

type RootStackParamList = {
    ProfilePage: undefined;
};



export default function NotificationPage() {
    const [alert, setAlert] = useState<Array<{ creation_date: string, description: string, id: string, state: string, user_id: string }>>([]);

    useEffect(() => {
        const fetchAlert = async () => {
            try {
                const alertData = await getAlert();
                setAlert(alertData);
            } catch (error) {
                console.error("Error al obtener alerta:", error);
            }
        }
        fetchAlert();

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>ALERTAS DEL USUARIO</Text>

            {alert.map((alert) => {
                return (
                    <View key={alert.id} style={styles.infoBox}>

                        <Text style={styles.label}>Descripción</Text>
                        <Text style={styles.value}>{alert.description}</Text>

                        <Text style={styles.label}>Fecha de creación</Text>
                        <Text style={styles.value}>{alert.creation_date}</Text>

                        <Text style={styles.label}>Estado</Text>
                        <Text style={styles.value}>{alert.state}</Text>
                    </View>
                )
            })}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: '#ffffff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00a9b2',
        textAlign: 'center',
        marginBottom: 20,
    },
    infoBox: {
        borderWidth: 2,
        borderColor: '#00a9b2',
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
        padding: 15,
        marginBottom: 15,
        position: 'relative',
    },
    label: {
        position: 'absolute',
        top: -10,
        left: 15,
        backgroundColor: '#ffffff',
        paddingHorizontal: 5,
        color: '#00a9b2',
        fontSize: 14,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 18,
        color: '#333',
        marginTop: 5,
    },
    input: {
        fontSize: 18,
        color: '#333',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: '#00a9b2',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
