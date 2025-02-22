import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface WelcomeProps {
    img: string;
    user: {
        name: string;
    };
}

export default function Welcome({ img, user }: WelcomeProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (!img) return; // Evita intentar cargar si no hay imagen
        Image.prefetch(img)
            .then(() => setImageLoaded(true))
            .catch(() => setImageLoaded(false));
    }, [img]);

    return (
        <View style={styles.welcomeContainer}>
            <View style={styles.row}>              
                <View style={styles.textContainer}>
                    <Text style={styles.headText}>¡Bienvenido {user.name.split(' ')[0]}!</Text>
                </View>
                <View style={styles.imageContainer}>
                    {!imageLoaded ? (
                        <SkeletonPlaceholder>
                            <View style={styles.skeleton} />
                        </SkeletonPlaceholder>
                    ) : (
                        <Image 
                            source={{ uri: img }} 
                            style={styles.avatarImage} 
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageLoaded(false)} // Manejo de errores
                        />
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomeContainer: {
        margin: 10,
        borderColor: '#00a9b2',
        borderRadius: 25,
        borderWidth: 3,
        height: '15%',
        padding: 2,
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        
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
        marginRight: '10%',
    },
    avatarImage: {
        width: 90,
        height: 90,
    },
    skeleton: {
        width: 90,  // Ajusta el tamaño según lo necesites
        height: 90, 
        borderRadius: 45,  // La mitad del ancho y alto para que sea un círculo
        backgroundColor: "#e0e0e0",  // Color gris para simular el efecto de carga
},
});
