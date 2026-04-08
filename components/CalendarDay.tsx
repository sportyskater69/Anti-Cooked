import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
    day: Date;
    selected: boolean;
    isToday: boolean;
    onPress: () => void;
};

export default function CalendarDay({ day, selected, isToday, onPress }: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.day,
                selected && styles.selected,
                isToday && !selected && styles.today,
            ]}
        >
            <Text style={styles.text}>{day.getDate()}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    day: {
        padding: 10,
        borderRadius: 10,
    },
    selected: {
        backgroundColor: "#C99F7A",
    },
    today: {
        borderWidth: 1,
        borderColor: "#C99F7A",
    },
    text: {
        color: "#fff",
    },
});