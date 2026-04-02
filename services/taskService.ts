import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    Timestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";
import { Task } from "../types/Task";

const getUserTasksRef = () => {
    const user = auth.currentUser;
    if (!user) throw new Error("No user logged in");
    return collection(db, "users", user.uid, "tasks");
};


export async function addTask(
    task: Omit<Task, "id" | "createdAt">
) {
    await addDoc(getUserTasksRef(), {
        ...task,
        createdAt: Timestamp.now(),
    });
}

export async function deleteTask(taskId: string) {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "users", user.uid, "tasks", taskId);
    await updateDoc(ref, { deleted: true });
}

export async function deleteOldestCompletedIfNeeded() {
    const ref = getUserTasksRef();

    const q = query(ref, where("completed", "==", true));
    const snap = await getDocs(q);

    let completedTasks = snap.docs.map((d) => {
        const data = d.data() as Omit<Task, "id">;

        return {
            id: d.id,
            ...data,
        };
    });

    if (completedTasks.length <= 3) return;

    // SORT OLDEST → NEWEST
    completedTasks.sort((a, b) => {
        const aTime = (a.createdAt as any)?.seconds ?? a.createdAt;
        const bTime = (b.createdAt as any)?.seconds ?? b.createdAt;

        return aTime - bTime;
    });

    const user = auth.currentUser;
    if (!user) return;


    const tasksToDelete = completedTasks.slice(0, completedTasks.length - 3);

    for (const task of tasksToDelete) {
        await updateDoc(
            doc(db, "users", user.uid, "tasks", task.id),
            { deleted: true }
        );
    }
}

export async function getTasks(): Promise<Task[]> {
    const ref = getUserTasksRef();
    const snap = await getDocs(ref);

    return snap.docs
        .map((d) => ({
            id: d.id,
            ...(d.data() as Omit<Task, "id">),
        }))
        .filter(task => !task.deleted);
}

export async function getTasksByDate(selectedDate: string): Promise<Task[]> {
    const ref = getUserTasksRef();

    const q = query(ref, where("selectedDate", "==", selectedDate));
    const snap = await getDocs(q);

    return snap.docs
        .map((d) => ({
            id: d.id,
            ...(d.data() as Omit<Task, "id">),
        }))
        .filter(task => !task.deleted);
}

export async function toggleTask(taskId: string, current: boolean) {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "users", user.uid, "tasks", taskId);

    await updateDoc(ref, {
        completed: !current,
    });

    if (current === false) {
        await deleteOldestCompletedIfNeeded();
    }
}