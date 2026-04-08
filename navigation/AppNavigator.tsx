import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavBar from "../components/NavBar";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HitListScreen from "../screens/authenticated/HitListScreen";
import HomeScreen from "../screens/authenticated/HomeScreen";
import LockInScreen from "../screens/authenticated/LockInScreen";
import ProfileScreen from "../screens/authenticated/ProfileScreen";

const Stack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={() => <NavBar />}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="HitList" component={HitListScreen} />
            <Tab.Screen name="LockIn" component={LockInScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}