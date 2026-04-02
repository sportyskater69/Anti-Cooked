import { Pressable, StyleSheet, Text, View } from "react-native";
import { Task } from "../types/Task";

type Props = {
    task: Task;
    isLast?: boolean;
    onPress?: () => void;
};

export default function TimelineItem({ task, isLast, onPress }: Props) {
    return (
        <View style={styles.row}>

            {/* LEFT SIDE */}
            <View style={styles.left}>

                <Pressable
                    onPress={onPress}
                    style={[
                        styles.circle,
                        task.completed ? styles.circleDone : styles.circlePending
                    ]}
                >
                    {task.completed && <Text style={styles.check}>✓</Text>}
                </Pressable>

                {!isLast && (
                    <View style={[
                        styles.line,
                        task.completed ? styles.lineDone : styles.linePending
                    ]} />
                )}
            </View>

            {/* RIGHT SIDE */}
            <View style={styles.right}>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={styles.desc}>{task.description}</Text>
                <Text style={styles.date}>
                    {new Date(task.dueAt as any).toDateString()}
                </Text>
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