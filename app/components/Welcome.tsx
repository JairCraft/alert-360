import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

interface WelcomeProps {
    img: string;
    user: {
        name: string;
    };
}

export default function Welcome({ img, user }: WelcomeProps) {
    return (
        <View style={styles.welcomeContainer}>
            <View style={styles.row}>
                <View style={styles.textContainer}>
                    <Text style={styles.headText}>¡Bienvenido {user.name.split(' ')[0]}!</Text>
                </View>
                {img ? (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: img }} style={styles.avatarImage} />
                    </View>
                ) : (
                    <Text>Loading image...</Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    welcomeContainer: {
        borderColor: 'rgb(0, 0, 255)',
        borderRadius: 5,
        borderWidth: 1,
        height: '15%'
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        padding: '1%'
    },
    textContainer: {
        width: '65%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headText: {
        margin: 20,
        fontWeight: 'bold',
        fontSize: 20,
    },
    imageContainer: {
        width: '27%',
        marginRight: '10%'
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    }
});