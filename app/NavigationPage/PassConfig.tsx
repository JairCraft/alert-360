import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUser, updatePass } from "../service/userService";
import { CommonActions, NavigationProp, useNavigation } from "@react-navigation/native";
import { showToast } from '../components/ToastManager';

type RootStackParamList = {
  PassConfig: undefined;
};

export default function PassConfig() {
    const [pasa, setPasa] = useState('');
    const [pasn, setPasn] = useState('');
    const [pasn2, setPasn2] = useState('');
    const [user, setUser] = useState({
        id: 0,
        password: "",
    });

    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        async function fetchUser() {
            try {
                const userData = await getUser();
                setUser(userData);
                setPassword(userData.password);
                setName(userData.name);
                setPhone(userData.phone);
            } catch (error) {
                console.error("Error al obtener usuario:", error);
            }
        }

        fetchUser();
    }, []);

    const handleUpdate = async () => {
        if (!user.id) {
            alert("No se encontró el ID del usuario.");
            return;
        }
        if (pasa !== user.password) {
            alert("Contraseña Actual Incorrecta.");
            return;
        }
        if (pasn !== pasn2) {
            alert("La Nueva Contraseña no Coincide.");
            return;
        }
        if (pasn !== pasn2) {
            alert("La Nueva Contraseña no Coincide.");
            return;
        }
        const { res} = await updatePass(name,phone,pasn);
        console.log(pasn);
        console.log(res);
        if (res) {
            showToast("success","Exito","Contraseña actualizada correctamente.");
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'NavigationBar' }],
                    
                })
            );
        } else {
            alert("Error al actualizar la Contraseña.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>CAMBIAR CONTRASEÑA</Text>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Contraseña Actual</Text>
                <TextInput
                    style={styles.input}
                    value={pasa}
                    onChangeText={setPasa}
                />
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Contraseña Nueva</Text>
                <TextInput
                    style={styles.input}
                    value={pasn}
                    onChangeText={setPasn}
                />
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Repetir Contraseña Actual</Text>
                <TextInput
                    style={styles.input}
                    value={pasn2}
                    onChangeText={setPasn2}
                />
            </View>
            {/*<View style={styles.infoBox}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    secureTextEntry
                    placeholder="Nueva contraseña"
                    onChangeText={setPassword}
                />
            </View>*/}

            <TouchableOpacity style={styles.button} onPress={()=>{handleUpdate()}}>
                <Text style={styles.buttonText}>Actualizar</Text>
            </TouchableOpacity>
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
