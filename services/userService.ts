import { User } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { UserProfile } from "../types/User";



export const createUserProfile = async (user: User, fullName?: string) => {
    try {
        const profile: UserProfile = {
            uid: user.uid,
            email: user.email,
            fullName: fullName || "",
            phone: "",
            location: "",
            createdAt: Date.now(),
            lastUpdated: Date.now(),
        };

        await setDoc(doc(db, "users", user.uid), profile);

        return profile;
    } catch (error) {
        console.error("createUserProfile failed:", error);
        throw error;
    }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    const ref = doc(db, "users", uid);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) return null;

    const data = snapshot.data();

    return data as UserProfile;
};

export const ensureUserProfile = async (user: User, fullName?: string) => {
    const existing = await getUserProfile(user.uid);

    if (existing) return existing;

    return await createUserProfile(user, fullName);
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
    try {
        const ref = doc(db, "users", uid);
        await updateDoc(ref, {
            ...data,
            lastUpdated: Date.now()
        });
    } catch (error) {
        console.error("updateUserProfile failed:", error);
        throw error;
    }
};