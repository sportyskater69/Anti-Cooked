import { auth } from "../config/firebaseConfig";
import { getTodayString } from "../utils/dateUtils";
import { getUserProfile, updateUserProfile } from "./userService";

export const updateStreak = async (): Promise<number | undefined> => {
    try {
        const user = auth.currentUser;
        if (!user) return;

        const profile = await getUserProfile(user.uid);

        const today = getTodayString();
        const last = profile?.lastActiveDate;

        let newStreak = profile?.streak ?? 0;

        if (!last) {
            // first time user
            newStreak = 1;
        } else {
            const lastDate = new Date(last + "T00:00:00Z");
            const todayDate = new Date(today + "T00:00:00Z");

            const diffDays = Math.floor(
                (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (diffDays === 1) {
                newStreak += 1; // continue streak
            } else if (diffDays > 1) {
                newStreak = 1; // reset streak
            }
            // diffDays === 0 → same day → no change
        }

        await updateUserProfile(user.uid, {
            streak: newStreak,
            lastActiveDate: today,
        });

        return newStreak;
    } catch (error) {
        console.error("updateStreak failed:", error);
    }
};