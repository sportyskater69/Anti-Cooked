import { Inter_300Light, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { NotoSerif_400Regular, NotoSerif_700Bold, useFonts } from '@expo-google-fonts/noto-serif';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AnimatedCard from "../../components/AnimatedCard";
import QuoteCard from '../../components/QuoteCard';
import { auth } from '../../config/firebaseConfig';
import { getTasksByDate } from '../../services/taskService';
import { getUserProfile } from '../../services/userService';
import { useDateStore } from "../../store/dateStore";
import { useTimerStore } from "../../store/timerStore";
import { formatDate, formatTimeHM, formatTimeLeft } from "../../utils/formatters";

const COLORS = {
  mocha: '#2C2521',
  oatMilk: '#EAE0D5',
  caramel: '#C99F7A',
};

type TabRoutes = "HomeScreen" | "HitList" | "LockIn" | "Profile";



// --- Custom Animated Card Wrapper ---


export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [fullName, setFullName] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const selectedDate = useDateStore((state) => state.selectedDate);
  const setSelectedDate = useDateStore((state) => state.setSelectedDate);
  const [fontsLoaded] = useFonts({
    NotoSerif_700Bold,
    NotoSerif_400Regular,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_300Light,
  });
  const secondsLeft = useTimerStore((s) => s.secondsLeft);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const profile = await getUserProfile(user.uid);
        setFullName(profile?.fullName || user.displayName || 'User');
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    loadUser();
  }, []);


  useFocusEffect(
    useCallback(() => {
      const loadTasks = async () => {
        try {
          const data = await getTasksByDate(selectedDate);
          setTasks(data);
        } catch (error) {
          console.error("Failed to load tasks:", error);
        }
      };

      loadTasks();
    }, [selectedDate])
  );


  const visibleTasks = tasks
    .filter(t => !t.deleted)
    .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
  const tileAnims = useRef(Array.from({ length: 6 }).map(() => new Animated.Value(0))).current;

  useFocusEffect(
    useCallback(() => {
      tileAnims.forEach((anim) => anim.setValue(0));
      Animated.stagger(
        100,
        tileAnims.map((anim) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          })
        )
      ).start();
    }, [tileAnims])
  );

  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: COLORS.mocha }} />;

  // Format Current Date
  const formattedDate = formatDate(Date.now()).toUpperCase();

  const goTo = (screen: TabRoutes) => {
    navigation.navigate(screen);
  };

  const getTileStyle = (index: number) => ({
    opacity: tileAnims[index],
    transform: [
      {
        translateY: tileAnims[index].interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  });

  const incompleteTasks = tasks
    .filter(t => !t.completed && !t.deleted)
    .sort((a, b) => {
      const aTime = a.createdAt?.seconds ?? a.createdAt;
      const bTime = b.createdAt?.seconds ?? b.createdAt;
      return bTime - aTime; // newest first
    });

  const focusTasks = incompleteTasks.slice(0, 3);

  // progress
  const totalTasks = tasks.filter(t => !t.deleted).length;
  const completedTasks = tasks.filter(t => t.completed && !t.deleted).length;

  const progressPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const quotes = [
    "Discipline is choosing what you want most over what you want now.",
    "Small steps every day lead to big results.",
    "Focus is the new productivity.",
    "You don’t need motivation, you need structure.",
    "Consistency beats intensity.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTitles}>
          <Text style={styles.headerHeadline}>Home</Text>
          <Text style={styles.headerSubtitle}>
            Welcome back to your sanctuary, {fullName}
          </Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCplS1NzplaUbeK3ZEKtydcpY_Q6jJdiLU0m7eePTh3kEjMSgU8HvGdM4OgVNUHUz7Op-uLvL-GRaOVK8VBlKxLc1bnJykha56k4sMMuOsHpbx1Y8fadoF-e7mKbvRZ9jDK8vW53x23RoTLFWxOh-m_5YfbYYj4ja0Oe3Ptufi7lZl8EcBG911QRlXVJJ8Q9XYuR84vOJaBDtwuEchrH7pcM9QVGw2lfb9O2RIgUFkVSKQPTQztMU3J8IPqBrK85kF_7mPGnlXTLes',
            }}
            style={styles.avatarImage}
          />
        </View>
      </View>

      {/* Grid Layout Starts */}
      <View style={styles.gridContainer}>
        {/* Widget 1: Deep Focus (col-span-2) */}
        <Pressable onPress={() => goTo("LockIn")}>
          <Animated.View style={[getTileStyle(0), { marginBottom: 50 }]}>

            <AnimatedCard style={styles.deepFocusCard}>
              <View style={styles.deepFocusTopRow}>
                <View>
                  <Text style={styles.deepFocusLabel}>CURRENT FOCUS</Text>
                  <Text style={styles.deepFocusTitle}>Morning Deep Focus</Text>
                </View>
                <View style={styles.deepFocusIconBadge}>
                  <MaterialIcons name="timer" size={24} color={COLORS.oatMilk} />
                </View>
              </View>

              <View style={styles.deepFocusTaskList}>
                {focusTasks.map((task) => (
                  <View key={task.id} style={styles.taskItem}>
                    <View style={styles.taskDot} />
                    <Text style={styles.taskText}>
                      {task.title}
                    </Text>
                  </View>
                ))}

                {focusTasks.length === 0 && (
                  <Text style={styles.taskText}>No tasks yet</Text>
                )}
              </View>

              <View style={styles.progressSection}>
                <View style={styles.progressBarTrack}>
                  <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressLabelText}>
                    {progressPercent}% COMPLETE
                  </Text>
                  <Text style={styles.progressLabelText}>
                    {formatTimeLeft(secondsLeft)}
                  </Text>
                </View>
              </View>
            </AnimatedCard>

          </Animated.View>
        </Pressable>
        {/* Widget 2: Upcoming Classes (col-span-2) */}


        {/* 2-Column Split for Priority vs (Streak + Date) */}
        <View style={styles.splitRow}>
          {/* Widget 3: Priority Objectives (col-span-1) */}
          <View style={styles.halfColumn}>
            <Pressable onPress={() => goTo("HitList")}>
              <Animated.View style={[getTileStyle(2), { flex: 1 }]}>
                <AnimatedCard style={styles.priorityCard}>
                  <View>
                    <MaterialIcons name="bookmark" size={24} color={COLORS.mocha} style={{ marginBottom: 12 }} />
                    <Text style={styles.priorityTitle}>Priority Objectives</Text>
                  </View>
                  <View style={styles.priorityList}>
                    <View style={styles.priorityList}>
                      {visibleTasks.slice(0, 2).map((task, index) => {
                        const time = formatTimeHM(task.dueAt);

                        return (
                          <View
                            key={task.id}
                            style={[
                              styles.priorityItem,
                              index === 1 && { marginBottom: 0 }
                            ]}
                          >
                            <Text style={styles.priorityItemText}>
                              {task.title.toUpperCase()}
                            </Text>
                            <Text style={styles.priorityItemTime}>
                              {time}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </AnimatedCard>
              </Animated.View>
            </Pressable>
          </View>

          {/* Right Column (col-span-1 for Widget 4 and 5) */}
          <View style={[styles.halfColumn, styles.stackedWidgets]}>
            {/* Widget 4: Day Streak */}
            <Animated.View style={[getTileStyle(3), { flex: 1 }]}>
              <AnimatedCard style={styles.streakCard}>
                <Text style={styles.streakNumber}>0</Text>
                <Text style={styles.streakLabel}>DAY STREAK</Text>
                <MaterialIcons
                  name="local-fire-department"
                  size={20}
                  color={COLORS.caramel}
                  style={{ marginTop: 8 }}
                />
              </AnimatedCard>
            </Animated.View>

            {/* Widget 5: Date */}
            <Animated.View style={[getTileStyle(4), { flex: 1 }]}>
              <AnimatedCard style={styles.dateCard}>
                <View style={styles.dateTopRow}>
                  <MaterialIcons name="calendar-today" size={18} color={COLORS.caramel} />
                  <Text style={styles.dateTodayLabel}>TODAY</Text>
                </View>
                <View style={styles.dateBottomRow}>
                  <Text style={styles.dateText}>{formattedDate}</Text>
                </View>
              </AnimatedCard>
            </Animated.View>
          </View>
        </View>
        <QuoteCard quote={randomQuote} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.mocha,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 140,
    width: '100%',
    maxWidth: 428,
    alignSelf: 'center',
  },
  /* Header Styles */
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 48,
  },
  headerTitles: {
    flex: 1,
    paddingRight: 16,
  },
  headerHeadline: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 32,
    color: COLORS.oatMilk,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontFamily: 'Inter_300Light',
    fontSize: 18,
    color: `${COLORS.oatMilk}CC`, // 80% opacity
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: `${COLORS.caramel}4D`, // 30% opacity
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },

  /* Grid Base */
  gridContainer: {
    gap: 16,
    flexDirection: 'column',
  },
  splitRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  halfColumn: {
    flex: 1,
  },
  stackedWidgets: {
    gap: 16,
    flexDirection: 'column',
  },

  /* Widget 1: Deep Focus */
  deepFocusCard: {
    backgroundColor: COLORS.oatMilk,
    borderRadius: 40,
    padding: 24,
    minHeight: 220,
    width: '100%',
  },
  deepFocusTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  deepFocusLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9,
    color: `${COLORS.mocha}99`, // 60% opacity
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  deepFocusTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 22,
    color: COLORS.mocha,
  },
  deepFocusIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.mocha,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deepFocusTaskList: {
    gap: 12,
    marginBottom: 32,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taskDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.caramel,
  },
  taskText: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 13,
    fontStyle: 'italic',
    color: COLORS.mocha,
  },
  progressSection: {
    marginTop: 'auto',
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: `${COLORS.mocha}1A`, // 10% opacity
    borderRadius: 2,
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.caramel,
    borderRadius: 2,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9,
    color: `${COLORS.mocha}66`, // 40% opacity
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },

  /* Widget 2: Upcoming Classes */
  upcomingClassesCard: {
    backgroundColor: COLORS.mocha,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: `${COLORS.oatMilk}1A`, // 10% ghost border
    width: '100%',
  },
  upcomingIconContainer: {
    backgroundColor: `${COLORS.caramel}1A`, // 10% opacity
    padding: 12,
    borderRadius: 24, // roughly pill/circle
  },
  upcomingContent: {
    flex: 1,
  },
  upcomingLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9,
    color: COLORS.caramel,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  upcomingTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 15,
    color: COLORS.oatMilk,
    marginBottom: 2,
  },
  upcomingSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: `${COLORS.oatMilk}66`, // 40% opacity
  },

  /* Widget 3: Priority Objectives */
  priorityCard: {
    backgroundColor: COLORS.caramel,
    borderRadius: 24,
    padding: 20,
    minHeight: 200,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
  },
  priorityTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 20,
    color: COLORS.mocha,
    lineHeight: 24,
  },
  priorityList: {
    marginTop: 16,
  },
  priorityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16, // used instead of bottom border to adhere to strict don'ts
  },
  priorityItemText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: COLORS.mocha,
    textTransform: 'uppercase',
    letterSpacing: -0.3,
  },
  priorityItemTime: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: `${COLORS.mocha}99`, // 60% opacity
  },

  /* Widget 4: Day Streak */
  streakCard: {
    backgroundColor: COLORS.oatMilk,
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1, // fill the top half
  },
  streakNumber: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 30,
    color: COLORS.mocha,
    lineHeight: 34,
  },
  streakLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9,
    color: `${COLORS.mocha}99`, // 60% opacity
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 4,
  },

  /* Widget 5: Date */
  dateCard: {
    backgroundColor: COLORS.mocha,
    borderRadius: 24,
    padding: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: `${COLORS.oatMilk}1A`, // 10% opacity
    width: '100%',
    flex: 1, // fill bottom half
  },
  dateTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dateTodayLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: `${COLORS.oatMilk}66`, // 40% opacity
    letterSpacing: -0.5,
  },
  dateBottomRow: {
    marginTop: 'auto',
  },
  dateText: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 18,
    color: COLORS.oatMilk,
  },

  /* Widget 6: Quick Access */
  quickAccessCard: {
    backgroundColor: COLORS.oatMilk,
    borderRadius: 24,
    padding: 20,
    width: '100%',
  },
  quickAccessTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickAccessTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 16,
    fontStyle: 'italic',
    color: COLORS.mocha,
  },
  quickAccessChips: {
    gap: 8,
    flexDirection: 'row',
  },
  chip: {
    backgroundColor: `${COLORS.mocha}0D`, // 5% opacity
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: `${COLORS.mocha}99`, // 60% opacity
    textTransform: 'uppercase',
  },
});