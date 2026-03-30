import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { createUserProfile, getUserProfile } from "../services/userService";
import type { UserProfile } from "../types/User";


type AuthContextType = {
    firebaseUser: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
    firebaseUser: null,
    userProfile: null,
    loading: true,
});


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const ensureUserProfile = async (user: User) => {
        let profile = await getUserProfile(user.uid);

        if (!profile) {
            profile = await createUserProfile(user);
        }

        setUserProfile(profile);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setFirebaseUser(user);

            if (user) {
                try {
                    await ensureUserProfile(user);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setUserProfile(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ firebaseUser, userProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);