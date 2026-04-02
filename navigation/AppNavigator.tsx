import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import FloatingNavBar from "../components/FloatingNavBar";
import HitListScreen from "../screens/authenticated/HitListScreen";
import HomeScreen from "../screens/authenticated/HomeScreen";
import LockInScreen from "../screens/authenticated/LockInScreen";
import ProfileScreen from "../screens/authenticated/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <View style={{ flex: 1, backgroundColor: '#2C2521' }}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                tabBar={({ state, navigation }) => {
                    // Map React Navigation's state.index to our custom 'activeTab' string
                    const localTabs = ['home', 'hitlist', 'focus', 'profile'] as const;
                    const activeTab = localTabs[state.index] ?? 'home';

                    return (
                        <FloatingNavBar 
                            activeTab={activeTab} 
                            onTabPress={(tab) => {
                                // Map our custom tab string back to route names
                                if (tab === 'home') navigation.navigate('Homescreen');
                                if (tab === 'hitlist') navigation.navigate('Hitlist');
                                if (tab === 'focus') navigation.navigate('Lockin');
                                if (tab === 'profile') navigation.navigate('Profile');
                            }} 
                        />
                    );
                }}
            >
                <Tab.Screen name="Homescreen" component={HomeScreen} />
                <Tab.Screen name="Hitlist" component={HitListScreen} />
                <Tab.Screen name="Lockin" component={LockInScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </View>
    );
}