export type UserProfile = {
    uid: string;
    email: string | null;
    fullName?: string;
    phone?: string;
    location?: string;
    createdAt: number;
    lastUpdated?: number;
    streak: number
    lastActiveDate: string // 
}