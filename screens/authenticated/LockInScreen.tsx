import "@expo-google-fonts/inter";
import ScreenWrapper from "../../components/ScreenWrapper";
import TimelineItem from "../../components/TimelineItem";

import {
    NotoSerif_400Regular,
    NotoSerif_600SemiBold,
    NotoSerif_700Bold,
    NotoSerif_800ExtraBold,
    useFonts
} from "@expo-google-fonts/noto-serif";

import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getTasksByDate, toggleTask } from "../../services/taskService";
import { useTimerStore } from "../../store/timerStore";
import { Task } from "../../types/Task";

import { useDateStore } from "../../store/dateStore";

const COLORS = {
    mocha: '#2C2521',
    oatMilk: '#EAE0D5',
    caramel: '#C99F7A',
};

export default function LockInScreen() {

    const quotes = [
        "Discipline is choosing what you want most over what you want now.",
        "Small progress is still progress.",
        "Focus is the new superpower.",
        "You don’t need motivation, you need routine.",
        "One task at a time. One life at a time.",
        "Your future is built in the moments you stay consistent.",
        "Do it even when you don’t feel like it.",
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const [fontsLoaded] = useFonts({
        NotoSerif_400Regular,
        NotoSerif_600SemiBold,
        NotoSerif_800ExtraBold,
        NotoSerif_700Bold,
    });

    const [mode, setMode] = useState<"work" | "break">("work");
    const secondsLeft = useTimerStore((s) => s.secondsLeft);
    const setSecondsLeft = useTimerStore((s) => s.setSecondsLeft);

    const running = useTimerStore((s) => s.running);
    const setRunning = useTimerStore((s) => s.setRunning);

    const [showModal, setShowModal] = useState(false);

    const route = useRoute<any>();

    const selectedDate = useDateStore((state) => state.selectedDate);
    const setSelectedDate = useDateStore((state) => state.setSelectedDate);


    const [tasks, setTasks] = useState<Task[]>([]);

    const load = useCallback(async () => {
        const data = await getTasksByDate(selectedDate);
        setTasks(data);
    }, [selectedDate]);

    useFocusEffect(
        useCallback(() => {
            load();
        }, [load])
    );

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setRunning(false); // stop timer when leaving screen
            };
        }, [])
    );

    useEffect(() => {
        if (!running) return;

        const interval = setInterval(() => {
            setSecondsLeft(secondsLeft - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [running, secondsLeft]);

    useEffect(() => {
        if (!running) return;

        if (secondsLeft <= 0) {
            setSecondsLeft(0);
            setRunning(false);
            setShowModal(true);
            return;
        }

        const interval = setInterval(() => {
            setSecondsLeft(secondsLeft - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [running, secondsLeft]);

    const formatTime = (sec: number) => {
        if (!Number.isFinite(sec)) return "00:00";

        const m = Math.floor(sec / 60);
        const s = sec % 60;

        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };


    const sortedTasks = [...tasks].sort((a, b) => {
        const aCompleted = a.completed ? 1 : 0;
        const bCompleted = b.completed ? 1 : 0;

        // Completed first
        if (aCompleted !== bCompleted) return bCompleted - aCompleted;

        // Then sort by createdAt
        const aTime = (a.createdAt as any)?.seconds ?? a.createdAt;
        const bTime = (b.createdAt as any)?.seconds ?? b.createdAt;

        return aTime - bTime;
    });

    const checkOffNextTask = async () => {
        // find oldest incomplete task
        const incompleteTasks = tasks
            .filter(t => !t.completed)
            .sort((a, b) => {
                const aTime = (a.createdAt as any)?.seconds ?? a.createdAt;
                const bTime = (b.createdAt as any)?.seconds ?? b.createdAt;
                return aTime - bTime;
            });

        if (incompleteTasks.length === 0) return;

        const nextTask = incompleteTasks[0];

        await toggleTask(nextTask.id, nextTask.completed);
        load();
    };

    useEffect(() => {
        if (secondsLeft === 0 && running) {
            setRunning(false);
            setShowModal(true);
        }
    }, [secondsLeft]);

    if (!fontsLoaded) return null;

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.page}>
                <View style={styles.title}>

                    <Text style={styles.text}>Lock - in Mode</Text>

                    <View style={styles.box}>
                        <Text style={styles.deepwork}>DEEP WORK SESSION</Text>
                        <Text style={styles.essay}>Philosophy Essay</Text>
                        <Text style={styles.min}>
                            {formatTime(secondsLeft)}
                        </Text>

                        <View style={styles.nextup}>
                            <Text style={styles.nextuptext}>
                                Next up: {mode === "work" ? "5 min break" : "25 min session"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.buttonRow}>
                        <Pressable
                            style={styles.commenceFocus}
                            onPress={() => setRunning(true)}
                        >
                            <Text style={styles.commenceFocusText}>Commence Focus</Text>
                        </Pressable>

                        <Pressable
                            style={styles.resetSession}
                            onPress={() => {
                                setRunning(false);
                                setShowModal(false);

                                if (mode === "work") {
                                    setSecondsLeft(25 * 60);
                                } else {
                                    setSecondsLeft(5 * 60);
                                }
                            }}
                        >
                            <Text style={styles.resetSessionText}>Reset Session</Text>
                        </Pressable>
                    </View>

                    <View style={styles.achivementTimeline}>
                        <Text style={styles.achivementTimelineText}>
                            Achievement Timeline
                        </Text>

                        <ScrollView
                            style={{ marginTop: 10 }}
                            contentContainerStyle={{ paddingBottom: 40 }}
                            showsVerticalScrollIndicator={false}
                        >
                            {sortedTasks.map((item, index) => (
                                <TimelineItem
                                    key={item.id}
                                    task={item}
                                    isLast={index === sortedTasks.length - 1}
                                    onPress={async () => {
                                        await toggleTask(item.id, item.completed);
                                        load();
                                    }}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    <Pressable
                        onPress={checkOffNextTask}
                        style={{
                            width: "80%",
                            height: 55,
                            backgroundColor: "#C99F7A",
                            borderRadius: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 20,
                        }}
                    >
                        <Text style={{
                            fontFamily: "NotoSerif_700Bold",
                            fontSize: 18,
                            color: "#211A16"
                        }}>
                            Check Off
                        </Text>
                    </Pressable>
                    <View style={styles.quoteCard}>
                        <Text style={styles.quoteText}>
                            “{randomQuote}”
                        </Text>
                    </View>

                </View>
            </ScrollView>
            {showModal && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>

                        {/* BIG MESSAGE */}
                        <Text style={styles.modalTitle}>
                            {mode === "work"
                                ? "Time for a break"
                                : "Back to work"}
                        </Text>

                        {/* SUBTEXT */}
                        <Text style={styles.modalSubtitle}>
                            {mode === "work"
                                ? "Your focus session is complete"
                                : "Break is over — time to lock in"}
                        </Text>

                        {/* OPTIONS */}
                        <View style={styles.modalButtonRow}>

                            {mode === "work" ? (
                                <>
                                    <Pressable
                                        style={styles.modalButton}
                                        onPress={() => {
                                            setMode("break");
                                            setSecondsLeft(5 * 60);
                                            setShowModal(false);
                                            setRunning(true);
                                        }}
                                    >
                                        <Text style={styles.modalButtonText}>
                                            Start Break
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        style={styles.modalButtonAlt}
                                        onPress={() => {
                                            setSecondsLeft(25 * 60);
                                            setShowModal(false);
                                            setRunning(true);
                                        }}
                                    >
                                        <Text style={styles.modalButtonText}>
                                            Skip
                                        </Text>
                                    </Pressable>
                                </>
                            ) : (
                                <>
                                    <Pressable
                                        style={styles.modalButton}
                                        onPress={() => {
                                            setMode("work");
                                            setSecondsLeft(25 * 60);
                                            setShowModal(false);
                                            setRunning(true);
                                        }}
                                    >
                                        <Text style={styles.modalButtonText}>
                                            Start Work
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        style={styles.modalButtonAlt}
                                        onPress={() => {
                                            setSecondsLeft(5 * 60);
                                            setShowModal(false);
                                            setRunning(true);
                                        }}
                                    >
                                        <Text style={styles.modalButtonText}>
                                            Extend Break
                                        </Text>
                                    </Pressable>
                                </>
                            )}

                        </View>
                    </View>
                </View>
            )}
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    quoteCard: {
        backgroundColor: COLORS.oatMilk,
        borderRadius: 28,
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginTop: 30,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    quoteText: {
        fontFamily: "NotoSerif_400Regular",
        fontSize: 14,
        fontStyle: "italic",
        color: COLORS.mocha,
        textAlign: "center",
        lineHeight: 20,
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#000000aa",
        justifyContent: "center",
        alignItems: "center",
    },

    modalCard: {
        width: "85%",
        backgroundColor: "#EAE0D5",
        borderRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: "center",
    },

    modalTitle: {
        fontSize: 26,
        fontFamily: "NotoSerif_800ExtraBold",
        color: "#211A16",
        textAlign: "center",
    },

    modalSubtitle: {
        marginTop: 8,
        fontSize: 14,
        fontFamily: "NotoSerif_400Regular",
        color: "#5A4E45",
        textAlign: "center",
    },

    modalButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 25,
    },

    modalButton: {
        flex: 1,
        backgroundColor: "#C99F7A",
        paddingVertical: 14,
        borderRadius: 20,
        marginRight: 10,
        alignItems: "center",
    },

    modalButtonAlt: {
        flex: 1,
        backgroundColor: "#DCC5AF",
        paddingVertical: 14,
        borderRadius: 20,
        marginLeft: 10,
        alignItems: "center",
    },

    modalButtonText: {
        fontSize: 14,
        fontFamily: "NotoSerif_700Bold",
        color: "#211A16",
    },
    title: {
        flex: 1,
        alignItems: 'center',
    },

    page2: {
        flex: 2,
    },

    deepwork: {
        fontFamily: 'NotoSerif_800ExtraBold',
        fontSize: 13,
        color: '#75706B',
        textAlign: 'center',

    },

    essay: {
        fontFamily: 'NotoSerif_700Bold',
        fontSize: 25,
    },

    min: {
        fontFamily: 'NotoSerif_600SemiBold',
        fontSize: 110
    },

    nextup: {
        fontFamily: 'NotoSerif_400Regular',
        backgroundColor: '#DCC5AF',
        fontSize: 12,
        marginTop: 10,
        borderRadius: 30,
        width: '83%',
        height: 32,
        alignItems: 'center',

    },

    nextuptext: {
        fontFamily: 'NotoSerif_400Regular',
        marginTop: 6,
        color: '#5A4E45'
    },

    // > logo must be added
    commenceFocus: {
        width: '39%',
        height: 46,
        backgroundColor: '#C99F7A',
        marginTop: 25,
        borderRadius: 30,
        marginRight: 10,
    },

    commenceFocusText: {
        marginTop: 13,
        marginLeft: 25,
        fontWeight: 'bold',
    },

    // 'reset' logo should be added
    resetSession: {
        width: '39%',
        height: 46,
        backgroundColor: '#C99F7A',
        marginTop: 25,
        borderRadius: 30,
    },

    resetSessionText: {
        marginTop: 13,
        marginLeft: 38,
        fontWeight: 'bold',
    },

    buttonRow: {
        flexDirection: 'row',
    },

    page: {
        flexGrow: 1,
        backgroundColor: 'rgb(67, 53, 46)',
        paddingBottom: 40
    },

    box: {
        backgroundColor: '#EAE0D5',
        padding: 20,
        borderRadius: 50,
        width: '82%',
        height: 300,
        alignItems: 'center',
        marginTop: 30,
    },

    text: {
        fontFamily: 'NotoSerif_700Bold',
        fontSize: 25,
        color: 'white'
    },

    achivementTimeline: {
        width: "96%",
        height: 545,
        borderRadius: 48,
        backgroundColor: '#211A16',
        marginTop: 40,
        overflow: "hidden"
    },

    achivementTimelineText: {
        fontSize: 24,
        color: '#FFFFFF',
        fontFamily: 'NotoSerif_700Bold',
        marginTop: 40,
        marginLeft: 35,
    },

    progressRow: {
    },

    leftSide: {
        width: '20%',
        height: 20,
        backgroundColor: '#EBBE97',
        borderWidth: 1,
        borderColor: "white",

    },

    circle: {

    },

    line: {

    },

    rightSide: {
        marginTop: 40,
        marginLeft: 65,
    },

    title2: {
        color: '#D3C4B8',
        fontSize: 18,
        fontWeight: 'bold',
    },

    title3: {
        color: '#EDE0D9',
        fontSize: 18,
        fontWeight: 'bold',
    },

    desc: {
        color: '#D3C4B8',
        fontSize: 14,
    },

    date: {
        marginTop: 10,
        color: '#685E57',
        fontSize: 12,
        letterSpacing: 1.2,
    },

    date2: {
        color: '#9A7C64',
        letterSpacing: 1.2,
    },

    reward: {
        flexDirection: 'row',
        width: '97%',
        height: 54,
        borderRadius: 100,
        backgroundColor: '#302924',
    },

    point: {
        marginRight: 9,
        fontSize: 19,
        marginTop: 15,
        color: '#EDE0D9',
        fontWeight: 'bold',
    },

    pts: {
        marginTop: 21,
        color: '#5F5751',
        letterSpacing: 1.2,
        fontSize: 12,
        fontWeight: 'bold',
    },

    totalPoints: {
        marginLeft: 30,
        flexDirection: 'row',
    },

    // Should add an reward icon next to '450'
    rewardText: {
        marginBottom: 10,
        marginLeft: 14,
        fontFamily: 'NotoSerif_700Bold',
        color: '#FFFFFF',
        fontSize: 24,
    },

    rewardField: {
        marginTop: 120,
    }
});
