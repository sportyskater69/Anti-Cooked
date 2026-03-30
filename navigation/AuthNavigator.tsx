import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "../screens/unauthenticated/LogInScreen";
import SignUpScreen from "../screens/unauthenticated/SignUpScreen";


const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Signin" component={LogInScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
        </Stack.Navigator>
    );
}