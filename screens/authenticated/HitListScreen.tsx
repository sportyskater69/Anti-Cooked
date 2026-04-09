import "@expo-google-fonts/inter";
import {
    NotoSerif_400Regular,
    NotoSerif_600SemiBold,
    NotoSerif_700Bold,
    NotoSerif_800ExtraBold,
    useFonts
} from "@expo-google-fonts/noto-serif";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import AnimatedCard from "../../components/AnimatedCard";
import CalendarDay from "../../components/CalendarDay";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useTasksByDate } from "../../hooks/useTaskByDate";
import { addTask, toggleTask } from "../../services/taskService";
import { useDateStore } from "../../store/dateStore";
import { COLORS } from "../../theme/colors";
import { formatTimeHM } from "../../utils/formatters";
import { getCompletionPercent } from "../../utils/progressUtil";
import {
    getVisibleTasks,
    sortByCompletion
} from "../../utils/taskUtils";

const generateMonthDays = (baseDate: Date) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(baseDate);
    end.setMonth(end.getMonth() + 1);

    const days: Date[] = [];
    const current = new Date(start);

    while (current <= end) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return days;
};



export default function HitListScreen() {

    const [modalVisible, setModalVisible] = useState(false);

    const [taskName, setTaskName] = useState("");

    const [dueDate, setDueDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const selectedDate = useDateStore((state) => state.selectedDate);
    const setSelectedDate = useDateStore((state) => state.setSelectedDate);


    const [calendarBase] = useState(new Date());
    const calendarDays = generateMonthDays(calendarBase);

    const { tasks, setTasks, reload: loadTasks } = useTasksByDate(selectedDate);

    const [fontsLoaded] = useFonts({
        NotoSerif_400Regular,
        NotoSerif_600SemiBold,
        NotoSerif_700Bold,
        NotoSerif_800ExtraBold,
    });
    const visibleTasks = getVisibleTasks(tasks);
    const completionPercent = getCompletionPercent(visibleTasks);
    if (!fontsLoaded) return null;

    const createTask = async () => {
        if (!taskName.trim()) return;

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
    };

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={[
                styles.calender,
                { paddingHorizontal: 10 }
            ]}>

                <View style={styles.page}>
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
                            const dateKey = day.toISOString().split("T")[0];

                            return (
                                <CalendarDay
                                    key={index}
                                    day={day}
                                    selected={selectedDate === dateKey}
                                    isToday={new Date().toDateString() === day.toDateString()}
                                    onPress={() => setSelectedDate(dateKey)}
                                />
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

                        {sortByCompletion(visibleTasks).map((task) => (
                            <AnimatedCard key={task.id} style={styles.courseField3}>
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
                                                width: 30,
                                                height: 30,
                                                borderRadius: 6,
                                                marginRight: 10,
                                                backgroundColor: task.completed ? COLORS.card.border : "transparent",
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
                                                {formatTimeHM(task.createdAt)}
                                            </Text>

                                            <Text style={styles.time}>
                                                {" - "}
                                                {formatTimeHM(task.dueAt)}
                                            </Text>
                                        </View>

                                    </View>

                                </View>
                            </AnimatedCard>
                        ))
                        }

                    </View>

                    {/* ADD BUTTON */}
                    <Pressable
                        onPress={() => setModalVisible(true)}
                        style={styles.addNewCard}
                    >
                        <Text style={styles.addNewText}>+ Add New</Text>
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
                            onPress={createTask}
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

    calendarDayToday: {
        backgroundColor: "#3A2F2A",
        borderWidth: 1,
        borderColor: COLORS.card.border,
    },
    page: {
        backgroundColor: '#43352E',
    },

    mainTitle: {
    },

    title: {
        fontFamily: 'NotoSerif_700Bold',
        fontSize: 32,
        marginLeft: 30,
        color: COLORS.text.light
    },

    titleDesc: {
        fontSize: 13,
        color: '#A89E96',
        marginLeft: 30,
    },

    calender: {
        marginTop: 15,
        flexDirection: "row",
        backgroundColor: "#4C3E36",
        paddingVertical: 10,
    },

    title2: {
        flexDirection: 'row',
        marginTop: 35
    },

    titleText1: {
        color: COLORS.card.border,
        fontWeight: 'bold',
        marginLeft: 35,
    },

    titleText2: {
        color: COLORS.card.border,
        fontWeight: 'bold',
        marginLeft: 155
    },

    cardContainer: {
        marginTop: 35,
        gap: 20,
        alignItems: 'center',
    },

    checkbox: {
        borderWidth: 2,
        borderColor: "#9A6F4B",
        justifyContent: "center",
        alignItems: "center",
    },

    texts: {
        marginLeft: 20
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
        backgroundColor: COLORS.background,
        borderRadius: 50,
    },

    alignment3: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 25,
        height: "100%",
    },

    courseText3: {
        fontFamily: 'NotoSerif_700Bold',
        fontSize: 16,
    },

    progressField: {
    },

    barTitle: {
        flexDirection: 'row',
    },

    termSurvival: {
        fontWeight: 'bold',
        color: COLORS.text.light,
        marginTop: 50,
        fontSize: 15,
        marginLeft: 40,
    },

    completed: {
        marginLeft: 110,
        fontWeight: 'bold',
        color: COLORS.text.light,
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
        backgroundColor: COLORS.card.border,
        borderRadius: 20,
    },

    calendarDay: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: COLORS.text.primary,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 6,
    },

    calendarDayActive: {
        backgroundColor: "#3A2F2A",
    },

    calendarDaySelected: {
        backgroundColor: COLORS.card.border,
    },

    calendarDayText: {
        color: COLORS.text.light,
        fontSize: 14,
        fontWeight: "600",
    },

    calendarDayTextActive: {
        color: COLORS.text.primary,
        fontWeight: "800",
    },

    addNewCard: {
        width: "75%",
        height: 73,
        backgroundColor: COLORS.background,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        alignSelf: "center",
    },

    addNewText: {
        fontFamily: "NotoSerif_700Bold",
        fontSize: 18,
        color: COLORS.text.primary,
    },

});