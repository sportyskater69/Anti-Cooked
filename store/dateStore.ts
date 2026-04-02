import { create } from "zustand";

type DateStore = {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
};

const getToday = () => new Date().toISOString().split("T")[0];

export const useDateStore = create<DateStore>((set) => ({
    selectedDate: getToday(),
    setSelectedDate: (date) => set({ selectedDate: date }),
}));