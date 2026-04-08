import { Task } from "../types/Task";

export const getCompletionPercent = (tasks: Task[]) => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
};