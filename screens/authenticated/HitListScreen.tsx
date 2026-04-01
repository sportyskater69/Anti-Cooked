import "@expo-google-fonts/inter";
import {
  NotoSerif_400Regular,
  NotoSerif_600SemiBold,
  NotoSerif_700Bold,
  NotoSerif_800ExtraBold,
  useFonts
} from '@expo-google-fonts/noto-serif';
// not sure how to implement inter at the same time as noto serif
{/** add inter to a lot of field and import inter fontweights */ }

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

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 200 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.page}>
        {/**addthe icon using image */}
        <View style={styles.points}>
          <Text style={styles.numberPts}>1200</Text>
          <Text style={styles.pts}>pts</Text>
        </View>
        <View style={styles.mainTitle}>
          <Text style={styles.title}>The Hit List</Text>
          {/** will add foto serif italic */}
          <Text style={styles.titleDesc}>Curating today’s intellectual pursuits.</Text>
        </View>
        <View style={styles.calender}>
          <View style={styles.calenderBox}>
            <View style={styles.calenderBox1}>
              <Text style={styles.dayTitle}>Mon</Text>
              <Text style={styles.day1}>12</Text>
            </View>
          </View>
          <View style={styles.calenderBox}>
            <View style={styles.calenderBox2}>
              <Text style={styles.dayTitle}>Tue</Text>
              <Text style={styles.day2}>13</Text>
            </View>
          </View>
          <View style={styles.calenderBox}>
            <View style={styles.calenderBox3}>
              <Text style={styles.dayTitleO}>Wed</Text>
              <Text style={styles.day3}>14</Text>
            </View>
          </View>
          <View style={styles.calenderBox}>
            <View style={styles.calenderBox4}>
              <Text style={styles.dayTitle}>Thu</Text>
              <Text style={styles.day4}>15</Text>
            </View>
          </View>
          <View style={styles.calenderBox}>
            <View style={styles.calenderBox5}>
              <Text style={styles.dayTitle}>Fri</Text>
              <Text style={styles.day5}>16</Text>
            </View>
          </View>
          <View style={styles.calenderBox}>
            <View style={styles.calenderBox6}>
              <Text style={styles.dayTitle}>Sat</Text>
              <Text style={styles.day6}>17</Text>
            </View>
          </View>
          <View style={styles.calenderBox}>
            <View style={styles.calenderBox7}>
              <Text style={styles.dayTitle}>Sun</Text>
              <Text style={styles.day7}>18</Text>
            </View>
          </View>
        </View>
        <View style={styles.title2}>
          <Text style={styles.titleText1}>Priority Objectives</Text>
          <Text style={styles.titleText2}>3 remaining</Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.courseField}>
            <View style={styles.alignment}>
              <View style={styles.checkbox}></View>
              <View style={styles.texts}>
                <Text style={styles.courseText}>CPRG 306 Mockup</Text>
                <Text style={styles.courseTime}>09:00 AM - 11:30 AM</Text>
              </View>
            </View>
          </View>

          <View style={styles.courseField2}>
            <View style={styles.alignment2}>
              <View style={styles.text2}>
                <Text style={styles.courseText2}>Add New</Text>
              </View>
            </View>
          </View>

          <View style={styles.courseField}>
            <View style={styles.alignment}>
              <View style={styles.checkbox}></View>
              <View style={styles.texts}>
                <Text style={styles.courseText}>History of Rome</Text>
                <Text style={styles.courseTime}>05:30 AM - 7:00 AM</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.courseField3}>
            <View style={styles.alignment3}>
              <View style={styles.texts}>
                <Text style={styles.courseText3}>Advanced Typography</Text>
                <View style={styles.timeDate}>
                  {/** icons should be added */}
                  <Text style={styles.date}>Oct 15</Text>
                  <Text style={styles.time}> 10.00 AM</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.courseField3}>
            <View style={styles.alignment3}>
              <View style={styles.texts}>
                <Text style={styles.courseText3}>Group Sync : Project 404</Text>
                <View style={styles.timeDate}>
                  {/** icons should be added */}
                  <Text style={styles.date}>Oct 16</Text>
                  <Text style={styles.time}> 2:30 PM</Text>
                </View>
              </View>
            </View>
          </View>

          {/**add + for 2nd add new */}
          <View style={styles.courseField3}>
            <View style={styles.alignment3}>
              <View style={styles.text4}>
                <Text style={styles.courseText4}>Add New</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.progressField}>
          <View style={styles.barTitle}>
            <Text style={styles.termSurvival}>Term Survival</Text>
            <Text style={styles.completed}>75% COMPLETED</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={styles.progressFill}></View>
          </View>
        </View>
      </View>
    </ScrollView >
  )
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