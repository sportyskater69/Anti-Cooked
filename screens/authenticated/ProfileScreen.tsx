import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile Content</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C2521',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#EAE0D5',
        fontSize: 24,
    },
});
