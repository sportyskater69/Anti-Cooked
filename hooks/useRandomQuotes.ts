import { useMemo } from "react";

export function useRandomQuote(quotes: string[]) {
    return useMemo(() => {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }, [quotes]);
}