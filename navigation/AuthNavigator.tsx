import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/unauthenticated/LogInScreen";
import SignUpScreen from "../screens/unauthenticated/SignUpScreen";


const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Signin" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
        </Stack.Navigator>
    );
}