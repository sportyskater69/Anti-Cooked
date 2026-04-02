import "@expo-google-fonts/inter";
import {
    NotoSerif_400Regular,
    NotoSerif_600SemiBold,
    NotoSerif_700Bold,
    NotoSerif_800ExtraBold,
    useFonts
} from "@expo-google-fonts/noto-serif";

import { useEffect, useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import ScreenWrapper from "../../components/ScreenWrapper";
import { addTask, getTasksByDate, toggleTask } from "../../services/taskService";

import { useDateStore } from "../../store/dateStore";
import { Task } from "../../types/Task";

export default function HitListScreen() {

    const [modalVisible, setModalVisible] = useState(false);

    const [taskName, setTaskName] = useState("");

    const [dueDate, setDueDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const [selectedDate] = useState("2026-01-23");

    const generateMonthDays = (baseDate: Date) => {
        const start = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
        const end = new Date(baseDate.getFullYear(), baseDate.getMonth() + 2, 0); // +1 month view

        const days: Date[] = [];

        const current = new Date(start);

        while (current <= end) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }

        return days;
    };

    const [calendarBase] = useState(new Date());
    const calendarDays = generateMonthDays(calendarBase);

    const [tasks, setTasks] = useState<Task[]>([]);

    const [fontsLoaded] = useFonts({
        NotoSerif_400Regular,
        NotoSerif_600SemiBold,
        NotoSerif_700Bold,
        NotoSerif_800ExtraBold,
    });

    useEffect(() => {
        loadTasks();
    }, [selectedDate]);

    const loadTasks = async () => {
        const data = await getTasksByDate(selectedDate);
        setTasks(data);
    };

    const setSelectedDate = useDateStore((state) => state.setSelectedDate);

    const formatDateTime = (input: any) => {
        const d = input?.toDate?.() ?? new Date(input);

        if (isNaN(d.getTime())) return "Invalid";

        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");

        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");

        return `${hours}:${minutes} on ${day}/${month}`;
    };

    const visibleTasks = tasks.filter(t => !t.deleted);


    const totalTasks = visibleTasks.length;
    const completedTasks = visibleTasks.filter(t => t.completed).length;

    const completionPercent =
        totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    if (!fontsLoaded) return null;

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>

                <View style={styles.page}>

                    {/* HEADER */}
                    <View style={styles.points}>
                        <Text style={styles.numberPts}>1200</Text>
                        <Text style={styles.pts}>pts</Text>
                    </View>

                    <View style={styles.mainTitle}>
                        <Text style={styles.title}>The Hit List</Text>
                        <Text style={styles.titleDesc}>
                            Curating today’s intellectual pursuits.
                        </Text>
                    </View>

                    {/* CALENDAR */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.calender}
                    >
                        {calendarDays.map((day, index) => {
                            const isToday =
                                new Date().toDateString() === day.toDateString();

                            return (
                                <Pressable
                                    key={index}
                                    style={[

                                    ]}
                                    onPress={() => {
                                        const formattedDate = day.toISOString().split("T")[0];
                                        setSelectedDate(formattedDate);
                                    }}
                                >
                                    <Text
                                        style={[

                                        ]}
                                    >
                                        {day.getDate()}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </ScrollView>

                    {/* TITLE */}
                    <View style={styles.title2}>
                        <Text style={styles.titleText1}>Priority Objectives</Text>
                        <Text style={styles.titleText2}>
                            {visibleTasks.filter(t => !t.completed).length} remaining
                        </Text>
                    </View>

                    {/* TASK CARDS */}
                    <View style={styles.cardContainer}>

                        {visibleTasks
                            .sort((a, b) => {
                                if (a.completed === b.completed) return 0;
                                return a.completed ? 1 : -1;
                            })
                            .map((task) => (
                                <View key={task.id} style={styles.courseField3}>
                                    <View style={styles.alignment3}>

                                        {/* CHECKBOX */}
                                        <Pressable
                                            onPress={async () => {
                                                await toggleTask(task.id!, task.completed);
                                                loadTasks();
                                            }}
                                            style={[
                                                styles.checkbox,
                                                {
                                                    width: 18,
                                                    height: 18,
                                                    borderRadius: 4,
                                                    marginRight: 10,
                                                    backgroundColor: task.completed ? "#C99F7A" : "transparent",
                                                }
                                            ]}
                                        />

                                        {/* TEXT */}
                                        <View style={styles.texts}>

                                            <Text
                                                style={[
                                                    styles.courseText3,
                                                    task.completed && {
                                                        textDecorationLine: "line-through",
                                                        opacity: 0.6
                                                    }
                                                ]}
                                            >
                                                {task.title}
                                            </Text>

                                            <View style={styles.timeDate}>
                                                <Text style={styles.date}>
                                                    {formatDateTime(task.createdAt)}
                                                </Text>

                                                <Text style={styles.time}>
                                                    {" - "}
                                                    {formatDateTime(task.dueAt)}
                                                </Text>
                                            </View>

                                        </View>

                                    </View>
                                </View>
                            ))
                        }

                    </View>

                    {/* ADD BUTTON */}
                    <Pressable
                        onPress={() => setModalVisible(true)}
                        style={styles.text4}
                    >
                        <Text style={styles.courseText4}>+ Add New</Text>
                    </Pressable>

                    {/* PROGRESS */}
                    <View style={styles.progressField}>
                        <View style={styles.barTitle}>
                            <Text style={styles.termSurvival}>Term Survival</Text>
                            <Text style={styles.completed}>
                                {completionPercent}% COMPLETED
                            </Text>
                        </View>

                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    { width: `${completionPercent}%` }
                                ]}
                            />
                        </View>
                    </View>

                </View>
            </ScrollView>

            {/* MODAL */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    backgroundColor: "#000000aa"
                }}>
                    <View style={{
                        backgroundColor: "#fff",
                        margin: 20,
                        padding: 20,
                        borderRadius: 20
                    }}>

                        <TextInput
                            placeholder="Task Name"
                            value={taskName}
                            onChangeText={setTaskName}
                            style={{
                                marginBottom: 10,
                                padding: 10,
                                borderWidth: 1
                            }}
                        />

                        <Pressable
                            onPress={() => setShowPicker(true)}
                            style={{
                                padding: 10,
                                borderWidth: 1,
                                marginBottom: 10
                            }}
                        >
                            <Text>
                                Due: {dueDate.toLocaleString()}
                            </Text>
                        </Pressable>

                        {showPicker && (
                            <DateTimePicker
                                value={dueDate}
                                mode="datetime"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowPicker(false);
                                    if (selectedDate) setDueDate(selectedDate);
                                }}
                            />
                        )}

                        <Pressable
                            onPress={async () => {
                                await addTask({
                                    title: taskName,
                                    description: "",
                                    completed: false,
                                    selectedDate,
                                    createdAt: Date.now(),
                                    dueAt: dueDate.getTime(),
                                } as any);

                                setModalVisible(false);
                                setTaskName("");
                                setDueDate(new Date());

                                loadTasks();
                            }}
                            style={{
                                backgroundColor: "black",
                                padding: 12,
                                borderRadius: 10
                            }}
                        >
                            <Text style={{ color: "white", textAlign: "center" }}>
                                Create Task
                            </Text>
                        </Pressable>

                    </View>
                </View>
            </Modal>

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#43352E',
    },

    mainTitle: {
    },

    title: {
        fontFamily: 'NotoSerif_700Bold',
        fontSize: 32,
        marginLeft: 30,
        color: '#FFFFFF'
    },

    titleDesc: {
        fontSize: 13,
        color: '#A89E96',
        marginLeft: 30,
    },

    points: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 50,
        paddingRight: 20,
    },

    numberPts: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },

    pts: {
        color: '#A19A96',
        fontSize: 8,
        marginTop: 7,
    },

    calender: {
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: '#4C3E36',
        padding: 8,
    },

    calenderBox: {
        marginRight: 16.5,
        marginLeft: 5,
    },

    day1: {
        marginLeft: 7,
        color: '#FFFFFF',
        fontSize: 13,
    },

    day2: {
        marginLeft: 4,
        color: '#FFFFFF',
        fontSize: 13,
    },

    day3: {
        marginLeft: 7,
        color: '#2C2521',
        fontSize: 13,
    },

    day4: {
        marginLeft: 5,
        color: '#FFFFFF',
        fontSize: 13,
    },

    day5: {
        color: '#FFFFFF',
        fontSize: 13,
    },

    day6: {
        marginLeft: 4,
        color: '#FFFFFF',
        fontSize: 13,
    },

    day7: {
        marginLeft: 4,
        color: '#FFFFFF',
        fontSize: 13,
    },

    dayTitle: {
        color: '#FFFFFF',
        fontSize: 13,
    },

    calenderBox1: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: '#2C2521',
        borderRadius: 30,
    },

    calenderBox2: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 11,
        backgroundColor: '#2C2521',
        borderRadius: 30,
    },

    calenderBox3: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: '#C99F7A',
        borderRadius: 30,
    },

    calenderBox4: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 10,
        backgroundColor: '#2C2521',
        borderRadius: 30,
    },

    calenderBox5: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 14,
        backgroundColor: '#2C2521',
        borderRadius: 30,
    },

    calenderBox6: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 12,
        backgroundColor: '#2C2521',
        borderRadius: 30,
    },

    calenderBox7: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: '#2C2521',
        borderRadius: 30,
    },

    dayTitleO: {
        color: '#362F2B',
    },

    title2: {
        flexDirection: 'row',
        marginTop: 35
    },

    titleText1: {
        color: '#C99F7A',
        fontWeight: 'bold',
        marginLeft: 35,
    },

    titleText2: {
        color: '#C99F7A',
        fontWeight: 'bold',
        marginLeft: 155
    },

    cardContainer: {
        marginTop: 35,
        gap: 20,
        alignItems: 'center',
    },

    courseField: {
        width: '87%',
        height: 125,
        backgroundColor: '#EAE0D5',
        borderRadius: 50,
    },

    alignment: {
        flexDirection: 'row',
        marginLeft: 30,
        marginTop: 45,
    },

    checkbox: {
        backgroundColor: '#D6C3B2',
        marginBottom: 5,
        paddingRight: 20,
        paddingLeft: 18,
        borderWidth: 5,
        borderColor: '#9A6F4B',
        borderRadius: 5,
    },

    texts: {
        marginLeft: 20
    },

    courseText: {
        fontFamily: 'NotoSerif_700Bold',
        fontSize: 20,
    },

    courseTime: {
        fontSize: 14,
        color: '#C99F7A',
        fontWeight: 'bold',
    },

    courseField2: {
        width: '87%',
        height: 125,
        backgroundColor: '#EAE0D5',
        borderRadius: 50,
    },

    alignment2: {
        flexDirection: 'row',
        marginLeft: 30,
        marginTop: 45,
    },

    checkbox2: {
        backgroundColor: '#D6C3B2',
        marginBottom: 5,
        paddingRight: 20,
        paddingLeft: 18,
        borderWidth: 5,
        borderColor: '#9A6F4B',
        borderRadius: 5,
    },

    text2: {
        marginLeft: 80
    },

    courseText2: {
        fontFamily: 'NotoSerif_700Bold',
        fontSize: 30,
    },

    timeDate: {
        flexDirection: 'row',
    },

    time: {
        marginLeft: 60,
        fontFamily: 'NotoSerif_700Bold',
        fontSize: 10
    },

    date: {
        fontFamily: 'NotoSerif_700Bold',
        fontSize: 10
    },

    courseField3: {
        width: '75%',
        height: 73,
        backgroundColor: '#EAE0D5',
        borderRadius: 50,
    },

    alignment3: {
        flexDirection: 'row',
        marginLeft: 30,
        marginTop: 15,
    },

    text3: {
        marginLeft: 80,
    },

    courseText3: {
        fontFamily: 'NotoSerif_700Bold',
        fontSize: 16,
    },

    courseText4: {
        marginTop: 8,
        fontFamily: 'NotoSerif_700Bold',
        fontSize: 24,
    },

    text4: {
        marginLeft: 70,
    },

    progressField: {
    },

    barTitle: {
        flexDirection: 'row',
    },

    termSurvival: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 50,
        fontSize: 15,
        marginLeft: 40,
    },

    completed: {
        marginLeft: 110,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 50,
        fontSize: 15
    },

    progressBar: {
        height: 20,
        width: '85%',
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        marginLeft: 25,
        marginTop: 20,
        overflow: 'hidden',
    },

    progressFill: {
        height: '100%',
        width: '75%',
        backgroundColor: '#C99F7A',
        borderRadius: 20,
    },
});