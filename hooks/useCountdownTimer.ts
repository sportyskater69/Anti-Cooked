import { useEffect } from "react";

export function useCountdownTimer(
    running: boolean,
    secondsLeft: number,
    setSecondsLeft: (n: number) => void,
    onEnd?: () => void
) {
    useEffect(() => {
        if (!running) return;

        const interval = setInterval(() => {
            setSecondsLeft(secondsLeft - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [running, secondsLeft]);

    useEffect(() => {
        if (!running) return;

        if (secondsLeft <= 0) {
            setSecondsLeft(0);
            onEnd?.();
        }
    }, [secondsLeft, running]);
}