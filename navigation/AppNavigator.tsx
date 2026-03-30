import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import HitListScreen from "../screens/authenticated/HitListScreen.tsx";
import HomeScreen from "../screens/authenticated/HomeScreen.tsx";
import LockInScreen from "../screens/authenticated/LockInScreen.tsx";
import ProfileScreen from "../screens/authenticated/ProfileScreen.tsx";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Homescreen" component={HomeScreen} />
                <Stack.Screen name="Hitlist" component={HitListScreen} />
                <Stack.Screen name="Lockin" component={LockInScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>

            <NavBar />
        </View>
    );
}