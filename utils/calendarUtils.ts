export const generateMonthDays = (baseDate: Date) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(baseDate);
    end.setMonth(end.getMonth() + 1);

    const days: Date[] = [];

    const current = new Date(start);

    while (current <= end) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return days;
};