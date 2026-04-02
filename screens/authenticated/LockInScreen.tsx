import "@expo-google-fonts/inter";
// not sure how to implement inter as well as noto serif
import ScreenWrapper from "../../components/ScreenWrapper";

import {
    NotoSerif_400Regular,
    NotoSerif_600SemiBold,
    NotoSerif_700Bold,
    NotoSerif_800ExtraBold,
    useFonts
} from '@expo-google-fonts/noto-serif';

import { ScrollView, StyleSheet, Text, View } from 'react-native';
export default function LockInScreen() {
    const [fontsLoaded] = useFonts({
        NotoSerif_400Regular,
        NotoSerif_600SemiBold,
        NotoSerif_800ExtraBold,
        NotoSerif_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }
    // add coffee mug to the next up field 
    // add the timer functionality, 25 shouldnt be hardcoded
    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.page}>
                <View style={styles.title}>
                    <View><Text style={styles.text}>Lock - in Mode</Text></View>
                    <View style={styles.box}>
                        <Text style={styles.deepwork} >DEEP WORK SESSION</Text>
                        <Text style={styles.essay}>Philosophy Essay</Text>
                        <Text style={styles.min}>25:00</Text>
                        <View style={styles.nextup}>
                            <Text style={styles.nextuptext}> Next up : 5 min Short Break</Text>
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
                        <Text style={styles.achivementTimelineText}>Achievement Timeline</Text>
                        {/*Item 1*/}
                        <View style={styles.progressRow}>
                            <View style={styles.leftSide} />
                            <View style={styles.circle} />
                            <View style={styles.line} />
                        </View>

                        <View style={styles.rightSide}>
                            <Text style={styles.title3}>Philosophy Thesis Draft</Text>
                            <Text style={styles.desc}>
                                Completed advanced synthesis of Stoic principles.
                            </Text>
                            {/* In every item the date field will be filled based on the date priority objectives in the hit list. */}
                            <Text style={styles.date2}>OCT 24, 2023</Text>
                        </View>

                        {/*Item 2*/}
                        <View style={styles.progressRow}>
                            <View style={styles.leftSide}>
                                <View style={styles.circle} />
                                <View style={styles.line} />
                            </View>
                        </View>

                        <View style={styles.rightSide}>
                            <Text style={styles.title2}>Renaissance Art Portfolio</Text>
                            <Text style={styles.desc}>
                                Analyzed the Chiaroscuro technique in 12 works.
                            </Text>
                            <Text style={styles.date}>OCT 24, 2023</Text>
                        </View>

                        {/*Item 3*/}
                        <View style={styles.progressRow}>
                            <View style={styles.leftSide}>
                                <View style={styles.circle} />
                                <View style={styles.line} />
                            </View>
                        </View>

                        <View style={styles.rightSide}>
                            <Text style={styles.title2}>Weekly Logic Seminar</Text>
                            <Text style={styles.desc}>
                                Perfect score on the syllogism challenge.
                            </Text>
                            <Text style={styles.date}>OCT 24, 2023</Text>
                        </View>

                        <View style={styles.rewardField}>
                            <Text style={styles.rewardText}>Rewards and Emblems</Text>
                            <View style={styles.reward} >
                                <View style={styles.totalPoints}>
                                    <Text style={styles.point}>450</Text>
                                    <Text style={styles.pts}>PTS</Text>
                                </View>
                            </View>
                        </View>

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
