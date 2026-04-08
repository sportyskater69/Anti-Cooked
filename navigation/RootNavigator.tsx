import { useAuth } from "../context/AuthContext";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

export default function RootNavigator() {
    const { firebaseUser, loading } = useAuth();

    if (loading) return null;


    return firebaseUser ? <AppNavigator /> : <AuthNavigator />;
}