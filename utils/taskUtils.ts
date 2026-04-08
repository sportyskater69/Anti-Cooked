import { Task } from "../types/Task";

export const getVisibleTasks = (tasks: Task[]) =>
    tasks.filter(t => !t.deleted);

export const sortByCompletion = (tasks: Task[]) =>
    [...tasks].sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
    });

export const sortByCreatedAt = (tasks: Task[]) =>
    [...tasks].sort((a, b) => {
        const aTime = (a.createdAt as any)?.seconds ?? a.createdAt;
        const bTime = (b.createdAt as any)?.seconds ?? b.createdAt;
        return aTime - bTime;
    });

export const getIncompleteTasks = (tasks: Task[]) =>
    tasks.filter(t => !t.completed);