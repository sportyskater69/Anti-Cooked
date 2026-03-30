import type { User } from "firebase/auth";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";


const auth = getAuth();

export const logIn = async (email: string, password: string): Promise<User> => {
    try {
        const userCredentials = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredentials.user;
        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const signUp = async (email: string, password: string): Promise<User> => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredentials.user;

        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
};