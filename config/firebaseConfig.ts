import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

const firebaseConfig = {
    apiKey: "AIzaSyA3B0-Xj24eabH0vNYqQxQZ3FzfPGV-SJ8",
    authDomain: "anticooked.firebaseapp.com",
    projectId: "anticooked",
    storageBucket: "anticooked.firebasestorage.app",
    messagingSenderId: "232198135749",
    appId: "1:232198135749:web:28d527e56afbc6c744f5ac",
};

const app = initializeApp(firebaseConfig);

let auth: any;
if (Platform.OS === 'web') {
    auth = getAuth(app);
} else {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
}

export { auth };
export const db = getFirestore(app);
export default app;