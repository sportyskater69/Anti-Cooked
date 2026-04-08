import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    quote: string;
};

const COLORS = {
    mocha: '#2C2521',
    oatMilk: '#EAE0D5',
    caramel: '#C99F7A',
};

export default function QuoteCard({ quote }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.text}>“{quote}”</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.oatMilk,
        borderRadius: 28,
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginTop: 16, // spacing from Deep Focus card
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        fontFamily: "NotoSerif_400Regular",
        fontSize: 14,
        fontStyle: "italic",
        color: COLORS.mocha,
        textAlign: "center",
        lineHeight: 20,
    },
});