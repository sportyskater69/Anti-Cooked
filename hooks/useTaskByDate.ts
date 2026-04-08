import { useCallback, useEffect, useState } from "react";
import { getTasksByDate } from "../services/taskService";
import { Task } from "../types/Task";

export function useTasksByDate(date: string) {
    const [tasks, setTasks] = useState<Task[]>([]);

    const load = useCallback(async () => {
        const data = await getTasksByDate(date);
        setTasks(data);
    }, [date]);

    useEffect(() => {
        load();
    }, [load]);

    return { tasks, setTasks, reload: load };
}