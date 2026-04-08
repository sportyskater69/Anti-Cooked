import { create } from "zustand";

type TimerState = {
    secondsLeft: number;
    running: boolean;

    setSecondsLeft: (v: number) => void;
    setRunning: (v: boolean) => void;

    reset: () => void;
};

export const useTimerStore = create<TimerState>((set) => ({
    secondsLeft: 0.5 * 60,
    running: false,

    setSecondsLeft: (v) => set({ secondsLeft: v }),
    setRunning: (v) => set({ running: v }),

    reset: () =>
        set({
            secondsLeft: 0.5 * 60,
            running: false,
        }),
}));