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

import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getTasksByDate, toggleTask } from "../../services/taskService";
import { Task } from "../../types/Task";

export default function LockInScreen() {
    const [fontsLoaded] = useFonts({
        NotoSerif_400Regular,
        NotoSerif_600SemiBold,
        NotoSerif_800ExtraBold,
        NotoSerif_700Bold,
    });


    // 👇 future: replace with real selected date logic
    const [selectedDate] = useState("2023-10-24");

    const [tasks, setTasks] = useState<Task[]>([]);

    const load = useCallback(async () => {
        const data = await getTasksByDate(selectedDate);
        setTasks(data);
    }, [selectedDate]);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        const load = async () => {
            const data = await getTasksByDate(selectedDate);
            setTasks(data);
        };

        load();
    }, [selectedDate]);

    if (!fontsLoaded) return null;

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.page}>
                <View style={styles.title}>

                    <Text style={styles.text}>Lock - in Mode</Text>

                    <View style={styles.box}>
                        <Text style={styles.deepwork}>DEEP WORK SESSION</Text>
                        <Text style={styles.essay}>Philosophy Essay</Text>
                        <Text style={styles.min}>25:00</Text>

                        <View style={styles.nextup}>
                            <Text style={styles.nextuptext}>
                                Next up : 5 min Short Break
                            </Text>
                        </View>
                    </View>

                    <View style={styles.buttonRow}>
                        <View style={styles.commenceFocus}>
                            <Text style={styles.commenceFocusText}>Commence Focus</Text>
                        </View>

                        <View style={styles.resetSession}>
                            <Text style={styles.resetSessionText}>Reset Session</Text>
                        </View>
                    </View>

                    <View style={styles.achivementTimeline}>
                        <Text style={styles.achivementTimelineText}>
                            Achievement Timeline
                        </Text>

                        {tasks.map((item, index) => (
                            <TimelineItem
                                key={item.id}
                                task={item}
                                isLast={index === tasks.length - 1}
                                onPress={async () => {
                                    await toggleTask(item.id, item.completed);
                                    load();
                                }}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
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
        paddingBottom: 200
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
        marginTop: 40
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
