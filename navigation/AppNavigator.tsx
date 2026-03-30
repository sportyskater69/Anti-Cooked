import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import NavBar from "../components/NavBar";
import HitListScreen from "../screens/authenticated/HitListScreen";
import HomeScreen from "../screens/authenticated/HomeScreen";
import LockInScreen from "../screens/authenticated/LockInScreen";
import ProfileScreen from "../screens/authenticated/ProfileScreen";

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