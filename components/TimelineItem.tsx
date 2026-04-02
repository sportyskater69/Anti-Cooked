import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    title: string;
    description: string;
    date: string;
    completed: boolean;
    isLast?: boolean;
    onPress?: () => void;
};

export default function TimelineItem({
    title,
    description,
    date,
    completed,
    isLast,
    onPress,
}: Props) {
    return (
        <View style={styles.row}>

            {/* LEFT SIDE (circle + line) */}
            <View style={styles.left}>

                <Pressable onPress={onPress} style={[
                    styles.circle,
                    completed ? styles.circleDone : styles.circlePending
                ]}>
                    {completed && <Text style={styles.check}>✓</Text>}
                </Pressable>

                {/* connector line */}
                {!isLast && (
                    <View style={[
                        styles.line,
                        completed ? styles.lineDone : styles.linePending
                    ]} />
                )}

            </View>

            {/* RIGHT SIDE CONTENT */}
            <View style={styles.right}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.desc}>{description}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginTop: 25,
    },

    left: {
        width: 40,
        alignItems: "center",
    },

    circle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
    },

    circleDone: {
        backgroundColor: "#EBBE97",
        borderColor: "#EBBE97",
    },

    circlePending: {
        backgroundColor: "#211A16",
        borderColor: "#EBBE97",
    },

    check: {
        color: "#211A16",
        fontSize: 12,
        fontWeight: "bold",
    },

    line: {
        width: 2,
        flex: 1,
        marginTop: 4,
    },

    lineDone: {
        backgroundColor: "#EBBE97",
    },

    linePending: {
        backgroundColor: "#211A16", // same as background (invisible)
    },

    right: {
        flex: 1,
        marginLeft: 10,
    },

    title: {
        color: "#EDE0D9",
        fontSize: 18,
        fontWeight: "bold",
    },

    desc: {
        color: "#D3C4B8",
        fontSize: 14,
        marginTop: 4,
    },

    date: {
        marginTop: 8,
        color: "#685E57",
        fontSize: 12,
        letterSpacing: 1.2,
    },
});