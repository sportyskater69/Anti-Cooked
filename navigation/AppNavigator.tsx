import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import NavBar from "../components/NavBar";

import HitListScreen from "../screens/authenticated/HitListScreen";
import HomeScreen from "../screens/authenticated/HomeScreen";
import LockInScreen from "../screens/authenticated/LockInScreen";
import ProfileScreen from "../screens/authenticated/ProfileScreen";

const Stack = createNativeStackNavigator();


function Layout({ children }: any) {
    return (
        <View style={{ flex: 1 }}>
            {children}
            <NavBar />
        </View>
    );
}


export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="HomeScreen">
                {() => (
                    <Layout>
                        <HomeScreen />
                    </Layout>
                )}
            </Stack.Screen>

            <Stack.Screen name="HitList">
                {() => (
                    <Layout>
                        <HitListScreen />
                    </Layout>
                )}
            </Stack.Screen>

            <Stack.Screen name="LockIn">
                {() => (
                    <Layout>
                        <LockInScreen />
                    </Layout>
                )}
            </Stack.Screen>

            <Stack.Screen name="Profile">
                {() => (
                    <Layout>
                        <ProfileScreen />
                    </Layout>
                )}
            </Stack.Screen>

        </Stack.Navigator>
    );
}