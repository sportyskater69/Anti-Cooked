import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { UserProfile } from "../types/User";


export const createUserProfile = async (user: User) => {
    try {
        const profile: UserProfile = {
            uid: user.uid,
            email: user.email,
            createdAt: Date.now(),
        };

        try {
            await setDoc(doc(db, "users", user.uid), profile);

            return profile;
        } catch (error) {
            console.error("Could not reach service:", error);
            throw error;
        }


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

export const ensureUserProfile = async (user: User) => {
    const existing = await getUserProfile(user.uid);

    if (existing) return existing;

    return await createUserProfile(user);
};