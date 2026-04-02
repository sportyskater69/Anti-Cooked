import { Timestamp } from "firebase/firestore";

export type Task = {
    id: string;
    title: string;
    description: string;
    createdAt: number;
    dueAt: Timestamp;
    selectedDate: string;
    completed: boolean;
    deleted?: boolean;
};