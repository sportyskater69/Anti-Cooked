import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { getTasksByDate, toggleTask } from "../services/taskService";
import { Task } from "../types/Task";
import TimelineItem from "./TimelineItem";

export default function Timeline({ selectedDate }: { selectedDate: string }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    const load = useCallback(async () => {
        const data = await getTasksByDate(selectedDate);
        setTasks(data);
    }, [selectedDate]);

    useEffect(() => {
        load();
    }, [load]);

    return (
        <View>
            {tasks.map((item, index) => (
                <TimelineItem
                    key={item.id}
                    task={item}
                    isLast={index === tasks.length - 1}
                    onPress={async () => {
                        await toggleTask(item.id, item.completed);
                        load();
                    }}
                />
            ))}
        </View>
    );
}