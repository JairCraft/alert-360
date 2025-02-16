import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

interface UserProps {
    user: {
        name: string;
        email: string;
        phone: string;
        password: string;
    };
}

export default function Users({user }: UserProps) {
    return (
        <View>
            <View>
                <View>
                    <Text>NOMBRE {user.name.split(' ')[0]}</Text>
                </View>
                <View>
                    <Text>EMAIL {user.email.split(' ')[0]}</Text>
                </View>
                <View>
                    <Text>PHONE {user.phone.split(' ')[0]}</Text>
                </View>
                <View>
                    <Text>PASS {user.password.split(' ')[0]}</Text>
                </View>
            </View>
        </View>
    )
}