import "@expo-google-fonts/inter";
// not sure how to implement inter as well as noto serif

import {
  NotoSerif_400Regular,
  NotoSerif_600SemiBold,
  NotoSerif_700Bold,
  NotoSerif_800ExtraBold,
  useFonts
} from '@expo-google-fonts/noto-serif';

import { ScrollView } from 'react-native';
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
    <ScrollView></ScrollView>
  )
}