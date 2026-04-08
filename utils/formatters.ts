export const formatDate = (timestamp?: number) => {
    if (!timestamp) return "Never";

    const date = new Date(timestamp);

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

export const formatTimeHM = (dateInput: any) => {
    const d = dateInput?.toDate?.() ?? new Date(dateInput);
    if (isNaN(d.getTime())) return "Invalid";

    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");

    return `${h}:${m}`;
};

export const formatTimeLeft = (seconds: number = 0) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min}M ${sec.toString().padStart(2, "0")}S LEFT`;
};