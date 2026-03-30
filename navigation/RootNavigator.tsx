import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

export default function RootNavigator() {
    const isLoggedIn = false; // replace later

    return isLoggedIn ? <AppNavigator /> : <AuthNavigator />;

}